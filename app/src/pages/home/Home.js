import NavigationPanel from "../../components/NavigationPanel";
import Frame from "../../components/TopPanel";
import LifeQuestFormTriangle from "../../components/LifeQuestFormTriangle";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <NavigationPanel />
      <label className={styles.pageLabel} htmlFor="page_label">
        <div className={styles.pagetitle}>LifeQuest</div>
      </label>
      <Frame />
      <LifeQuestFormTriangle />
    </div>
  );
};

export default Home;
