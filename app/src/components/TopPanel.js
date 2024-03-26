import BackButton from "./BackButton";
import styles from "./TopPanel.module.css";

const TopPanel = () => {
  return (
    <a href="/">
      <div className={styles.frame}>
        <div className={styles.topPanel}>
            <BackButton backButtonPosition="relative" />
        </div>
      </div>
    </a>
  );
};

export default TopPanel;
