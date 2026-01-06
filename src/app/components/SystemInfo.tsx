import { motion } from "motion/react";
import { Brain, Camera, Shield, Zap } from "lucide-react";

export function SystemInfo() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-zinc-400 dark:text-zinc-400" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">System Overview</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-zinc-900 dark:text-white font-semibold mb-2">AI-Powered Surveillance System</h4>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            This advanced surveillance system uses artificial intelligence to automatically monitor 
            Jallikattu events in real-time. The AI analyzes video feeds from multiple cameras to detect 
            foul play, rule violations, and ensure participant safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500/20 rounded-lg p-2">
                <Camera className="w-4 h-4 text-blue-400" />
              </div>
              <h5 className="text-white font-medium text-sm">Automated Detection</h5>
            </div>
            <p className="text-zinc-400 text-xs">
              Real-time analysis of all camera feeds using computer vision and deep learning models.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-500/20 rounded-lg p-2">
                <Shield className="w-4 h-4 text-red-400" />
              </div>
              <h5 className="text-white font-medium text-sm">Instant Alerts</h5>
            </div>
            <p className="text-zinc-400 text-xs">
              Automatic alerts when foul play or safety violations are detected by the AI system.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-500/20 rounded-lg p-2">
                <Brain className="w-4 h-4 text-purple-400" />
              </div>
              <h5 className="text-white font-medium text-sm">Smart Analytics</h5>
            </div>
            <p className="text-zinc-400 text-xs">
              Advanced AI algorithms track participants, bulls, and behavior patterns continuously.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-500/20 rounded-lg p-2">
                <Zap className="w-4 h-4 text-green-400" />
              </div>
              <h5 className="text-white font-medium text-sm">24/7 Monitoring</h5>
            </div>
            <p className="text-zinc-400 text-xs">
              Continuous monitoring and logging of all events with complete incident history tracking.
            </p>
          </motion.div>
        </div>

        <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/50">
          <p className="text-zinc-400 text-xs leading-relaxed">
            <span className="text-cyan-400 font-semibold">Note:</span> All detection and alerting 
            is fully automated using AI. The system requires no manual intervention and provides 
            real-time safety monitoring to ensure fair play and participant protection during events.
          </p>
        </div>
      </div>
    </div>
  );
}