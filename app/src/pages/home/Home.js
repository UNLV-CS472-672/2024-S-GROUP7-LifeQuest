import NavigationPanel from "../../components/NavigationPanel";
import Frame from "../../components/TopPanel";
import LifeQuestFormTriangle from "../../components/LifeQuestFormTriangle";
import styles from "./Home.module.css";
import { useFontSize } from '../../contexts/FontSizeContext';

const Home = () => {
  const { fontSize, darkMode} = useFontSize();	
	
  return (
    <div className={`${styles.home} ${darkMode ? styles.darkMode : ''}`} style={{ fontSize: `${fontSize}px` }} data-testid="home-page">
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
