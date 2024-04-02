import React from 'react';
import { render, screen } from '@testing-library/react';
import Skeleton from '../pages/skeleton/Skeleton';
import '@testing-library/jest-dom/extend-expect';


// Mocking useFontSize hook
jest.mock('../contexts/FontSizeContext', () => ({
  useFontSize: () => ({
    fontSize: 16, // Sample font size
    darkMode: false, // Sample dark mode value
  }),
}));

describe('Skeleton Component', () => {
  test('renders skeleton route', () => {
    render(<Skeleton />);
    const skeletonRoute = screen.getByTestId('skeleton-route');
    expect(skeletonRoute).toBeInTheDocument();
  });

  test('renders navigation panel', () => {
    render(<Skeleton />);
    const navigationPanel = screen.getByTestId('navigation-panel');
    expect(navigationPanel).toBeInTheDocument();
  });

  test('renders frame', () => {
    render(<Skeleton />);
    const frame = screen.getByTestId('top-panel');
    expect(frame).toBeInTheDocument();
  });

  test('renders page content', () => {
    render(<Skeleton />);
    const pageContent = screen.getByTestId('page-content');
    expect(pageContent).toBeInTheDocument();
  });
});
