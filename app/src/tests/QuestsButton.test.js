import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestsButton from '../components/QuestsButton';
import '@testing-library/jest-dom/extend-expect';

describe('QuestsButton', () => {
  it('renders without crashing', () => {
    render(<QuestsButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('has the correct base class', () => {
    render(<QuestsButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('questsnav');
  });

  it('contains the quests icon with correct class and src', () => {
    render(<QuestsButton />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toHaveClass('questsIcon');
    expect(iconElement).toHaveAttribute('src', '/quest-icon.svg');
    expect(iconElement).toHaveAttribute('alt', '');
  });
});
