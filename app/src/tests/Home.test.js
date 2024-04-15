import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/home/Home';
import NavigationPanel from '../components/NavigationPanel';
import Frame from '../components/TopPanel';
import LifeQuestFormTriangle from '../components/LifeQuestFormTriangle';

// Mock the useFontSize hook to return specific values
jest.mock('../contexts/FontSizeContext', () => ({
  useFontSize: () => ({
    fontSize: 16, // Sample font size
    darkMode: false, // Sample dark mode value
  }),
}));

jest.mock('../components/NavigationPanel', () => {
  return function DummyNavigationPanel() {
    return <div data-testid="navigation-panel" />;
  };
});

jest.mock('../components/TopPanel', () => {
  return function DummyFrame() {
    return <div data-testid="top-panel" />;
  };
});

jest.mock('../components/LifeQuestFormTriangle', () => {
  return function DummyLifeQuestFormTriangle() {
    return <div data-testid="form-triangle" />;
  };
});

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('navigation-panel')).toBeInTheDocument();
    expect(screen.getByTestId('top-panel')).toBeInTheDocument();
    expect(screen.getByTestId('form-triangle')).toBeInTheDocument();
    expect(screen.getByText('LifeQuest')).toBeInTheDocument();
  });
});