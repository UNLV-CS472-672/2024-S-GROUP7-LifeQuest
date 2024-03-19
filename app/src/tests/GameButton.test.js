import React from 'react';
import { render, screen } from '@testing-library/react';
import GameButton from '../components/GameButton';
import '@testing-library/jest-dom/extend-expect';

describe('GameButton', () => {
  it('renders without crashing', () => {
    render(<GameButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('has the correct base class', () => {
    render(<GameButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('gamenav');
  });

  it('contains the game icon with correct class and src', () => {
    render(<GameButton />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toHaveClass('gameIcon');
    expect(iconElement).toHaveAttribute('src', '/game-icon.svg');
    expect(iconElement).toHaveAttribute('alt', '');
  });
});
