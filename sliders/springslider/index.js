import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import styles from "./styles.module.scss";
import { RedBlackBlue } from "../../constants";

const myContent = ["ala", "bala", "nica", "d", "hjkdshdkjs"];
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
];

function App({ content = [], background = [] }) {
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
      content.map((x) => ({ style }) => (
        <animated.div style={{ ...style, background: RedBlackBlue.darkBlue }}>
          {x}
        </animated.div>
      ));
    // console.log(myData);
    setData(myDataContent);
    setDataLength(myDataContent.length);
    console.log(data, myDataContent);
  }, []);

  // console.log(data);

  const onClick = () => set((state) => (state + 1) % dataLength);

  //create animation
  const transitions = useTransition(index, (p) => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
    config: { mass: 30, tension: 800, friction: 180 },
  });

  return (
    <div className={styles.simpleTransMain} onClick={onClick}>
      {transitions.map(({ item, props, key }) => {
        const Page = data[item] || [];
        return <Page key={key} style={props} />;
      })}
    </div>
  );
}

const Usage = () => {
  return <App content={myContent} background={myBackground} />;
};
export default Usage;
