import Head from "next/head";
import styles from "../styles/Home.module.css";
import SpringSlider from "../sliders/springslider/index";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
      <SpringSlider />
      </div>
      
    </div>
  );
}
