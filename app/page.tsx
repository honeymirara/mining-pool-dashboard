"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { MiningStats } from "~/components/mining-stats"
import { PoolStatus } from "~/components/pool-status"
import { RecentBlocks } from "~/components/recent-blocks"
import { ThemeToggle } from "~/components/ui/theme-toggle"
import { MiningPoolsTable, MiningPool } from "~/components/mining-pools-table"
import { PoolDetailsDialog } from "~/components/pool-details-dialog"
import * as React from "react"
import { Loader2 } from "lucide-react"

// Mock details for each pool (can be replaced with API)
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

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'online', label: 'Online' },
  { value: 'degraded', label: 'Degraded' },
  { value: 'offline', label: 'Offline' },
];

// Add sorting type for name
export type SortColumn = 'name' | 'hashrate' | 'workers';

export default function Home() {
  const [pools, setPools] = React.useState<MiningPool[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Modal states
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedPool, setSelectedPool] = React.useState<MiningPool | null>(null);

  const [filterStatus, setFilterStatus] = React.useState<'all' | 'online' | 'degraded' | 'offline'>('all');
  const [sortBy, setSortBy] = React.useState<SortColumn | null>(null);
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc');

  const handleDetails = (pool: MiningPool) => {
    setSelectedPool(pool);
    setDialogOpen(true);
  };

  React.useEffect(() => {
    setLoading(true);
    fetch("/api/mining-pools")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => {
        setPools(data);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
}, []);

  // Filter and sort pools
  const filteredAndSortedPools = React.useMemo(() => {
    if (!pools) return [];
    let result = pools;
    if (filterStatus !== 'all') {
      result = result.filter((p) => p.status === filterStatus);
    }
    if (sortBy) {
      result = [...result].sort((a, b) => {
        let cmp = 0;
        if (sortBy === 'hashrate') cmp = a.hashrateTHs - b.hashrateTHs;
        if (sortBy === 'workers') cmp = a.activeWorkers - b.activeWorkers;
        if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [pools, filterStatus, sortBy, sortDir]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold mb-8">Mining Pool Dashboard</h1>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <label className="mr-2 font-medium">Status:</label>
            <select
              className="border rounded px-2 py-1 bg-background"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as any)}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin w-6 h-6 text-muted-foreground mr-2" />
              <span>Loading pools...</span>
            </div>
          )}
          {error && <div className="text-red-600">{error}</div>}
          <MiningPoolsTable
            pools={filteredAndSortedPools}
            onDetails={handleDetails}
            onSort={col => {
              if (sortBy === col) {
                setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
              } else {
                setSortBy(col as SortColumn);
                setSortDir('desc');
              }
            }}
            sortBy={sortBy}
            sortDir={sortDir}
            loading={loading}
          />
        </div>

        <PoolDetailsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          pool={selectedPool}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MiningStats />
          <PoolStatus />
          <RecentBlocks />
        </div>
      </div>
    </div>
  )
} 