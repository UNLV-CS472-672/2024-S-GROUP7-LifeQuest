import BackButton from "./BackButton";
import styles from "./TopPanel.module.css";

const TopPanel = () => {
  return (
    <a href="/">
      <div className={styles.frame}>
      <div className={styles.topPanel} data-testid="top-panel">
            <BackButton backbuttonposition="relative" />
        </div>
      </div>
    </a>
  );
};

export default TopPanel;
