import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/login/Login.js';

describe('LoginPage', () => {
    it('renders without crashing', () => {
        const {getByTestId, getByLabelText} = render(<LoginPage />);
      
        const emailLabel = getByText(/email:/i)
        const passwordLabel = getByText(/password:/i)

        expect(emailLabel).toBeInDocument()
        expect(passwordLabel).toBeInDocument()

        const emailInput = getByLabelText(/email:/i);
        expect(emailInput).toHaveAttribute('type', 'email');

        const passwordInput = getByLabelText(/password:/i);
        expect(passwordInput).toHaveAttribute('type', 'password');

    });
});