import Settings from "./SettingsButton";
import Quests from "./QuestsButton";
import Game from "./GameButton";
import styles from "./NavigationPanel.module.css";

const NavigationPanel = () => {
  return (
    <div className={styles.navigationpanel} data-testid="navigation-panel">
      <Settings />
      <Quests />
      <Game />
    </div>
  );
};

export default NavigationPanel;
