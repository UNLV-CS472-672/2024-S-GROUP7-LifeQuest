import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/login/Login.js';
import { Routes, Route, BrowserRouter } from "react-router-dom";


describe('LoginPage', () => {
    it('renders without crashing', () => {
        const {getByPlaceholderText, getByText} = render(<LoginPage />);

        expect(getByText('LifeQuest')).toBeInTheDocument();

        const emailInput = getByPlaceholderText(/Email/i);
        expect(emailInput).toHaveAttribute('type', 'email');

        const passwordInput = getByPlaceholderText(/Password/i);
        expect(passwordInput).toHaveAttribute('type', 'password');

    });
    
    // ai-gen start (ChatGPT-3.5, 0)

    it('input variable update with input put in', () => {
        const {getByRole} = render(<LoginPage />);

        const inputField = getByRole('textbox');

        // Simulate typing into the input field
        fireEvent.change(inputField, { target: { value: 'Test input' } });
      
        // Ensure that the state has been updated correctly
        expect(inputField.value).toBe('Test input');

    });

    // ai-gen end

});