import { NextResponse } from 'next/server';

const miningPools = [
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
  {
    id: 'pool-3',
    name: 'Asia Pacific Pool',
    hashrateTHs: 210.7,
    activeWorkers: 432,
    rejectRate: 0.021,
    status: 'offline',
  },
];

export async function GET() {
  return NextResponse.json(miningPools);
} 