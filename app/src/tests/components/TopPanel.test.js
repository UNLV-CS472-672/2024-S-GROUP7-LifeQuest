import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopPanel from '../../components/TopPanel';
import BackButton from '../../components/BackButton';

// Mock BackButton
jest.mock('./BackButton', () => (props) => (
  <div data-testid="mock-back-button" {...props}></div>
));

describe('TopPanel', () => {
  it('renders the TopPanel component with the BackButton', () => {
    render(<TopPanel />);

    const topPanelElement = screen.getByTestId('top-panel');
    expect(topPanelElement).toBeInTheDocument();

    const backButton = screen.getByTestId('mock-back-button');
    expect(backButton).toBeInTheDocument();
  });
});
