import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Video, Circle } from "lucide-react";

interface LiveFeedProps {
  feedId: number;
  location: string;
  isActive: boolean;
}

export function LiveFeed({ feedId, location, isActive }: LiveFeedProps) {
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRecording((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-zinc-900 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-800 aspect-video">
      {/* Video placeholder with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
        <div className="w-full h-full opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Simulated video content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Video className="w-16 h-16 text-zinc-700" />
      </div>

      {/* Feed info overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Circle 
              className={`w-2 h-2 ${isRecording ? 'fill-red-500 text-red-500' : 'fill-red-500/30 text-red-500/30'} transition-colors`} 
            />
            <span className="text-white text-sm font-medium">Camera {feedId}</span>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            isActive 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30'
          }`}>
            {isActive ? 'ACTIVE' : 'STANDBY'}
          </div>
        </div>
      </div>

      {/* Location label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <p className="text-white text-xs">{location}</p>
        <p className="text-zinc-400 text-xs mt-0.5">
          {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Scanning animation overlay */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
          animate={{ y: ['-100%', '100%'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  );
}