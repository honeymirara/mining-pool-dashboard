import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function RecentBlocks() {
  // Mock data
  const blocks = [
    { id: 1, height: 123456, time: "10:15:00", reward: 0.025 },
    { id: 2, height: 123455, time: "09:50:00", reward: 0.024 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Blocks</CardTitle>
        <CardDescription>Latest mined blocks</CardDescription>
      </CardHeader>
      <CardContent>
        {blocks.length === 0 ? (
          <p className="text-muted-foreground">No blocks found</p>
        ) : (
          <ul className="space-y-2">
            {blocks.map(block => (
              <li key={block.id} className="text-sm">
                Block #{block.height} — {block.time} — {block.reward} BTC
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
} 