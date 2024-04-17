import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/login/Login.js';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from 'axios'

jest.mock('axios');
console.log = jest.fn();

describe('LoginPage', () => {
    it('renders without crashing', () => {
        const {getByPlaceholderText, getByText} = render(<LoginPage />);

        //Check that the h1 title is there
        expect(getByText('LifeQuest')).toBeInTheDocument();

        //Check that there is an email input field
        const emailInput = getByPlaceholderText(/Email/i);
        expect(emailInput).toHaveAttribute('type', 'email');

        //Check that there is a password input field
        const passwordInput = getByPlaceholderText(/Password/i);
        expect(passwordInput).toHaveAttribute('type', 'password');

        //Check that the login and signup buttons are there
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Signup')).toBeInTheDocument();

    });

    it('input field updates value with current input', () => {

        const {getByPlaceholderText} = render(<LoginPage />);
        const emailInput = getByPlaceholderText(/Email/i);
        const passwordInput = getByPlaceholderText(/Password/i);

        // ai-gen start (ChatGPT-3.5, 1)
        // Simulate typing into the input field
        fireEvent.change(emailInput, { target: { value: 'TestUserName' } });
        fireEvent.change(passwordInput, { target: { value: 'Pa$$w0rd' } });

        // Ensure that the state has been updated correctly
        expect(emailInput.value).toBe('TestUserName');
        expect(passwordInput.value).toBe('Pa$$w0rd');
    });
        
        // ai-gen end

        // ai-gen again (Antonio)
        // Conversation Link ->    https://chat.openai.com/share/740a955d-f5a6-4747-8cdd-4b62356f2ea1

        it('submits login form and redirects on successful login', async () => {
            const { getByText, getByPlaceholderText } = render(<LoginPage />);
            const emailInput = getByPlaceholderText(/Email/i);
            const passwordInput = getByPlaceholderText(/Password/i);

            // Simulate typing into input fields
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });

            // Mock successful login response
            axios.post.mockResolvedValueOnce({ data: { user: { id: 1, username: 'test_user', email: 'test@example.com' }, token: 'mock-auth-token' } } );

            const url = "http://localhost:3000.com";     // <- Fernando's code
            
            Object.defineProperty(window, 'location', {  // <- Fernando's code
              value: {
                href: url
              }
            });
            
            // Trigger form submission
            fireEvent.click(getByText('Login'));

            // Wait for redirect (if successful)
            await waitFor(() => {
                expect(window.location.href).toBe('/home');
            });
        });

        it('handles error on failed login', async () => {
            const { getByText, getByPlaceholderText } = render(<LoginPage />);
            const emailInput = getByPlaceholderText(/Email/i);
            const passwordInput = getByPlaceholderText(/Password/i);
    
            // Simulate typing into input fields
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    
            // Mock failed login response
            axios.post.mockRejectedValueOnce(new Error('Unauthorized'));
    
            // Trigger form submission
            fireEvent.click(getByText('Login'));
    
            // Wait for error handling
            await waitFor(() => {
                expect(console.log).toHaveBeenCalledWith(new Error('Unauthorized'));
            });
        });  
    // End ai-gen (Antonio) 
});
