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
  details: PoolDetails | null;
};

export function PoolDetailsDialog({ open, onOpenChange, pool, details }: Props) {
  if (!pool || !details) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Детали пула: {pool.name}</DialogTitle>
          <DialogDescription>Подробная информация о выбранном майнинг-пуле</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          <div><span className="font-medium">Статус:</span> {pool.status}</div>
          <div><span className="font-medium">Хешрейт:</span> {pool.hashrateTHs} TH/s</div>
          <div><span className="font-medium">Активные воркеры:</span> {pool.activeWorkers}</div>
          <div><span className="font-medium">Reject rate:</span> {(pool.rejectRate * 100).toFixed(2)}%</div>
          <div><span className="font-medium">Доход за 24ч:</span> {details.last24hRevenueBTC} BTC</div>
          <div><span className="font-medium">Аптайм:</span> {details.uptimePercent}%</div>
          <div><span className="font-medium">Локация:</span> {details.location}</div>
          <div><span className="font-medium">Комиссия:</span> {details.feePercent}%</div>
        </div>
        <DialogClose asChild>
          <button className="mt-4 w-full rounded bg-primary text-primary-foreground py-2">Закрыть</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
} 