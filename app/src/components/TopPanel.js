import BackButton from "./BackButton";
import styles from "./TopPanel.module.css";

const TopPanel = () => {
  return (
      <div className={styles.frame}>
      <div className={styles.topPanel} data-testid="top-panel">
            <BackButton backbuttonposition="relative" />
        </div>
      </div>
  );
};

export default TopPanel;
