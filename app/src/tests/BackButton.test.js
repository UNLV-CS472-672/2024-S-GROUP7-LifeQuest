import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BackButton from '../components/BackButton';
import '@testing-library/jest-dom/extend-expect';

describe('BackButton', () => {
  it('renders without crashing', () => {
    render(<BackButton backButtonPosition="fixed" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the correct position style based on props', () => {
    const { rerender } = render(<BackButton backButtonPosition="fixed" />);
    let buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle('position: fixed');

    rerender(<BackButton backButtonPosition="absolute" />);
    buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle('position: absolute');
  });

  it('contains the correct icon', () => {
    render(<BackButton backButtonPosition="fixed" />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toHaveAttribute('src', '/group.svg');
    expect(iconElement).toHaveClass('groupIcon');
  });

  it('navigates to the correct location when clicked', () => {
    const { container } = render(<BackButton backButtonPosition="fixed" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    
    // Mock window.location.href setter
    const originalLocation = window.location.href;
    delete window.location;
    window.location = { href: '' };

    // Click the button
    buttonElement.click();

    // Assert window.location.href is updated
    expect(window.location.href).toBe('/home');

    // Restore original window.location
    window.location = originalLocation;
  });
});
