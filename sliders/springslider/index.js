import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import styles from "./styles.module.scss";
import { RedBlackBlue } from "../../constants";

const pages = [
  ({ style }) => (
    <animated.div style={{ ...style, background: RedBlackBlue.dark }}>
      A
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: RedBlackBlue.darkBlue }}>
      B
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: RedBlackBlue.darkRed }}>
      C
    </animated.div>
  ),
];

function App() {
  const [index, set] = useState(0);
  const onClick = useCallback(() => set((state) => (state + 1) % 3), []);
  const transitions = useTransition(index, (p) => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
    config: { mass: 30, tension: 800, friction: 180 },
  });
  return (
    <div className={styles.simpleTransMain} onClick={onClick}>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item];
        return <Page key={key} style={props} />;
      })}
    </div>
  );
}

export default App;
