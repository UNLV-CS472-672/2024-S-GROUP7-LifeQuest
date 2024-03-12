import styles from "./SettingsButton.module.css";

const SettingsButton = () => {
  return (
    <button className={styles.settingsnav} id="settings_button">
      <div className={styles.settingsButton} />
      <img className={styles.settingsIcon} alt="" src="/settings-icon.svg" />
    </button>
  );
};

export default SettingsButton;
