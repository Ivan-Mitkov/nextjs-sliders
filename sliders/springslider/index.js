import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
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
  const [isItRevers, setRevers] = useState(false);
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
    // console.log(e, "handleCLick");
    e.preventDefault();
    isItRevers && setRevers(false);
    return set((state) => (state + 1) % dataLength);
  };
  const handleNextClick = (e) => {
    e.preventDefault();
    // console.log("index1 ", index);
    !isItRevers && setRevers(true);
    set((state) => (state - 1 < 0 ? dataLength - 1 : state - 1));
    // console.log("index2: ", index);
  };
  //create animation
  const transitions = useTransition(index, (p) => p, {
    to: { opacity: 1, transform: "translate3d(0,0,100%)" },
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,0,-50%)" },
    config: { mass: 30, tension: 800, friction: 180, ...config },
  });
  const transitions2 = useTransition(index, (p) => p, {
    to: { opacity: 1, transform: "translate3d(0,0,0)" },
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,0,-50%)" },
    config: { mass: 30, tension: 800, friction: 180, ...config },
  });

  const transition = isItRevers
    ? transitions2.map(({ item, props, key }) => {
        const Page = data[item] || [];
        return <Page key={key} style={props} />;
      })
    : transitions.map(({ item, props, key }) => {
        const Page = data[item] || [];
        return <Page key={key} style={props} />;
      });

  return (
    <div className={styles.simpleTransMain}>
      <span
        className={[styles.arrows, styles.previos].join(" ")}
        onClick={handleClick}
      >
        <ImArrowLeft className={styles.arrowIcon} />
      </span>
      {console.log(isItRevers)}
      {transition}
      <span
        className={[styles.arrows, styles.next].join(" ")}
        onClick={handleNextClick}
      >
        <ImArrowRight className={styles.arrowIcon} />
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
