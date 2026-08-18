import { useState } from "react";
import { Activity, Plus } from "lucide-react";

interface ICMPMonitor {
  id: string;
  host: string;
  interval: number;
  active: boolean;
  lastPing?: {
    latency: number;
    status: "up" | "down" | "timeout";
    timestamp: string;
  };
}

interface ICMPMonitorListProps {
  monitors: ICMPMonitor[];
  onAddMonitor?: () => void;
}

const statusColors = {
  up: "text-green-600 dark:text-green-400",
  down: "text-red-600 dark:text-red-400",
  timeout: "text-yellow-600 dark:text-yellow-400",
};

const statusBg = {
  up: "bg-green-100 dark:bg-green-900/30",
  down: "bg-red-100 dark:bg-red-900/30",
  timeout: "bg-yellow-100 dark:bg-yellow-900/30",
};

export function ICMPMonitorList({ monitors, onAddMonitor }: ICMPMonitorListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            ICMP / Port Monitoring
          </h2>
        </div>
        {onAddMonitor && (
          <button
            onClick={onAddMonitor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Monitor
          </button>
        )}
      </div>

      {monitors.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          No ICMP monitors configured. Add one to start tracking host availability.
        </div>
      ) : (
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {monitors.map((monitor) => (
            <li key={monitor.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{monitor.host}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Every {monitor.interval}s
                  {monitor.lastPing && ` | Last check: ${new Date(monitor.lastPing.timestamp).toLocaleTimeString()}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {monitor.lastPing && (
                  <>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {monitor.lastPing.latency}ms
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[monitor.lastPing.status]} ${statusBg[monitor.lastPing.status]}`}>
                      {monitor.lastPing.status}
                    </span>
                  </>
                )}
                <div className={`h-2.5 w-2.5 rounded-full ${monitor.active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
