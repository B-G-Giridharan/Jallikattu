import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, Users, Target, TrendingUp } from "lucide-react";
import { LiveFeed } from "../components/LiveFeed";
import { AlertPanel } from "../components/AlertPanel";
import { StatCard } from "../components/StatCard";
import { IncidentHistory } from "../components/IncidentHistory";
import { SystemInfo } from "../components/SystemInfo";
import { MediaUpload } from "../components/MediaUpload";

export function DashboardPage() {
  const [bullCount, setBullCount] = useState(12);
  const [participantCount, setParticipantCount] = useState(47);
  const [riskLevel, setRiskLevel] = useState<'Low' | 'Medium' | 'High'>('Low');

  useEffect(() => {
    const interval = setInterval(() => {
      setBullCount((prev) => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(8, Math.min(15, prev + change));
      });

      setParticipantCount((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(40, Math.min(60, prev + change));
      });

      const risks: Array<'Low' | 'Medium' | 'High'> = ['Low', 'Low', 'Low', 'Medium', 'High'];
      setRiskLevel(risks[Math.floor(Math.random() * risks.length)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const cameraFeeds = [
    { id: 1, location: 'Main Arena - North View', isActive: true },
    { id: 2, location: 'Main Arena - South View', isActive: true },
    { id: 3, location: 'Entry Gate - East', isActive: true },
    { id: 4, location: 'Participant Zone', isActive: true },
    { id: 5, location: 'Bull Holding Area', isActive: false },
    { id: 6, location: 'Emergency Exit - West', isActive: true }
  ];

  const getRiskColor = (): 'blue' | 'purple' | 'red' | 'green' => {
    if (riskLevel === 'High') return 'red';
    if (riskLevel === 'Medium') return 'purple';
    return 'green';
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Bulls Detected"
          value={bullCount}
          icon={Target}
          trend="neutral"
          trendValue="Live"
          color="blue"
        />
        <StatCard
          title="Participants Detected"
          value={participantCount}
          icon={Users}
          trend="neutral"
          trendValue="Live"
          color="purple"
        />
        <StatCard
          title="Current Risk Level"
          value={riskLevel}
          icon={TrendingUp}
          trend={riskLevel === 'High' ? 'up' : riskLevel === 'Medium' ? 'neutral' : 'down'}
          trendValue={riskLevel}
          color={getRiskColor()}
        />
        <StatCard
          title="Active Cameras"
          value="5/6"
          icon={Activity}
          trend="up"
          trendValue="83%"
          color="green"
        />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Live Feeds */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Live CCTV Feeds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cameraFeeds.map((feed, index) => (
                  <motion.div
                    key={feed.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <LiveFeed
                      feedId={feed.id}
                      location={feed.location}
                      isActive={feed.isActive}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Media Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <MediaUpload />
          </motion.div>

          {/* System Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SystemInfo />
          </motion.div>
        </div>

        {/* Right Column - Alerts & History */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AlertPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <IncidentHistory />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
