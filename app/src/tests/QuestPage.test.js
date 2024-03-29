import React from 'react';
import { render, fireEvent, } from '@testing-library/react'; 
import QuestsPage from '../pages/quests/QuestsPage';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

// Mocking the FontSize
jest.mock('../contexts/FontSizeContext', () => ({
  useFontSize: () => ({
    fontSize: 16, // Set a default font size for testing purposes
    darkMode: false, // Set a default dark mode value for testing purposes
  }),
}));

describe('QuestsPage', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <QuestsPage />
    );
    // Check if initial sections are rendered
  });

  it('adds quest to in-progress when start quest button is clicked', () => {
    const { getAllByText, getByText } = render(<QuestsPage />);
    // Click the start quest button for the first available quest
    fireEvent.click(getAllByText('Start Quest')[0]);

    // Check if the quest is added to in-progress quests section
    expect(getByText('In Progress Quests')).toBeInTheDocument();
    expect(getByText('Quest 1')).toBeInTheDocument(); // checking for 'Quest 1'
  });

  it('moves quest from in-progress to completed when complete quest button is clicked', () => { 
    const { getAllByText, queryByText } = render(<QuestsPage />);

    fireEvent.click(getAllByText('Start Quest')[0]);
    fireEvent.click(getAllByText('Complete Quest')[0]);
    


  });

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
});