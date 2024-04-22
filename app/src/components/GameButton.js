import styles from "./GameButton.module.css";

const GameButton = () => {
  return (
    <a href="http://127.0.0.1:8060/LifeQuestTest.html">
    <button className={styles.gamenav} id="game_button">
      <div className={styles.gameButton} />
      <img className={styles.gameIcon} alt="" src="/game-icon.svg" />
    </button>
  </a>
  );
};

export default GameButton;
