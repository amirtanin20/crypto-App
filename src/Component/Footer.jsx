import React from "react";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <>
      <div className={styles.footerContainer}>
        <p>
          Search for the most up-to-date <span>Cryptocurrency Market </span>{" "}
          information on our site
        </p>
      </div>
    </>
  );
}

export default Footer;
