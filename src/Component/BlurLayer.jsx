import React from "react";
import styles from "./BlurLayer.module.css";

function BlurLayer({ setViewChart }) {
  const test = () => {
    setViewChart(false);
  };
  return (
    <>
      <div onClick={test} className={styles.BlurLayer}></div>
    </>
  );
}

export default BlurLayer;
