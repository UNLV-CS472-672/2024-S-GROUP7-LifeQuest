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

        // ai-gen end

    });

});