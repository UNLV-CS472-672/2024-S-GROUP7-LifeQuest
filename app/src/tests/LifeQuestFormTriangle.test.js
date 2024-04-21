import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import LifeQuestFormTriangle from '../components/LifeQuestFormTriangle';

// Mock the axios module
jest.mock('axios');

describe('LifeQuestFormTriangle', () => {
  test('successfully fetches and displays stats', async () => {
    // Mocking axios.get to resolve with specific data
    axios.get.mockResolvedValue({
      data: {
        stats: {
          MeStat: '80',
          WorkStat: '70',
          LoveStat: '60'
        }
      }
    });

    const { getByText } = render(<LifeQuestFormTriangle />);
    await waitFor(() => {
      expect(getByText('80%')).toBeInTheDocument();
      expect(getByText('70%')).toBeInTheDocument();
      expect(getByText('60%')).toBeInTheDocument();
    });
  });

  test('handles failure in fetching data', async () => {
    // Mocking axios.get to reject with an error
    axios.get.mockRejectedValue({
      response: {
        status: 401
      }
    });

    delete window.location;
    window.location = { href: '' }; // Mock window.location for redirect testing

    render(<LifeQuestFormTriangle />);
    await waitFor(() => {
      expect(window.location.href).toBe('/');
    });
  });
});
