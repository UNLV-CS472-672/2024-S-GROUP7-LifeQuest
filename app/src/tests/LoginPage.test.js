import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/login/Login.js';
import {
    Routes,
    Route,
    BrowserRouter
  } from "react-router-dom";


describe('LoginPage', () => {
    it('renders without crashing', () => {
        const {getByText, getByLabelText} = render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
        );
      

        const emailInput = getByPlaceholderText(/Email/i);
        expect(emailInput).toHaveAttribute('type', 'email');

        const passwordInput = getByPlaceholderText(/Password/i);
        expect(passwordInput).toHaveAttribute('type', 'password');

    });
});