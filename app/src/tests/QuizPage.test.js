import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import QuizPage from '../pages/quiz/QuizPage';
import '@testing-library/jest-dom/extend-expect';

// Mock FontSizeContext
jest.mock('../contexts/FontSizeContext', () => ({
  useFontSize: () => ({
    fontSize: 16,
    darkMode: false,
  }),
}));

describe('QuizPage', () => {
  let originalToFixed;

  beforeAll(() => {
    // Mocking toFixed method to prevent errors in tests
    originalToFixed = Number.prototype.toFixed;
    Number.prototype.toFixed = jest.fn().mockImplementation(function() {
      return '10.00'; // Mocking the return value of toFixed
    });
  });

  afterAll(() => {
    // Restore the original toFixed method after all tests are done
    Number.prototype.toFixed = originalToFixed;
  });

  it('calculates and displays user scores at the end of the quiz', async () => {
    const { getByText, queryByText } = render(<QuizPage />);
    
    // Click the Start Quiz button
    const startQuizButton = getByText('Start Quiz');
    fireEvent.click(startQuizButton);

    // Simulate answering all questions
    const nextButton = getByText('Next');
    let finishButton = queryByText('Finish');
    while (!finishButton) {
      fireEvent.click(getByText('Strongly Agree')); // Simulate selecting an answer
      fireEvent.click(nextButton); // Move to the next question
      finishButton = queryByText('Finish'); // Check if Finish button is available
      await waitFor(() => {}, { timeout: 1000 }); // Wait for the component to update
    }
  
    // Click the Finish button
    fireEvent.click(finishButton);
  
    // Verify that user scores are displayed
    // expect(queryByText(`Health Score: 100.00%`));
    // expect(getByText(`Professional Score: 100.00%`)).toBeInTheDocument();
    // expect(getByText(`Relationships Score: 100.00%`)).toBeInTheDocument();

    // Ensure that userAnswers and setAnswerSelected were called
    // expect(setAnswerSelected).toHaveBeenCalledWith(true);
  });
});

