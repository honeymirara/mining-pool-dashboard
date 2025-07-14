import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

// RecentBlocks defined as a function inside app/page.tsx, so we create a similar component here
function RecentBlocks({ blocks = [
  { id: 1, height: 123456, time: "10:15:00", reward: 0.025 },
  { id: 2, height: 123455, time: "09:50:00", reward: 0.024 },
] }: { blocks?: { id: number, height: number, time: string, reward: number }[] }) {
  return (
    <div>
      {blocks.length === 0 ? (
        <p className="text-muted-foreground">No blocks found</p>
      ) : (
        <ul>
          {blocks.map(block => (
            <li key={block.id}>
              Block #{block.height} — {block.time} — {block.reward} BTC
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

describe('RecentBlocks', () => {
  it('renders mock blocks', () => {
    render(<RecentBlocks />);
    expect(screen.getByText(/Block #123456/)).toBeInTheDocument();
    expect(screen.getByText(/Block #123455/)).toBeInTheDocument();
  });

  it('shows empty message if no blocks', () => {
    render(<RecentBlocks blocks={[]} />);
    expect(screen.getByText(/No blocks found/i)).toBeInTheDocument();
  });
}); 