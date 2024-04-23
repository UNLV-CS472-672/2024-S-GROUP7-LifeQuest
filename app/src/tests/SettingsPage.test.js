// This test file was developed with the help of ChatGPT 3.5
// Converstaion Link: https://chat.openai.com/share/c8cda0b5-99fb-444d-998a-f630a96a52af

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SettingsPage from '../pages/settings/SettingsPage';
import '@testing-library/jest-dom/extend-expect';
import styles from '../pages/settings/SettingsPage.module.css';

jest.mock('axios');
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


// Start of ChatGPT code (Antonio Tessier) 
// Conversation link -> https://chat.openai.com/share/4bea6d17-2817-454e-94ad-04bd2e9f0c8d

	it('runs delete account temporary function when delete account button is clicked', async () => {
		const { getByText } = render(<SettingsPage />);
		const deleteAccountButton = getByText('Delete Account');

		fireEvent.click(deleteAccountButton);

		// Ensure that handleDeleteAccountClick is called
		await waitFor(() => {
			expect(axios.post).toHaveBeenCalled();
		});
	});

	it('handles unauthorized error correctly', async () => {
		// Mock axios post function to return an error
		axios.post.mockRejectedValue({ response: { status: 401 } });

		const { getByText } = render(<SettingsPage />);
		const deleteAccountButton = getByText('Delete Account');

	        const url = "http://localhost:3000.com";     // <- Fernando's code
	    
	        Object.defineProperty(window, 'location', {  // <- Fernando's code
	          value: {
		    href: url
	          }
	        });	
		
		fireEvent.click(deleteAccountButton);

		// Ensure user is redirected to login page on unauthorized error
		await waitFor(() => {
			expect(window.location.href).toBe('/');
		});
	});
// End of ChatGPT code.
});
