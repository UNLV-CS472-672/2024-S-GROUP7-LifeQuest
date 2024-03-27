import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/login/Login.js';
import {
    Routes,
    Route,
    BrowserRouter
  } from "react-router-dom";
import '@testing-library/jest-dom';

describe('LoginPage', () => {
    it('renders without crashing', () => {
        const {getByText, getByLabelText} = render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
        );
        

      
        const emailLabel = getByText(/Email/i)
        const passwordLabel = getByText(/Password/i)

        expect(emailLabel).toBeInDocument()
        expect(passwordLabel).toBeInDocument()

        const emailInput = getByLabelText(/Email/i);
        expect(emailInput).toHaveAttribute('type', 'email');

        const passwordInput = getByLabelText(/Password/i);
        expect(passwordInput).toHaveAttribute('type', 'password');

    });
});