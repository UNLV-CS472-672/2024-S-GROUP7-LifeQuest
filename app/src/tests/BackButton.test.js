import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
