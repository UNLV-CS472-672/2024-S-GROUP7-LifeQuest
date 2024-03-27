import React, { useState } from "react";
import NavigationPanel from "../../components/NavigationPanel";
import Frame from "../../components/TopPanel";
import PageContent from "../../components/PageContent";
import styles from "./QuestsPage.module.css";
import { useFontSize } from '../../contexts/FontSizeContext'; 

const QuestsPage = () => {
  // State to manage available quests
  const [availableQuests, setAvailableQuests] = useState([
    { id: 1, title: "Quest 1", text: "Quest 1 Description" },
    { id: 2, title: "Quest 2", text: "Quest 2 Description" },
    { id: 3, title: "Quest 3", text: "Quest 3 Description" }
  ]);
  // State to manage quests in progress
  const [inProgressQuests, setInProgressQuests] = useState([]);
  // State to manage completed quests
  const [completedQuests, setCompletedQuests] = useState([]);
  // State to toggle visibility of completed quests
  const [showCompletedQuests, setShowCompletedQuests] = useState(false);

  // Function to handle adding a quest to in progress
  const startQuest = (quest) => {
    setInProgressQuests([...inProgressQuests, quest]);
    removeAvailableQuest(quest.id);
  };

  // Function to handle completing a quest
  const completeQuest = (quest) => {
    setCompletedQuests([...completedQuests, quest]);
    removeInProgressQuest(quest.id);
  };

  // Function to remove a quest from available quests
  const removeAvailableQuest = (id) => {
    setAvailableQuests(availableQuests.filter(quest => quest.id !== id));
  };

  // Function to remove a quest from in progress quests
  const removeInProgressQuest = (id) => {
    setInProgressQuests(inProgressQuests.filter(quest => quest.id !== id));
  };

  // Function to toggle visibility of completed quests
  const toggleCompletedQuests = () => {
    setShowCompletedQuests(!showCompletedQuests);
  };

  return (
    <div className={styles.QuestsPage}>
      {/* Navigation Panel */}
      <NavigationPanel />
      {/* Page Label */}
      <label className={styles.pageLabel} htmlFor="page_label">
        <div className={styles.questsPageTitle}>Quests Page</div>
      </label>
      {/* Frame */}
      <Frame />
      {/* Page Content */}
      <PageContent
        pageContentHeight="511px"
        pageContentPosition="absolute"
        pageContentTop="178px"
        pageContentLeft="26px"
      />

      {/* In progress quests section */}
      {!showCompletedQuests && (
        <div className={`${styles.questSection} ${styles.inProgressQuests}`}>
          <h2 className={styles.questTitle}>In Progress Quests</h2>
          {/* Render quests in progress */}
          {inProgressQuests.length === 0 && <p>No quests in progress</p>}
          {inProgressQuests.map((quest, index) => (
            <div key={index} className={styles.questBlock}>
              <h3 className={styles.questBlockTitle}>{quest.title}</h3>
              <p className={styles.questBlockText}>{quest.text}</p>
              {/* Button to complete quest */}
              <button onClick={() => completeQuest(quest)} className={styles.button}>
                Complete Quest
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Available quests section */}
      {!showCompletedQuests && (
        <div className={`${styles.questSection} ${styles.availableQuests}`}>
          <h2 className={styles.questTitle}>Available Quests</h2>
          {/* Render available quests */}
          {availableQuests.length === 0 && <p>No available quests</p>}
          {availableQuests.map((quest) => (
            <div key={quest.id} className={styles.questBlock}>
              <h3 className={styles.questBlockTitle}>{quest.title}</h3>
              <p className={styles.questBlockText}>{quest.text}</p>
              {/* Button to start quest */}
              <button onClick={() => startQuest(quest)} className={styles.button}>
                Start Quest
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Completed quests section */}
      {showCompletedQuests && (
        <div className={`${styles.questSection} ${styles.completedQuests}`}>
          <h2 className={styles.questTitle}>Completed Quests</h2>
          {/* Render completed quests */}
          {completedQuests.length === 0 && <p>No completed quests</p>}
          {completedQuests.map((quest, index) => (
            <div key={index} className={styles.questBlock}>
              <h3 className={styles.questBlockTitle}>{quest.title}</h3>
              <p className={styles.questBlockText}>{quest.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Button to toggle visibility of completed quests */}
      <button onClick={toggleCompletedQuests} className={styles.button}>
        {showCompletedQuests ? "Hide Completed Quests" : "Show Completed Quests"}
      </button>

    </div>
  );
};

export default QuestsPage;