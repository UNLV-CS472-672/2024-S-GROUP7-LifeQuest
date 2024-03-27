import { useMemo } from "react";
import styles from "./BackButton.module.css";

const BackButton = ({ backButtonPosition }) => {
  const backButtonStyle = useMemo(() => {
    return {
      position: backButtonPosition,
    };
  }, [backButtonPosition]);

  return (
    <a href="/home">
    <button
      className={styles.backButton}
      id="back_button"
      style={backButtonStyle}
    >
      <img className={styles.groupIcon} alt="" src="/group.svg" />
    </button>
    </a>
  );
};

export default BackButton;