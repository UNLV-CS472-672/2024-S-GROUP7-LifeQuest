import styles from "./QuestsButton.module.css";

const QuestsButton = () => {
  return (
    <a href="/quests">
      <button className={styles.questsnav} id="quests_button">
        <div className={styles.questsButton} />
        <img className={styles.questsIcon} alt="" src="/quest-icon.svg" />
      </button>
    </a>
  );
};

export default QuestsButton;
