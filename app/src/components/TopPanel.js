import BackButton from "./BackButton";
import styles from "./TopPanel.module.css";

const TopPanel = () => {
  return (
    <div className={styles.frame} data-testid="top-panel">
      <div className={styles.topPanel}>
        <BackButton backButtonPosition="relative" />
      </div>
    </div>
  );
};

export default TopPanel;
