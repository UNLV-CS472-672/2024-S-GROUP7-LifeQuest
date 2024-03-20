import BackButton from "./BackButton";
import styles from "./TopPanel.module.css";

const TopPanel = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.topPanel}>
        <a href="/">
          <BackButton backButtonPosition="relative" />
        </a>
      </div>
    </div>
  );
};

export default TopPanel;
