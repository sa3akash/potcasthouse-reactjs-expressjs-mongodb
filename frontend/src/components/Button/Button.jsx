import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span className={styles.buttonText}>{text}</span>
      <img src="/images/arrow-forward.png" alt="arrow" />
    </button>
  );
};

export default Button;
