import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MiningPoolsTable, MiningPool } from '../mining-pools-table';
import React from 'react';

describe('MiningPoolsTable', () => {
  const pools: MiningPool[] = [
    {
      id: 'pool-1',
      name: 'US East Pool',
      hashrateTHs: 830.5,
      activeWorkers: 1240,
      rejectRate: 0.012,
      status: 'online',
    },
    {
      id: 'pool-2',
      name: 'EU Central Pool',
      hashrateTHs: 460.3,
      activeWorkers: 876,
      rejectRate: 0.045,
      status: 'degraded',
    },
  ];

  it('renders table with pool data', () => {
    render(<MiningPoolsTable pools={pools} onDetails={() => {}} />);
    expect(screen.getByText('US East Pool')).toBeInTheDocument();
    expect(screen.getByText('EU Central Pool')).toBeInTheDocument();
    expect(screen.getByText('830.5')).toBeInTheDocument();
    expect(screen.getByText('1240')).toBeInTheDocument();
    expect(screen.getAllByText('Details')).toHaveLength(2);
  });

  it('shows empty message if no pools', () => {
    render(<MiningPoolsTable pools={[]} onDetails={() => {}} />);
    expect(screen.getByText(/no pools available/i)).toBeInTheDocument();
  });

  it('shows skeleton when loading', () => {
    render(<MiningPoolsTable pools={[]} onDetails={() => {}} loading />);
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
}); 