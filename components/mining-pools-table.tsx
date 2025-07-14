import * as React from 'react';
import { Eye } from 'lucide-react';

export type MiningPool = {
  id: string;
  name: string;
  hashrateTHs: number;
  activeWorkers: number;
  rejectRate: number;
  status: 'online' | 'degraded' | 'offline';
};

const statusColor: Record<MiningPool['status'], string> = {
  online: 'bg-green-500',
  degraded: 'bg-yellow-400',
  offline: 'bg-red-500',
};

export type SortColumn = 'name' | 'hashrate' | 'workers';

const sortableThClass =
  'px-4 py-2 text-left cursor-pointer select-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 hover:bg-accent';

// Skeleton loader for table
function TableSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card animate-pulse">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="px-4 py-2 text-left w-1/5"><div className="h-4 bg-muted rounded w-3/4" /></th>
            <th className="px-4 py-2 text-left w-1/5"><div className="h-4 bg-muted rounded w-2/3" /></th>
            <th className="px-4 py-2 text-left w-1/5"><div className="h-4 bg-muted rounded w-2/3" /></th>
            <th className="px-4 py-2 text-left w-1/5"><div className="h-4 bg-muted rounded w-1/2" /></th>
            <th className="px-4 py-2 text-left w-1/5"><div className="h-4 bg-muted rounded w-1/2" /></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2"><div className="h-4 bg-muted/60 rounded w-3/4" /></td>
              <td className="px-4 py-2"><div className="h-4 bg-muted/60 rounded w-2/3" /></td>
              <td className="px-4 py-2"><div className="h-4 bg-muted/60 rounded w-2/3" /></td>
              <td className="px-4 py-2"><div className="h-4 bg-muted/60 rounded w-1/2" /></td>
              <td className="px-4 py-2"><div className="h-4 bg-muted/60 rounded w-1/2" /></td>
              <td className="px-4 py-2"><div className="h-8 w-16 bg-muted/60 rounded" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MiningPoolsTable({
  pools,
  onDetails,
  onSort,
  sortBy,
  sortDir,
  loading,
}: {
  pools: MiningPool[];
  onDetails: (pool: MiningPool) => void;
  onSort?: (col: SortColumn) => void;
  sortBy?: SortColumn | null;
  sortDir?: 'asc' | 'desc';
  loading?: boolean;
}) {
  if (loading) {
    return <TableSkeleton rows={3} />;
  }
  if (!pools.length) {
    return <div className="text-muted-foreground py-8 text-center">No pools available</div>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th
              className={sortableThClass}
              tabIndex={0}
              onClick={() => onSort && onSort('name')}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSort && onSort('name')}
              aria-sort={sortBy === 'name' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Pool Name
              {sortBy === 'name' && (sortDir === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th
              className={sortableThClass}
              tabIndex={0}
              onClick={() => onSort && onSort('hashrate')}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSort && onSort('hashrate')}
              aria-sort={sortBy === 'hashrate' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Hashrate (TH/s)
              {sortBy === 'hashrate' && (sortDir === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th
              className={sortableThClass}
              tabIndex={0}
              onClick={() => onSort && onSort('workers')}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSort && onSort('workers')}
              aria-sort={sortBy === 'workers' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Active Workers
              {sortBy === 'workers' && (sortDir === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th className="px-4 py-2 text-left">Reject rate</th>
            <th className="px-4 py-2 text-left">Status</th>
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
              <td className="px-4 py-2 font-semibold flex items-center gap-2">
                <span className={`inline-block w-3 h-3 rounded-full ${statusColor[pool.status]}`}></span>
                {pool.status}
              </td>
              <td className="px-4 py-2">
                <button
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-accent text-accent-foreground hover:bg-accent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60"
                  aria-label={`View details for ${pool.name}`}
                  onClick={() => onDetails(pool)}
                >
                  <Eye className="w-4 h-4" />
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 