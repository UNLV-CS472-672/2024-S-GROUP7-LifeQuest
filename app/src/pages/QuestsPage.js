import NavigationPanel from "../components/NavigationPanel";
import Frame from "../components/TopPanel";
import PageContent from "../components/PageContent";
import styles from "./QuestsPage.module.css";

const QuestsPage = () => {
  return (
    <div className={styles.QuestsPage}>
      <NavigationPanel />
      <label className={styles.pageLabel} htmlFor="page_label">
        <div className={styles.questsPageTitle}>Quests Page</div>
      </label>
      <Frame />
      <PageContent
        pageContentHeight="511px"
        pageContentPosition="absolute"
        pageContentTop="178px"
        pageContentLeft="26px"
      />
    </div>
  );
};

export default QuestsPage;