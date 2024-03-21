import React, { useState } from "react";
import NavigationPanel from "../components/NavigationPanel";
import Frame from "../components/TopPanel";
import PageContent from "../components/PageContent";
import styles from "./QuestsPage.module.css";

const QuestsPage = () => {
  // State to manage all quests
  const [quests, setQuests] = useState([{ title: "Sample Title", text: "Sample Text" }]);
  // State to manage quests in progress
  const [inProgressQuests, setInProgressQuests] = useState([]);

  // Function to add a new empty quest
  const addQuest = () => {
    setQuests([...quests, { title: "", text: "" }]);
  };

  // Function to handle changes in quest title
  const handleTitleChange = (index, event) => {
    const newQuests = [...quests];
    newQuests[index].title = event.target.value;
    setQuests(newQuests);
  };

  // Function to handle changes in quest description
  const handleTextChange = (index, event) => {
    const newQuests = [...quests];
    newQuests[index].text = event.target.value;
    setQuests(newQuests);
  };

  // Function to move a quest from available quests to in progress quests
  const addQuestToInProgress = () => {
    if (quests.length > 0) {
      // Move the first quest from available quests to in progress quests
      setInProgressQuests([quests[0]]);
      // Remove the first quest from available quests
      setQuests(quests.slice(1));
    }
  };

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
      {/* In progress quests section */}
      <div className={`${styles.questSection} ${styles.inProgressQuests}`}>
        <h2 className={styles.questTitle}>In Progress Quests</h2>
        {inProgressQuests.length === 0 && <p>No quests in progress</p>}
        {/* Render quests in progress */}
        {inProgressQuests.map((quest, index) => (
          <div key={index} className={styles.questBlock}>
            <h3 className={styles.questBlockTitle}>{quest.title}</h3>
            <p className={styles.questBlockText}>{quest.text}</p>
          </div>
        ))}
      </div>
      {/* Available quests section */}
      <div className={`${styles.questSection} ${styles.availableQuests}`}>
        <h2 className={styles.questTitle}>Available Quests</h2>
        {quests.length === 0 && <p>No available quests</p>}
        {/* Render available quests */}
        {quests.map((quest, index) => (
          <div key={index} className={styles.questBlock}>
            <input
              type="text"
              value={quest.title}
              onChange={(event) => handleTitleChange(index, event)}
              placeholder="Quest Title"
              className={styles.questBlockTitle}
            />
            <textarea
              value={quest.text}
              onChange={(event) => handleTextChange(index, event)}
              placeholder="Quest Description"
              className={styles.questBlockText}
            />
          </div>
        ))}
        {/* Button to add a quest to In Progress Quests */}
        {quests.length > 0 && <button onClick={addQuestToInProgress} className={styles.button}>Add Quest</button>}
      </div>
    </div>
  );
};
export default QuestsPage;