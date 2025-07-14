"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { MiningStats } from "~/components/mining-stats"
import { PoolStatus } from "~/components/pool-status"
import { ThemeToggle } from "~/components/ui/theme-toggle"
import { MiningPoolsTable, MiningPool } from "~/components/mining-pools-table"
import * as React from "react"

export default function Home() {
  const [pools, setPools] = React.useState<MiningPool[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    fetch("/api/mining-pools")
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки данных");
        return res.json();
      })
      .then((data) => {
        setPools(data);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Заглушка для модалки
  const handleDetails = (pool: MiningPool) => {
    alert(`Детали пула: ${pool.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold mb-8">Mining Pool Dashboard</h1>

        <div className="mb-8">
          {loading && <div className="text-muted-foreground">Загрузка пулов...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {pools && (
            <MiningPoolsTable pools={pools} onDetails={handleDetails} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MiningStats />
          <PoolStatus />
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Blocks</CardTitle>
              <CardDescription>Latest mined blocks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No blocks found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 