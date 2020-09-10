import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import styles from "./styles.module.scss";
import { RedBlackBlue } from "../../constants";

const myContent = ["ala", "bala", "nica", "d", "hjkdshdkjs"];
const myContent2 = ["1", "2", "3", "4", "5"];
const pages = [
  ({ style }) => (
    <animated.div style={{ ...style, background: RedBlackBlue.green }}>
      Ana
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: RedBlackBlue.darkBlue }}>
      Bob
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: RedBlackBlue.darkRed }}>
      Cam
    </animated.div>
  ),
];

const myBackground = [
  RedBlackBlue.green,
  RedBlackBlue.darkBlue,
  RedBlackBlue.darkRed,
  RedBlackBlue.lightRed,
  RedBlackBlue.lightWhite,
  RedBlackBlue.black,
  RedBlackBlue.lightBlue,
  RedBlackBlue.green,
];

const myConfig = { mass: 30, tension: 800, friction: 180 };

function App({ content = [], config = {}, background = [] }) {
  const [index, set] = useState(0);
  // initial state need annimated functions
  const [data, setData] = useState(pages);
  const [dataLength, setDataLength] = useState(3);
  //create elements

  //update state
  React.useEffect(() => {
    console.log("use effect");

    const myDataContent =
      content.length > 0 &&
      content.map((x, i) => ({ style }) => (
        <animated.div
          style={{ ...style, background: background[i % background.length] }}
        >
          {x}
        </animated.div>
      ));
    // console.log(config);
    setData(myDataContent);
    setDataLength(myDataContent.length);
    // console.log(data, myDataContent);
  }, []);

  // console.log(data);

  const handleClick = (e) => {
    console.log(e, "handleCLick");
    e.preventDefault();
    return set((state) => (state + 1) % dataLength);
  };
  const handleNextClick = (e) => {
    e.preventDefault();
    console.log("index1 ", index);

    set((state) => (state - 1 < 0 ? dataLength - 1 : state - 1));
    console.log("index2: ", index);
  };
  //create animation
  const transitions = useTransition(index, (p) => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
    config: { mass: 30, tension: 800, friction: 180, ...config },
  });

  return (
    <div className={styles.simpleTransMain}>
      <span
        className={[styles.arrows, styles.previos].join(" ")}
        onClick={handleClick}
      >
        A
      </span>
      {transitions.map(({ item, props, key }) => {
        const Page = data[item] || [];
        return <Page key={key} style={props} />;
      })}
      <span
        className={[styles.arrows, styles.next].join(" ")}
        onClick={handleNextClick}
      >
        B
      </span>
    </div>
  );
}

const Usage = () => {
  return (
    <App content={myContent2} config={myConfig} background={myBackground} />
  );
};
export default Usage;
