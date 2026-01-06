import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";

interface AlertStatus {
  type: 'safe' | 'warning' | 'danger';
  message: string;
  timestamp: Date;
}

export function AlertPanel() {
  const [currentAlert, setCurrentAlert] = useState<AlertStatus>({
    type: 'safe',
    message: 'No Foul Play',
    timestamp: new Date()
  });

  useEffect(() => {
    const alertSequence = [
      { type: 'safe' as const, message: 'No Foul Play', duration: 8000 },
      { type: 'warning' as const, message: 'Analyzing Movement', duration: 3000 },
      { type: 'safe' as const, message: 'No Foul Play', duration: 6000 },
      { type: 'danger' as const, message: 'Foul Play Detected', duration: 4000 },
      { type: 'safe' as const, message: 'No Foul Play', duration: 10000 },
    ];

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const scheduleNext = () => {
      const alert = alertSequence[currentIndex];
      setCurrentAlert({
        type: alert.type,
        message: alert.message,
        timestamp: new Date()
      });

      currentIndex = (currentIndex + 1) % alertSequence.length;
      timeoutId = setTimeout(scheduleNext, alert.duration);
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, []);

  const getAlertConfig = () => {
    switch (currentAlert.type) {
      case 'danger':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500',
          textColor: 'text-red-500',
          glowColor: 'shadow-red-500/50',
          iconBg: 'bg-red-500/20'
        };
      case 'warning':
        return {
          icon: Shield,
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-500',
          glowColor: 'shadow-yellow-500/50',
          iconBg: 'bg-yellow-500/20'
        };
      default:
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500',
          textColor: 'text-green-500',
          glowColor: 'shadow-green-500/50',
          iconBg: 'bg-green-500/20'
        };
    }
  };

  const config = getAlertConfig();
  const Icon = config.icon;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-zinc-400 dark:text-zinc-400" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">AI Alert Status</h3>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentAlert.message}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative ${config.bgColor} ${config.borderColor} border-2 rounded-lg p-6 ${config.glowColor} shadow-lg`}
        >
          <div className="flex items-center gap-4">
            <div className={`${config.iconBg} rounded-full p-3`}>
              <Icon className={`w-8 h-8 ${config.textColor}`} />
            </div>
            <div className="flex-1">
              <h4 className={`text-2xl font-bold ${config.textColor} mb-1`}>
                {currentAlert.message}
              </h4>
              <p className="text-zinc-400 text-sm">
                Last updated: {currentAlert.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {currentAlert.type === 'danger' && (
            <motion.div
              className="absolute inset-0 border-2 border-red-500 rounded-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-zinc-800/50 rounded p-2 text-center">
          <div className="text-green-500 font-semibold">Safe</div>
          <div className="text-zinc-400">Normal</div>
        </div>
        <div className="bg-zinc-800/50 rounded p-2 text-center">
          <div className="text-yellow-500 font-semibold">Warning</div>
          <div className="text-zinc-400">Monitoring</div>
        </div>
        <div className="bg-zinc-800/50 rounded p-2 text-center">
          <div className="text-red-500 font-semibold">Danger</div>
          <div className="text-zinc-400">Alert</div>
        </div>
      </div>
    </div>
  );
}