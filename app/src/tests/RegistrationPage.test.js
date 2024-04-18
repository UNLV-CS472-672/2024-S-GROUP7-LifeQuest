// Generated using ChatGPT
// https://chat.openai.com/share/8500a5b2-a5fd-4bc2-8b69-5823401f8b7c

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock axios
import RegistrationPage from '../pages/registration/RegistrationPage';

jest.mock('axios'); // Mock axios

describe('RegistrationPage Component', () => {
  it('submits registration form with valid data', async () => {
    // Mock axios post method
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    const { getByPlaceholderText, getByText } = render(<RegistrationPage />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/register', {
        email: 'test@example.com',
        password: 'password123'
      });
      expect(window.location.href).toBe('/login');
    });
  });

  it('displays alert if passwords do not match', () => {
    const { getByPlaceholderText, getByText } = render(<RegistrationPage />);

    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Register');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });

    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
    expect(axios.post).not.toHaveBeenCalled();
  });
  
  it('handles error properly if registration fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Registration failed'));

    const { getByPlaceholderText, getByText } = render(<RegistrationPage />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/register', {
        email: 'test@example.com',
        password: 'password123'
      });
      expect(window.alert).not.toHaveBeenCalled(); // Ensure alert is not called
      expect(console.log).toHaveBeenCalledWith(new Error('Registration failed'));
    });
  });

  it('redirects to login page when Return button is clicked', () => {
    const { getByText } = render(<RegistrationPage />);

    const returnButton = getByText('Return');

    fireEvent.click(returnButton);

    expect(window.location.href).toBe('/login');
  });
});
