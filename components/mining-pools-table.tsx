import * as React from 'react';

export type MiningPool = {
  id: string;
  name: string;
  hashrateTHs: number;
  activeWorkers: number;
  rejectRate: number;
  status: 'online' | 'degraded' | 'offline';
};

const statusColor: Record<MiningPool['status'], string> = {
  online: 'text-green-600',
  degraded: 'text-yellow-500',
  offline: 'text-red-600',
};

export function MiningPoolsTable({ pools, onDetails }:{ pools: MiningPool[]; onDetails: (pool: MiningPool) => void }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="px-4 py-2 text-left">Название пула</th>
            <th className="px-4 py-2 text-left">Хешрейт (TH/s)</th>
            <th className="px-4 py-2 text-left">Активные воркеры</th>
            <th className="px-4 py-2 text-left">Reject rate</th>
            <th className="px-4 py-2 text-left">Статус</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool) => (
            <tr key={pool.id} className="border-t">
              <td className="px-4 py-2 font-medium">{pool.name}</td>
              <td className="px-4 py-2">{pool.hashrateTHs}</td>
              <td className="px-4 py-2">{pool.activeWorkers}</td>
              <td className="px-4 py-2">{(pool.rejectRate * 100).toFixed(2)}%</td>
              <td className={"px-4 py-2 font-semibold " + statusColor[pool.status]}>{pool.status}</td>
              <td className="px-4 py-2">
                <button className="text-primary underline hover:text-primary/80" onClick={() => onDetails(pool)}>
                  Подробнее
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 