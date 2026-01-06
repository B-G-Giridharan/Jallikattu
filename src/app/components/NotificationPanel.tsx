import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, X, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface Notification {
  id: string;
  type: 'alert' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulate periodic notifications
    const interval = setInterval(() => {
      const types: Array<'alert' | 'success' | 'info'> = ['alert', 'success', 'info'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const messages = {
        alert: [
          { title: 'Foul Play Detected', message: 'Camera 3 detected rule violation in Main Arena' },
          { title: 'High Risk Level', message: 'Risk level elevated to HIGH in South View' },
          { title: 'Multiple Violations', message: 'Multiple participants engaging single bull detected' }
        ],
        success: [
          { title: 'All Clear', message: 'All cameras showing normal activity' },
          { title: 'System Check Complete', message: 'All systems functioning normally' },
          { title: 'Safe Event', message: 'No violations detected in the last hour' }
        ],
        info: [
          { title: 'New Camera Online', message: 'Camera 5 is now active and monitoring' },
          { title: 'Analysis Complete', message: 'Uploaded media analysis finished' },
          { title: 'Daily Report Ready', message: 'Event summary report is available' }
        ]
      };

      const randomMessages = messages[randomType];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];

      const newNotification: Notification = {
        id: Date.now().toString(),
        type: randomType,
        title: randomMessage.title,
        message: randomMessage.message,
        timestamp: new Date()
      };

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
    }, 20000); // New notification every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-red-500/10 dark:bg-red-500/10 border-red-500/30';
      case 'success':
        return 'bg-green-500/10 dark:bg-green-500/10 border-green-500/30';
      default:
        return 'bg-blue-500/10 dark:bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-zinc-800 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-300 hover:bg-zinc-700 dark:hover:bg-zinc-700 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-96 max-h-[500px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Notifications</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {unreadCount > 0 && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {unreadCount} new notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-[400px] custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                    <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`mb-2 p-3 rounded-lg border ${getNotificationStyles(notification.type)}`}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                                {notification.title}
                              </h4>
                              <button
                                onClick={() => removeNotification(notification.id)}
                                className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(82, 82, 91, 0.6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(113, 113, 122, 0.8);
        }
      `}</style>
    </div>
  );
}
