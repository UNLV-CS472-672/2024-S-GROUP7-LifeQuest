import styles from "./SettingsButton.module.css";

const SettingsButton = () => {
  return (
    <a href="/settings">
      <button className={styles.settingsnav} id="settings_button">
        <div className={styles.settingsButton} />
        <img className={styles.settingsIcon} alt="" src="/settings-icon.svg" />
      </button>
    </a>
  );
};

export default SettingsButton;
