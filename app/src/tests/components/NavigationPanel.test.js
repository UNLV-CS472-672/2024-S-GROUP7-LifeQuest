import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationPanel from '../../components/NavigationPanel';

// moc components
jest.mock('../../../components/SettingsButton', () => () => <div data-testid="settings-button"></div>);
jest.mock('../../../components/QuestsButton', () => () => <div data-testid="quests-button"></div>);
jest.mock('../../../components/GameButton', () => () => <div data-testid="game-button"></div>);


describe('NavigationPanel', () => {
  it('renders the navigation panel with all child components', () => {
    render(<NavigationPanel />);

    // Check if all child components are in the document
    expect(screen.getByTestId('settings-button')).toBeInTheDocument();
    expect(screen.getByTestId('quests-button')).toBeInTheDocument();
    expect(screen.getByTestId('game-button')).toBeInTheDocument();
  });
});
