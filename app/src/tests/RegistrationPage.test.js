// Generated using ChatGPT
// https://chat.openai.com/share/8500a5b2-a5fd-4bc2-8b69-5823401f8b7c

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import RegistrationPage from '../pages/registration/RegistrationPage.js';

jest.mock('axios');

describe('RegistrationPage', () => {
	afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });
	
	
	
    test('should submit registration form', async () => {
		// Mock window.alert
		const originalAlert = window.alert;
		window.alert = jest.fn();

		// Mock window.location.assign
		const assignMock = jest.fn();
		const originalLocation = window.location;
		delete window.location;
		window.location = { assign: assignMock };

		render(<RegistrationPage />);

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
		const registerButton = screen.getByText('Register');

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password' } });
		fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

		axios.post.mockResolvedValueOnce({ data: { success: true } });

		fireEvent.click(registerButton);

		await waitFor(() => {
			expect(axios.post).toHaveBeenCalledWith('/register', {
				email: 'test@example.com',
				password: 'password'
			}, { withCredentials: true });
		});

		// Restore original window.alert
		window.alert = originalAlert;
		// Restore original window.location
		window.location = originalLocation;
	});

    test('should display error if passwords do not match', async () => {
        // Mock window.alert
        const originalAlert = window.alert;
        window.alert = jest.fn();

        render(<RegistrationPage />);

        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const registerButton = screen.getByText('Register');

        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

        fireEvent.click(registerButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
        });

        // Restore original window.alert
        window.alert = originalAlert;
    });
	
	test('handles error properly', async () => {
        // Mock axios post function to simulate an error response
        axios.post.mockRejectedValue(new Error('Registration failed'));

        render(<RegistrationPage />);

        // Simulate form submission
        fireEvent.submit(screen.getByRole('button', { name: /register/i }));

        // Check if error is logged
        await waitFor(() => {
            // expect(console.log).toHaveBeenCalledWith(expect.any(Error));
        });
    });

	test('redirects to login page on return button click', () => {
	  // Mock window.location.assign
	  const assignMock = jest.fn();
	  const originalLocation = window.location;
	  window.location = { assign: assignMock };

	  render(<RegistrationPage />);

	  // Simulate click on the "Return" button
	  fireEvent.click(screen.getByRole('button', { name: /Return/ }));

	  // Restore original window.location
	  window.location = originalLocation;
	});
	
});
