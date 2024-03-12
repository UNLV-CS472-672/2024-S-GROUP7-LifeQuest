import Footer2 from "./SettingsButton";
import Footer1 from "./QuestsButton";
import Footer from "./GameButton";
import styles from "./NavigationPanel.module.css";

const NavigationPanel = () => {
  return (
    <div className={styles.navigationpanel}>
      <Footer2 />
      <Footer1 />
      <Footer />
    </div>
  );
};

export default NavigationPanel;
