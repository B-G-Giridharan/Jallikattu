import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Incident {
  id: number;
  type: 'violation' | 'safe';
  description: string;
  timestamp: Date;
  camera: string;
  severity?: 'high' | 'medium' | 'low';
}

export function IncidentHistory() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 1,
      type: 'safe',
      description: 'Normal activity detected',
      timestamp: new Date(Date.now() - 120000),
      camera: 'Camera 1'
    },
    {
      id: 2,
      type: 'violation',
      description: 'Foul play detected - Excessive force observed',
      timestamp: new Date(Date.now() - 300000),
      camera: 'Camera 3',
      severity: 'high'
    },
    {
      id: 3,
      type: 'safe',
      description: 'Normal activity detected',
      timestamp: new Date(Date.now() - 480000),
      camera: 'Camera 2'
    },
    {
      id: 4,
      type: 'violation',
      description: 'Unauthorized entry to restricted zone',
      timestamp: new Date(Date.now() - 720000),
      camera: 'Camera 4',
      severity: 'medium'
    },
    {
      id: 5,
      type: 'safe',
      description: 'Normal activity detected',
      timestamp: new Date(Date.now() - 900000),
      camera: 'Camera 1'
    },
    {
      id: 6,
      type: 'violation',
      description: 'Multiple participants engaging with single bull',
      timestamp: new Date(Date.now() - 1200000),
      camera: 'Camera 2',
      severity: 'high'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIncident: Incident = {
        id: Date.now(),
        type: Math.random() > 0.7 ? 'violation' : 'safe',
        description: Math.random() > 0.7 
          ? 'Foul play detected - Rule violation observed' 
          : 'Normal activity detected',
        timestamp: new Date(),
        camera: `Camera ${Math.floor(Math.random() * 6) + 1}`,
        severity: Math.random() > 0.5 ? 'high' : 'medium'
      };

      setIncidents((prev) => [newIncident, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleString();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-zinc-400 dark:text-zinc-400" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Incident History</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {incidents.map((incident, index) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`border rounded-lg p-4 ${
              incident.type === 'violation'
                ? 'bg-red-500/5 border-red-500/30'
                : 'bg-green-500/5 border-green-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${
                incident.type === 'violation' ? 'text-red-500' : 'text-green-500'
              }`}>
                {incident.type === 'violation' ? (
                  <AlertCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`font-medium text-sm ${
                    incident.type === 'violation' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {incident.type === 'violation' ? 'Violation Detected' : 'Normal Activity'}
                  </p>
                  {incident.severity && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      incident.severity === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {incident.severity.toUpperCase()}
                    </span>
                  )}
                </div>
                
                <p className="text-zinc-300 text-sm mb-2">{incident.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{incident.camera}</span>
                  <span>•</span>
                  <span>{formatTimestamp(incident.timestamp)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(82, 82, 91, 0.8);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(113, 113, 122, 0.8);
        }
      `}</style>
    </div>
  );
}