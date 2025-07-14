import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '~/components/ui/dialog';
import { MiningPool } from './mining-pools-table';
import { Loader2 } from 'lucide-react';

// Type for pool details (can be extended as needed)
type PoolDetails = {
  last24hRevenueBTC: number;
  uptimePercent: number;
  location: string;
  feePercent: number;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pool: MiningPool | null;
};

export function PoolDetailsDialog({ open, onOpenChange, pool }: Props) {
  const [details, setDetails] = React.useState<PoolDetails | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open && pool) {
      setLoading(true);
      setError(null);
      setDetails(null);
      fetch(`/api/mining-pools/${pool.id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load details');
          return res.json();
        })
        .then((data) => setDetails(data))
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    } else if (!open) {
      setDetails(null);
      setError(null);
      setLoading(false);
    }
  }, [open, pool]);

  if (!pool) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Pool Details: {pool.name}</DialogTitle>
          <DialogDescription className="text-center">Detailed information about the selected mining pool</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mt-4 min-h-[120px] flex flex-col justify-center items-center text-center">
          {loading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin w-6 h-6 text-muted-foreground mr-2" />
              <span>Loading...</span>
            </div>
          )}
          {error && <div className="text-red-600">{error}</div>}
          {details && !loading && !error && (
            <>
              <div><span className="font-medium">Status:</span> {pool.status}</div>
              <div><span className="font-medium">Hashrate:</span> {pool.hashrateTHs} TH/s</div>
              <div><span className="font-medium">Active Workers:</span> {pool.activeWorkers}</div>
              <div><span className="font-medium">Reject Rate:</span> {(pool.rejectRate * 100).toFixed(2)}%</div>
              <div><span className="font-medium">24h Revenue:</span> {details.last24hRevenueBTC} BTC</div>
              <div><span className="font-medium">Uptime:</span> {details.uptimePercent}%</div>
              <div><span className="font-medium">Location:</span> {details.location}</div>
              <div><span className="font-medium">Fee:</span> {details.feePercent}%</div>
            </>
          )}
        </div>
        <DialogClose asChild>
          <button className="mt-4 w-full rounded bg-primary text-primary-foreground py-2 transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/60">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
} 