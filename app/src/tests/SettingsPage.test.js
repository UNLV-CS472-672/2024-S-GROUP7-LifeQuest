import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SettingsPage from '../pages/settings/SettingsPage';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../contexts/FontSizeContext', () => ({
  useFontSize: () => ({
    fontSize: 16, 
    increaseFontSize: jest.fn(),
    decreaseFontSize: jest.fn(),
    resetFontSize: jest.fn(),
    darkMode: false, 
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
});