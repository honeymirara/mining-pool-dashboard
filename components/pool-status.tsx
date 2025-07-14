import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Circle } from "lucide-react"

export function PoolStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Circle className="h-5 w-5 text-green-500" />
          Pool Status
        </CardTitle>
        <CardDescription>Current pool status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Status</span>
            <span className="text-sm font-medium text-green-600">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Uptime</span>
            <span className="text-sm font-mono">00:00:00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 