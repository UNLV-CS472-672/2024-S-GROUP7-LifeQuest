// This test file was developed with the help of ChatGPT 3.5
// Converstaion Link: https://chat.openai.com/share/c8cda0b5-99fb-444d-998a-f630a96a52af

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SettingsPage from '../pages/settings/SettingsPage';
import '@testing-library/jest-dom/extend-expect';
import styles from '../pages/settings/SettingsPage.module.css';

jest.mock('../contexts/FontSizeContext', () => ({
  useFontSize: () => ({
    fontSize: 16, 
    increaseFontSize: jest.fn(),
    decreaseFontSize: jest.fn(),
    resetFontSize: jest.fn(),
    darkMode: true, 
    toggleDarkMode: jest.fn(),
  }),
}));

describe('SettingsPage Component', () => {
  it('renders without crashing', () => {
    render(<SettingsPage />);
  });

  it('shows delete account popup when delete account button is clicked', () => {
    const { getByText, getByTestId } = render(<SettingsPage />);
    const deleteAccountButton = getByText('Delete Account');

    fireEvent.click(deleteAccountButton);

    const popup = getByTestId('delete-account-popup');
    expect(popup).toBeInTheDocument();
  });
  
  it('hides delete account popup when cancel button is clicked', () => {
	const { getByText, getByTestId, queryByTestId } = render(<SettingsPage />);
	const deleteAccountButton = getByText('Delete Account');

	fireEvent.click(deleteAccountButton);

	const cancelBtn = getByText('Cancel');
	fireEvent.click(cancelBtn);

	const popup = queryByTestId('delete-account-popup');
	expect(popup).toBeNull();
  });
  
  it('hides delete account popup when confirm button is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(<SettingsPage />);
	const deleteAccountButton = getByText('Delete Account');
	
	fireEvent.click(deleteAccountButton);
	
	const confirmBtn = getByText('Confirm');
	fireEvent.click(confirmBtn);
	
	const popup = queryByTestId('delete-account-popup');
	expect(popup).toBeNull();
  });
  
  it('renders the settings page label', () => {
	const { getByText } = render(<SettingsPage />);
	const settingsPageLabel = getByText('Settings Page');
	expect(settingsPageLabel).toBeInTheDocument();
  });
  
	it('applies dark mode styles when dark mode is enabled', () => {
	  const { container } = render(<SettingsPage />);
	  const settingsPage = container.querySelector(`.${styles.settingsPage}`);

	  // Check if the settingsPage element exists
	  expect(settingsPage).toBeInTheDocument();

	  // Check if the dark mode class is applied
	  expect(settingsPage).toHaveClass(styles.darkMode); // Use styles.darkMode
	});


});