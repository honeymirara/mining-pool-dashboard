import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PoolStatus } from '../pool-status';
import React from 'react';

describe('PoolStatus', () => {
  it('renders mock status and uptime', () => {
    render(<PoolStatus />);
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('12:34:56')).toBeInTheDocument();
    // Only one <span>Status</span> label in the card content
    const statusSpans = screen.getAllByText('Status').filter(el => el.tagName === 'SPAN');
    expect(statusSpans).toHaveLength(1);
    expect(screen.getByText(/Uptime/i)).toBeInTheDocument();
  });
}); 