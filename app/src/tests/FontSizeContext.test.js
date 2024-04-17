// This test was generated with the help of ChatGPT 3.5
// Conversation Link: https://chat.openai.com/share/f5890424-2c82-4310-bdf9-0e825e2c1ff7

import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { FontSizeProvider, useFontSize } from '../contexts/FontSizeContext';

// Helper component to access context values
const ConsumerComponent = () => {
  const { titleFontSize, textFontSize, buttonFontSize, increaseFontSize, decreaseFontSize, resetFontSize, darkMode, toggleDarkMode } = useFontSize();

  return (
    <div>
      <div data-testid="title-size">{titleFontSize}</div>
      <div data-testid="text-size">{textFontSize}</div>
      <div data-testid="button-size">{buttonFontSize}</div>
      <button onClick={increaseFontSize}>Increase</button>
      <button onClick={decreaseFontSize}>Decrease</button>
      <button onClick={resetFontSize}>Reset</button>
      <div data-testid="dark-mode">{darkMode ? 'dark' : 'light'}</div>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
};

describe('FontSizeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('uses default font sizes when no values are stored in localStorage', () => {
    render(
      <FontSizeProvider>
        <ConsumerComponent />
      </FontSizeProvider>
    );

    expect(screen.getByTestId('title-size').textContent).toBe('24');
    expect(screen.getByTestId('text-size').textContent).toBe('18');
    expect(screen.getByTestId('button-size').textContent).toBe('12');
  });

  it('reads initial font sizes from localStorage if available', () => {
    localStorage.setItem('titleFontSize', '30');
    localStorage.setItem('textFontSize', '20');
    localStorage.setItem('buttonFontSize', '10');

    render(
      <FontSizeProvider>
        <ConsumerComponent />
      </FontSizeProvider>
    );

    expect(screen.getByTestId('title-size').textContent).toBe('30');
    expect(screen.getByTestId('text-size').textContent).toBe('20');
    expect(screen.getByTestId('button-size').textContent).toBe('10');
  });

  it('increases font sizes correctly within limits', () => {
    render(
      <FontSizeProvider>
        <ConsumerComponent />
      </FontSizeProvider>
    );

    const increaseButton = screen.getByText('Increase');
    act(() => {
      increaseButton.click();
    });

    expect(screen.getByTestId('title-size').textContent).toBe('26');
    expect(screen.getByTestId('text-size').textContent).toBe('20');
    expect(screen.getByTestId('button-size').textContent).toBe('14');
  });

  it('decreases font sizes correctly within limits', () => {
    render(
      <FontSizeProvider>
        <ConsumerComponent />
      </FontSizeProvider>
    );

    const decreaseButton = screen.getByText('Decrease');
    act(() => {
      decreaseButton.click();
    });

    expect(screen.getByTestId('title-size').textContent).toBe('22');
    expect(screen.getByTestId('text-size').textContent).toBe('16');
    expect(screen.getByTestId('button-size').textContent).toBe('10');
  });

  it('resets font sizes to default', () => {
    render(
      <FontSizeProvider>
        <ConsumerComponent />
      </FontSizeProvider>
    );

    const resetButton = screen.getByText('Reset');
    act(() => {
      resetButton.click();
    });

    expect(screen.getByTestId('title-size').textContent).toBe('24');
    expect(screen.getByTestId('text-size').textContent).toBe('18');
    expect(screen.getByTestId('button-size').textContent).toBe('12');
  });

  it('toggles dark mode correctly', () => {
    render(
      <FontSizeProvider>
        <ConsumerComponent />
      </FontSizeProvider>
    );

    const toggleButton = screen.getByText('Toggle Dark Mode');
    expect(screen.getByTestId('dark-mode').textContent).toBe('light');
    act(() => {
      toggleButton.click();
    });
    expect(screen.getByTestId('dark-mode').textContent).toBe('dark');
  });
  
  describe('FontSizeProvider font size adjustments', () => {
  it('does not increase font sizes beyond their max limits', () => {
    // Set initial sizes to their maximum minus 2 for testing increments just below the limit
    localStorage.setItem('titleFontSize', '34');
    localStorage.setItem('textFontSize', '28');
    localStorage.setItem('buttonFontSize', '22');

    render(
      <FontSizeProvider>
        <ConsumerComponent />
      </FontSizeProvider>
    );

    const increaseButton = screen.getByText('Increase');
    act(() => {
      increaseButton.click();
    });

    // Check that font sizes have increased by 2 and not gone over the max
    expect(screen.getByTestId('title-size').textContent).toBe('36');
    expect(screen.getByTestId('text-size').textContent).toBe('30');
    expect(screen.getByTestId('button-size').textContent).toBe('24');

    // Attempt to increase beyond the maximum
    act(() => {
      increaseButton.click();
    });

    // Check that font sizes do not increase beyond their maximum limits
    expect(screen.getByTestId('title-size').textContent).toBe('36');
    expect(screen.getByTestId('text-size').textContent).toBe('30');
    expect(screen.getByTestId('button-size').textContent).toBe('24');
  });

  it('does not decrease font sizes below their min limits', () => {
    // Set initial sizes to their minimum plus 2 for testing decrements just above the limit
    localStorage.setItem('titleFontSize', '20');
    localStorage.setItem('textFontSize', '14');
    localStorage.setItem('buttonFontSize', '8');

    render(
      <FontSizeProvider>
        <ConsumerComponent />
      </FontSizeProvider>
    );

    const decreaseButton = screen.getByText('Decrease');
    act(() => {
      decreaseButton.click();
    });

    // Check that font sizes have decreased by 2 and not gone under the minimum
    expect(screen.getByTestId('title-size').textContent).toBe('18');
    expect(screen.getByTestId('text-size').textContent).toBe('12');
    expect(screen.getByTestId('button-size').textContent).toBe('6');

    // Attempt to decrease below the minimum
    act(() => {
      decreaseButton.click();
    });

    // Check that font sizes do not decrease below their minimum limits
    expect(screen.getByTestId('title-size').textContent).toBe('18');
    expect(screen.getByTestId('text-size').textContent).toBe('12');
    expect(screen.getByTestId('button-size').textContent).toBe('6');
  });
});
});
