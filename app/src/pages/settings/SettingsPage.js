import React, { useState } from "react";
import NavigationPanel from "../../components/NavigationPanel";
import Frame from "../../components/TopPanel";
import PageContent from "../../components/PageContent";
import styles from "./SettingsPage.module.css";
import { useFontSize } from '../../contexts/FontSizeContext';
import axios from "axios";

const SettingsPage = () => {
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize, darkMode, toggleDarkMode } = useFontSize();
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

  //THIS IS JUST A TEST FUNCTION, PLEASE FEEL FREE TO MODIFY IT TO ACTUALLY BE A DELETE REQUEST

  async function handleDeleteAccountClick() {

    setShowDeleteAccountPopup(true);

    try{
      //Our back end address
      axios.defaults.baseURL = 'http://localhost:9000';

      //The POST request
      const response = await axios.post('/settings/test', {}, { withCredentials: true })
      .then(function (response) {
          //handle success
          console.log(response);
      })
      .catch(function (error) {
          // handle error
          if (error.response.status == 401){
            //unauthorized users get booted back to login
            window.location.href = '/'
          }
          console.log(error);
      })
    }
    catch(foo){
        console.log(foo);
    }
  };

  return (
    <div className={`${styles.settingsPage} ${darkMode ? styles.darkMode : ''}`} style={{ fontSize: `${fontSize}px` }} data-testid="settings-page">
      <NavigationPanel />
      <label className={styles.pageLabel} htmlFor="page_label">
        <div className={styles.settingsPagePage}>
          Settings Page
        </div>
      </label>
      <Frame />
      <PageContent
        pageContentHeight="511px"
        pageContentPosition="absolute"
        pageContentTop="178px"
        pageContentLeft="26px"
      />
      
      <div className={styles.fontSizeControls}>
        <div>
          Text Size
        </div>
		<div className={styles.fontSizeButtonContainer}>
          <button onClick={decreaseFontSize} className={styles.decreaseButton}>
            -
          </button>
          <button onClick={resetFontSize} className={styles.resetButton}>
            RESET
          </button>
          <button onClick={increaseFontSize} className={styles.increaseButton}>
            +
          </button>
		</div>
      </div>  
	  <div className={styles.themeControls}>
		<button onClick={toggleDarkMode} className={styles.darkModeButton}>
		  {darkMode ? 'Light Mode' : 'Dark Mode'}
		</button>
	  </div>
	  <div className={styles.resetQuizButtonContainer}>
	    <button onClick={() => {}} className={styles.resetQuizButton}>
		  Retake Quiz
		</button>
	  </div>
	  <div className={styles.logoutButtonContainer}>
	    <button onClick={() => {}} className={styles.logoutButton}>
		  Logout
		</button>
	  </div>
	  <div className={styles.deleteAccountButtonContainer}>
	    <button onClick={handleDeleteAccountClick} className={styles.deleteAccountButton}>
		  Delete Account
		</button>
		{showDeleteAccountPopup && (
          <div className={styles.deleteAccountButtonpopup} data-testid="delete-account-popup">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={() => setShowDeleteAccountPopup(false)}>Cancel</button>
            <button onClick={() => setShowDeleteAccountPopup(false)}>Confirm</button>
          </div>
        )}
	  </div>
    </div>
  );
};

export default SettingsPage;
