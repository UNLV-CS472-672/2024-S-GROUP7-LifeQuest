import React from 'react';
import { render, fireEvent } from '@testing-library/react'; 
import QuestsPage from '../pages/quests/QuestsPage';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

// Mocking the FontSize context for testing
jest.mock('../contexts/FontSizeContext', () => ({
  useFontSize: () => ({
    fontSize: 16, // Set a default font size for testing purposes
    darkMode: false, // Set a default dark mode value for testing purposes
  }),
}));

describe('QuestsPage', () => {
  // Test case to ensure that QuestsPage renders without crashing
  it('renders without crashing', () => {
    const component = renderer.create(
      <QuestsPage />
    );
    // No assertions needed, just check if rendering succeeds
  });

  // Test case to ensure that a quest is added to in-progress when start quest button is clicked
  it('adds quest to in-progress when start quest button is clicked', () => {
    const { getAllByText, getByText } = render(<QuestsPage />);
    // Click the start quest button for the first available quest
    fireEvent.click(getAllByText('Start Quest')[0]);

    // Check if the quest is added to in-progress quests section
    expect(getByText('In Progress Quests')).toBeInTheDocument();
    expect(getByText('Quest 1')).toBeInTheDocument(); // Ensure the quest title is visible
  });

  // Test case to ensure that a quest moves from in-progress to completed when complete quest button is clicked
  it('moves quest from in-progress to completed when complete quest button is clicked', () => { 
    const { getAllByText, queryByText } = render(<QuestsPage />);

    // Start a quest
    fireEvent.click(getAllByText('Start Quest')[0]);
    // Complete the quest
    fireEvent.click(getAllByText('Complete Quest')[0]);

    // Added debugging lines:
    console.log(document.body.innerHTML);
    console.log(screen.queryByText('Completed Quests'));
    console.log(screen.queryByText('Quest 1'));

    // Ensure the quest is moved to completed
    expect(queryByText('Quest 1')).not.toBeInTheDocument(); // Ensure the quest is not in in-progress
    expect(queryByText('Completed Quests')).toBeInTheDocument(); // Ensure the completed quests section is visible
    expect(queryByText('Quest 1')).toBeInTheDocument(); // Ensure the quest is in completed quests
  });

  // Test case to ensure that the visibility of completed quests toggles correctly when button is clicked
  it('toggles visibility of completed quests when button is clicked', () => {
    const { getByText, queryByText } = render(<QuestsPage />);

    // Initially, completed quests section should not be visible
    expect(queryByText('Completed Quests')).toBeNull();

    // Click the button to toggle visibility of completed quests
    fireEvent.click(getByText('Show Completed Quests'));

    // Now, completed quests section should be visible
    expect(getByText('Completed Quests')).toBeInTheDocument();

    // Click the button again to hide completed quests
    fireEvent.click(getByText('Hide Completed Quests'));

    // Now, completed quests section should not be visible again
    expect(queryByText('Completed Quests')).toBeNull();
  });

  // Test case to ensure that each quest block has the correct class name
  it('renders quest blocks with correct class name', () => {
    const { getAllByTestId } = render(<QuestsPage />);

    // Get all quest blocks by data-testid 
    const questBlocks = getAllByTestId('quest-block');

    // Assert that each quest block has the correct class name
    questBlocks.forEach((questBlock) => {
      expect(questBlock).toHaveClass('questBlock');
    });
  });
});