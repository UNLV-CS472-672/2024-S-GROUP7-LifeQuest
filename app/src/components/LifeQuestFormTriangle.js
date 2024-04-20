import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./LifeQuestFormTriangle.module.css";

// Defining a functional component named LifeQuestFormTriangle.
const LifeQuestFormTriangle = () => {
  const [userData, setUserData] = useState({
    MeStat: "",
    WorkStat: "",
    LoveStat: "",
  });

  // useEffect to handle side effects, runs only once after the component mounts.
  useEffect(() => {
    // Async function to fetch user data from the server.
    const fetchUserData = async () => {
      try {
        // Log to console before sending API request.
        console.log("sending api request to /users/me");
        // Making GET request to fetch data, with credentials to include cookies, etc.
        const response = await axios.get(
          "http://localhost:9000/users/me",
          { withCredentials: true }
        );
        const stats = response.data.stats; // Destructuring stats from response data.
        // Updating state with fetched data.
        setUserData({
          MeStat: stats.MeStat,
          WorkStat: stats.WorkStat,
          LoveStat: stats.LoveStat,
        });
      } catch (error) {
        // Log any errors during the fetch operation.
        console.error("Failed to fetch user data:", error);
        // Check if the error status is 401 (Unauthorized)
        if (error.response.status == 401) {
          console.log("Unauthorized user");
          // Redirect unauthorized users to the login page.
          window.location.href = "/";
        }
      }
    };
    
    fetchUserData();
  }, []);

  // Render method returns JSX to be rendered.
  return (
    <main className={styles.triangle} id="PageContent">
      <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      <div className={styles.mestat}>{userData.MeStat + "%" || "ME"}</div>
      <img className={styles.meicon} alt="" src="/meicon.svg" />
      <div className={styles.lovestat}>{userData.LoveStat + "%" || "LOVE"}</div>
      <img className={styles.loveicon} alt="" src="/loveicon.svg" />
      <div className={styles.workstat}>{userData.WorkStat + "%" || "WORK"}</div>
      <img className={styles.workicon} alt="" src="/workicon.svg" />
    </main>
  );
};

// Exporting the component to be used in other parts of the application.
export default LifeQuestFormTriangle;
