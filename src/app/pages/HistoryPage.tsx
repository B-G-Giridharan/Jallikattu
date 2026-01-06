import { useState } from "react";
import { motion } from "motion/react";
import { History, Filter, Search, Download, AlertTriangle, CheckCircle, Image, Video, Calendar } from "lucide-react";

interface HistoryItem {
  id: string;
  type: 'alert' | 'upload' | 'system';
  status: 'foul_play' | 'safe' | 'pending';
  title: string;
  description: string;
  timestamp: Date;
  camera?: string;
  mediaType?: 'image' | 'video';
  confidence?: number;
}

export function HistoryPage() {
  const [filter, setFilter] = useState<'all' | 'alerts' | 'uploads'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'alert',
      status: 'foul_play',
      title: 'Foul Play Detected',
      description: 'Excessive force detected on bull in Main Arena',
      timestamp: new Date(Date.now() - 1800000),
      camera: 'Camera 3',
      confidence: 94
    },
    {
      id: '2',
      type: 'upload',
      status: 'safe',
      title: 'Media Analysis Complete',
      description: 'Uploaded video analyzed - No violations detected',
      timestamp: new Date(Date.now() - 3600000),
      mediaType: 'video',
      confidence: 87
    },
    {
      id: '3',
      type: 'alert',
      status: 'foul_play',
      title: 'Multiple Participants Detected',
      description: 'Multiple participants engaging with single bull',
      timestamp: new Date(Date.now() - 7200000),
      camera: 'Camera 2',
      confidence: 91
    },
    {
      id: '4',
      type: 'upload',
      status: 'foul_play',
      title: 'Media Analysis Complete',
      description: 'Uploaded image analyzed - Tail twisting behavior identified',
      timestamp: new Date(Date.now() - 10800000),
      mediaType: 'image',
      confidence: 89
    },
    {
      id: '5',
      type: 'alert',
      status: 'safe',
      title: 'Normal Activity',
      description: 'All cameras showing normal activity',
      timestamp: new Date(Date.now() - 14400000),
      camera: 'All Cameras'
    },
    {
      id: '6',
      type: 'system',
      status: 'safe',
      title: 'System Health Check',
      description: 'All systems functioning normally',
      timestamp: new Date(Date.now() - 18000000)
    },
    {
      id: '7',
      type: 'alert',
      status: 'foul_play',
      title: 'Unauthorized Zone Entry',
      description: 'Participant entered restricted zone',
      timestamp: new Date(Date.now() - 21600000),
      camera: 'Camera 4',
      confidence: 96
    },
    {
      id: '8',
      type: 'upload',
      status: 'safe',
      title: 'Media Analysis Complete',
      description: 'Uploaded video analyzed - Fair play standards maintained',
      timestamp: new Date(Date.now() - 25200000),
      mediaType: 'video',
      confidence: 92
    }
  ];

  const filteredItems = historyItems.filter(item => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'alerts' && item.type === 'alert') ||
      (filter === 'uploads' && item.type === 'upload');
    
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">History & Logs</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          View past alerts, uploaded media analysis, and system events
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'all'
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('alerts')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'alerts'
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setFilter('uploads')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'uploads'
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            Uploads
          </button>
        </div>

        {/* Export */}
        <button className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
        >
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Total Events</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">{historyItems.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-red-200 dark:border-red-900/30 p-4"
        >
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Violations Detected</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-500">
            {historyItems.filter(i => i.status === 'foul_play').length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-green-200 dark:border-green-900/30 p-4"
        >
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Safe Events</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-500">
            {historyItems.filter(i => i.status === 'safe').length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-blue-200 dark:border-blue-900/30 p-4"
        >
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">Media Uploads</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">
            {historyItems.filter(i => i.type === 'upload').length}
          </p>
        </motion.div>
      </div>

      {/* History Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
      >
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Event Timeline</h2>
          </div>
        </div>

        <div className="p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500 dark:text-zinc-400">No events found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border ${
                    item.status === 'foul_play'
                      ? 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-900/30'
                      : item.status === 'safe'
                      ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-900/30'
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`mt-1 p-2 rounded-lg ${
                      item.status === 'foul_play'
                        ? 'bg-red-100 dark:bg-red-500/20'
                        : item.status === 'safe'
                        ? 'bg-green-100 dark:bg-green-500/20'
                        : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}>
                      {item.type === 'upload' ? (
                        item.mediaType === 'video' ? (
                          <Video className={`w-5 h-5 ${
                            item.status === 'foul_play'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-green-600 dark:text-green-400'
                          }`} />
                        ) : (
                          <Image className={`w-5 h-5 ${
                            item.status === 'foul_play'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-green-600 dark:text-green-400'
                          }`} />
                        )
                      ) : item.status === 'foul_play' ? (
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-semibold ${
                          item.status === 'foul_play'
                            ? 'text-red-700 dark:text-red-400'
                            : item.status === 'safe'
                            ? 'text-green-700 dark:text-green-400'
                            : 'text-zinc-700 dark:text-zinc-300'
                        }`}>
                          {item.title}
                        </h3>
                        {item.confidence && (
                          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                            {item.confidence}% confidence
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                        {item.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatTimestamp(item.timestamp)}
                        </span>
                        {item.camera && (
                          <>
                            <span>•</span>
                            <span>{item.camera}</span>
                          </>
                        )}
                        <span>•</span>
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
