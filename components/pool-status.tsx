import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Circle } from "lucide-react"

export function PoolStatus() {
  // Mock data
  const status = "Online"
  const uptime = "12:34:56"

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
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span>Status</span>
            <span className="text-green-500">{status}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Uptime</span>
            <span>{uptime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 