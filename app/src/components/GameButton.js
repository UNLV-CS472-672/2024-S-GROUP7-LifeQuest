import styles from "./GameButton.module.css";

const GameButton = () => {
  return (
    <a href="/game">
    <button className={styles.gamenav} id="game_button">
      <div className={styles.gameButton} />
      <img className={styles.gameIcon} alt="" src="/game-icon.svg" />
    </button>
  </a>
  );
};

export default GameButton;
