import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, Hash, Users } from "lucide-react"

export function MiningStats() {
  // Mock data
  const hashRate = 1234.56; // H/s
  const activeMiners = 42;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Mining Statistics
        </CardTitle>
        <CardDescription>Current mining performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Hash Rate</span>
            </div>
            <span className="font-mono">{hashRate} H/s</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Active Miners</span>
            </div>
            <span className="font-mono">{activeMiners}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 