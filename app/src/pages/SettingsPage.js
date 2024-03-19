import NavigationPanel from "../components/NavigationPanel";
import Frame from "../components/TopPanel";
import PageContent from "../components/PageContent";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  const handleButtonClick = () => {
    window.location.href = "https://wikipedia.com"; // Redirects to Wikipedia
  };

  return (
    <div className={styles.settingsPage}>
      <NavigationPanel />
      <label className={styles.pageLabel} htmlFor="page_label">
        <div className={styles.settingsPagePage}>Settings Page</div>
      </label>
      <Frame />
      <PageContent
        pageContentHeight="511px"
        pageContentPosition="absolute"
        pageContentTop="178px"
        pageContentLeft="26px"
      />
      <button onClick={handleButtonClick} className={styles.button}>
        Go to Wikipedia
      </button>
    </div>
  );
};

export default SettingsPage;