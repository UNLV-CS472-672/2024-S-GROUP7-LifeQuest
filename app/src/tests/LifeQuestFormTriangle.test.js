import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor } from '@testing-library/react';
import LifeQuestFormTriangle from '../components/LifeQuestFormTriangle';
import '@testing-library/jest-dom';

const mock = new MockAdapter(axios);

// Simulate a successful response assuming the cookie is already there
mock.onGet("http://localhost:9000/users/completedquiz@test.com").reply(200, {
  stats: { MeStat: '50', WorkStat: '70', LoveStat: '60' }
});

describe('LifeQuestFormTriangle with authenticated cookie', () => {
  it('fetches and displays data correctly', async () => {
    const { getByText } = render(<LifeQuestFormTriangle />);
    await waitFor(() => {
      expect(getByText('50%')).toBeInTheDocument();
      expect(getByText('70%')).toBeInTheDocument();
      expect(getByText('60%')).toBeInTheDocument();
    });
  });
});

