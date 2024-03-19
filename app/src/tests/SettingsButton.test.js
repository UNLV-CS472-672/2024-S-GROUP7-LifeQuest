import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsButton from '../components/SettingsButton';
import '@testing-library/jest-dom/extend-expect';

describe('SettingsButton', () => {
  it('renders without crashing', () => {
    render(<SettingsButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('has the correct base class', () => {
    render(<SettingsButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('settingsnav');
  });

  it('contains the settings icon with correct class and src', () => {
    render(<SettingsButton />);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toHaveClass('settingsIcon');
    expect(iconElement).toHaveAttribute('src', '/settings-icon.svg');
    expect(iconElement).toHaveAttribute('alt', '');
  });
});
