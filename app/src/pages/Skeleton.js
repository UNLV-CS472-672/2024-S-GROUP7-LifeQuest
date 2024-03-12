import NavigationPanel from "../components/NavigationPanel";
import Frame from "../components/TopPanel";
import PageContent from "../components/PageContent";
import styles from "./Skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <NavigationPanel />
      <label className={styles.pageLabel} htmlFor="page_label">
        <div className={styles.skeletonPage}>Skeleton Page</div>
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

export default Skeleton;
