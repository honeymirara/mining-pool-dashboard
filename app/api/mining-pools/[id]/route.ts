import { NextRequest, NextResponse } from 'next/server';

const poolDetailsMock: Record<string, {
  last24hRevenueBTC: number;
  uptimePercent: number;
  location: string;
  feePercent: number;
}> = {
  'pool-1': {
    last24hRevenueBTC: 0.035,
    uptimePercent: 99.82,
    location: 'Ashburn, VA',
    feePercent: 1.0,
  },
  'pool-2': {
    last24hRevenueBTC: 0.021,
    uptimePercent: 98.45,
    location: 'Frankfurt, DE',
    feePercent: 1.2,
  },
  'pool-3': {
    last24hRevenueBTC: 0.012,
    uptimePercent: 97.12,
    location: 'Singapore',
    feePercent: 1.5,
  },
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const details = poolDetailsMock[id];
  if (!details) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(details);
} 