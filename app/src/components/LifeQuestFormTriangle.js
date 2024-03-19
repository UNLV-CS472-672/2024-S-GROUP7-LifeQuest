import styles from "./LifeQuestFormTriangle.module.css";

const LifeQuestFormTriangle = () => {
  return (
    <main className={styles.triangle} id="PageContent">
      <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      <textarea
        className={styles.mestat}
        placeholder="MeStat"
        rows={1}
        maxLength={4}
        id="MeStat"
        cols={1}
      />
      <img className={styles.meicon} alt="" src="/meicon.svg" />
      <textarea
        className={styles.workstat}
        placeholder="WorkStat"
        rows={1}
        maxLength={4}
        id="WorkStat"
        cols={1}
      />
      <img className={styles.workicon} alt="" src="/workicon.svg" />
      <textarea
        className={styles.lovestat}
        placeholder="LoveStat"
        rows={1}
        maxLength={4}
        id="LoveStat"
        cols={1}
      />
      <img className={styles.loveicon} alt="" src="/loveicon.svg" />
    </main>
  );
};

export default LifeQuestFormTriangle;
