import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./LifeQuestFormTriangle.module.css";

const LifeQuestFormTriangle = () => {
  const [userData, setUserData] = useState({
    MeStat: '',
    WorkStat: '',
    LoveStat: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/users/completedquiz@test.com');
        const stats = response.data.stats;
        setUserData({ MeStat: stats.MeStat, WorkStat: stats.WorkStat, LoveStat: stats.LoveStat });
        console.log('User data fetched successfully:', response.data);
        console.log('MeStat:', userData.MeStat);
        console.log('WorkStat:', userData.WorkStat);
        console.log('LoveStat:', userData.LoveStat);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <main className={styles.triangle} id="PageContent">
      <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      <div className={styles.mestat}>{userData.MeStat || "ME"}</div>
      <img className={styles.meicon} alt="" src="/meicon.svg" />
      <div className={styles.lovestat}>{userData.LoveStat || "LOVE"}</div>
      <img className={styles.loveicon} alt="" src="/loveicon.svg" />
      <div className={styles.workstat}>{userData.WorkStat || "WORK"}</div>
      <img className={styles.workicon} alt="" src="/workicon.svg" />
    </main>
  );
};

export default LifeQuestFormTriangle;
