import React, { useState } from "react";
import NavigationPanel from "../../components/NavigationPanel";
import Frame from "../../components/TopPanel";
import PageContent from "../../components/PageContent";
import styles from "./QuizPage.module.css";
import questionsData from "./quiz_questions.json";
import { useFontSize } from '../../contexts/FontSizeContext';
import axios from "axios";

const QuizPage = () => {
  const { fontSize, darkMode } = useFontSize();
  const pageClassName = darkMode ? `${styles.quizPage} ${styles.darkMode}` : styles.quizPage;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Initialize with -1 for start quiz section
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(false);
  const totalQuestions = questionsData.length;

  // Defining separate scores for the questions here
  const [healthScore, setHealthScore] = useState(0);
  const [professionalScore, setProfessionalScore] = useState(0);
  const [relationshipsScore, setRelationshipsScore] = useState(0);

  const handleAnswerSelection = (answer, category) => {
    const currentQuestion = questionsData[currentQuestionIndex];
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: { answer, category },
    });

    // Update the user scores, based on the category of question
    switch (category) {
      case "health":
        setHealthScore((prevScore) => prevScore + answer);
        break;
      case "professional":
        setProfessionalScore((prevScore) => prevScore + answer);
        break;
      case "relationship":
        setRelationshipsScore((prevScore) => prevScore + answer);
        break;
      default:
        break;
    }

    setAnswerSelected(true); // Set answerSelected to true when an answer is selected
  };

  const handleNextButtonClick = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSelected(false); // Reset answerSelected when moving to the next question
    } else {
      setQuizCompleted(true);
    }
  };

  async function handleFinishQuizClick() {

    axios.defaults.baseURL = 'http://localhost:9000';

    /*
    Axios makes a post request to the address, feeding in the user inputed
    credentials. Await for a response.
    */
    const response = await axios.post('/users/changestats', {
      //These must be rounded. Otherwise expect floating point errors :(
      newMeStat: Math.floor(healthPercentage),
      newLoveStat: Math.floor(relationshipsPercentage),
      newWorkStat: Math.floor(professionalPercentage)
    },
    { withCredentials: true //Required for cookies.
    })

    //Got a response, now let's handle it

    .then(function (response) {
        //Quiz was successful! Let's go to the home page.
        window.location.href = '/home';
    })
    .catch(function (error) {
        // Uh oh, bad quiz submission! Let's see what went wrong.
        console.log(error);
    })
  };

  // Calculate the total possible points for each category
  const totalPossiblePoints = (totalQuestions / 3) * 5; // Assuming each question has a max score of 5

  // Calculate the percentages for each category
  const healthPercentage = (healthScore / totalPossiblePoints) * 100;
  const professionalPercentage = (professionalScore / totalPossiblePoints) * 100;
  const relationshipsPercentage = (relationshipsScore / totalPossiblePoints) * 100;

  return (
    <div className={pageClassName} style={{ fontSize: `${fontSize}px` }} data-testid="quiz-page">
      <NavigationPanel />
      <Frame />
      <PageContent
        pageContentHeight="511px"
        pageContentPosition="absolute"
        pageContentTop="178px"
        pageContentLeft="26px"
      />
      <div className={styles.questionContainer}>
        {currentQuestionIndex === -1 && !quizCompleted && (
          <div>
          <h1 style={{ fontSize: "23px" }}>Initial Assessment Quiz</h1>
          <p>
            This quiz will assess you in the following three categories:
          </p>
          <ul>
            <li>
              <strong>Health</strong> - Your overall physical and mental well being.
            </li>
              <br/>
            <li>
              <strong>Relationships</strong> - The strength of your relationships with family, friends, and partners.
            </li>
              <br/>
            <li>
              <strong>Professional</strong> - Strength of professional endeavors such as employment status, career goals, skill sets, and work satisfaction.
            </li>
          </ul>
          <p>
            Answers as honestly as possible to get the most accurate results.
            <br/><br/>Quiz length: ~10 minutes
          </p>
          <button onClick={() => setCurrentQuestionIndex(0)} className={styles.nextButton}>Start Quiz</button>
        </div>        
        )}
        {currentQuestionIndex < totalQuestions && !quizCompleted && currentQuestionIndex !== -1 && (
          <div className={styles.question}>
            {questionsData[currentQuestionIndex].question}
          </div>
        )}
        {!quizCompleted && currentQuestionIndex !== -1 && (
          <div className={styles.answerOptions}>
            <button className={userAnswers[currentQuestionIndex]?.answer === 1 ? styles.selected : ""} onClick={() => handleAnswerSelection(1, questionsData[currentQuestionIndex].category)}>Strongly Disagree</button>
            <button className={userAnswers[currentQuestionIndex]?.answer === 2 ? styles.selected : ""} onClick={() => handleAnswerSelection(2, questionsData[currentQuestionIndex].category)}>Disagree</button>
            <button className={userAnswers[currentQuestionIndex]?.answer === 3 ? styles.selected : ""} onClick={() => handleAnswerSelection(3, questionsData[currentQuestionIndex].category)}>Neutral</button>
            <button className={userAnswers[currentQuestionIndex]?.answer === 4 ? styles.selected : ""} onClick={() => handleAnswerSelection(4, questionsData[currentQuestionIndex].category)}>Agree</button>
            <button className={userAnswers[currentQuestionIndex]?.answer === 5 ? styles.selected : ""} onClick={() => handleAnswerSelection(5, questionsData[currentQuestionIndex].category)}>Strongly Agree</button>
          </div>
        )}
        {!quizCompleted && currentQuestionIndex !== -1 && (
          <button onClick={handleNextButtonClick} className={styles.nextButton} disabled={!answerSelected}>
            {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Finish"}
          </button>
        )}
        {quizCompleted && (
          <div>
            <div>Health Score: {healthPercentage.toFixed(2)}%</div>
            <div>Professional Score: {professionalPercentage.toFixed(2)}%</div>
            <div>Relationships Score: {relationshipsPercentage.toFixed(2)}%</div>
            <button onClick={handleFinishQuizClick} className={styles.answerOptions}>Finish Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
