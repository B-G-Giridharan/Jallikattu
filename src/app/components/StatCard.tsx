import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'blue' | 'purple' | 'red' | 'green';
}

export function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'blue' }: StatCardProps) {
  const colorConfig = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
    red: 'from-red-500/20 to-orange-500/20 border-red-500/30 text-red-400',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400'
  };

  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-zinc-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`bg-gradient-to-br ${colorConfig[color]} rounded-lg p-3 border`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && trendValue && (
          <span className={`text-xs font-medium ${trendColor[trend]}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</p>
      </div>
    </motion.div>
  );
}