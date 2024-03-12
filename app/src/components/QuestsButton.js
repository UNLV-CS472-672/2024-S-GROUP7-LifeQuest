import styles from "./QuestsButton.module.css";

const QuestsButton = () => {
  return (
    <button className={styles.questsnav} id="quests_button">
      <div className={styles.questsButton} />
      <img className={styles.questsIcon} alt="" src="/quest-icon.svg" />
    </button>
  );
};

export default QuestsButton;
