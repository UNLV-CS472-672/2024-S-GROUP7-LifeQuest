import styles from "./GameButton.module.css";

const GameButton = () => {
  return (
    <button className={styles.gamenav} id="game_button">
      <div className={styles.gameButton} />
      <img className={styles.gameIcon} alt="" src="/game-icon.svg" />
    </button>
  );
};

export default GameButton;
