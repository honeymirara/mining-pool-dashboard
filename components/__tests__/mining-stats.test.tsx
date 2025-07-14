import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MiningStats } from '../mining-stats';
import React from 'react';

describe('MiningStats', () => {
  it('renders mock hashrate and active miners', () => {
    render(<MiningStats />);
    expect(screen.getByText('1234.56 H/s')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText(/Hash Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Miners/i)).toBeInTheDocument();
  });
}); 