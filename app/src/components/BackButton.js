import { useMemo } from "react";
import styles from "./BackButton.module.css";

const BackButton = ({ backButtonPosition }) => {
  const backButtonStyle = useMemo(() => {
    return {
      position: backButtonPosition,
    };
  }, [backButtonPosition]);

  return (
    <button
      className={styles.backButton}
      id="back_button"
      style={backButtonStyle}
      onClick={() => { window.location.href = "/home"; }} // Navigate programmatically on button click
    >
      <img className={styles.groupIcon} alt="" src="/group.svg" />
    </button>
  );
};

export default BackButton;