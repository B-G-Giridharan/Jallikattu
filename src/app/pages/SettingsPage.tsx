import { useState } from "react";
import { motion } from "motion/react";
import { Settings, Bell, Shield, Camera, Save, RotateCcw } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

export function SettingsPage() {
  const [alertLevel, setAlertLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [detectionThreshold, setDetectionThreshold] = useState(75);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoRecord, setAutoRecord] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(80);

  const handleSave = () => {
    // Simulate save
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    setAlertLevel('medium');
    setDetectionThreshold(75);
    setEmailNotifications(true);
    setSmsNotifications(false);
    setPushNotifications(true);
    setAutoRecord(true);
    setSoundAlerts(true);
    setConfidenceThreshold(80);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Settings</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Configure alert levels, detection thresholds, and notification preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Alert Configuration</h2>
          </div>

          <div className="space-y-6">
            {/* Alert Level */}
            <div>
              <Label className="text-zinc-900 dark:text-white mb-3 block">Alert Sensitivity Level</Label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setAlertLevel(level)}
                    className={`py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                      alertLevel === level
                        ? level === 'high'
                          ? 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
                          : level === 'medium'
                          ? 'border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                          : 'border-green-500 bg-green-500/10 text-green-600 dark:text-green-400'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                {alertLevel === 'high' && 'Maximum sensitivity - Alert on all potential violations'}
                {alertLevel === 'medium' && 'Balanced sensitivity - Alert on confirmed violations'}
                {alertLevel === 'low' && 'Minimal alerts - Only critical violations'}
              </p>
            </div>

            {/* Detection Threshold */}
            <div>
              <Label className="text-zinc-900 dark:text-white mb-2 block">
                Detection Threshold: {detectionThreshold}%
              </Label>
              <input
                type="range"
                min="50"
                max="100"
                value={detectionThreshold}
                onChange={(e) => setDetectionThreshold(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                <span>Less Sensitive</span>
                <span>More Sensitive</span>
              </div>
            </div>

            {/* Confidence Threshold */}
            <div>
              <Label className="text-zinc-900 dark:text-white mb-2 block">
                AI Confidence Threshold: {confidenceThreshold}%
              </Label>
              <input
                type="range"
                min="60"
                max="95"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Minimum AI confidence required to trigger an alert
              </p>
            </div>
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <Label className="text-zinc-900 dark:text-white font-medium">Email Notifications</Label>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Receive alerts via email
                </p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <Label className="text-zinc-900 dark:text-white font-medium">SMS Notifications</Label>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Receive alerts via text message
                </p>
              </div>
              <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <Label className="text-zinc-900 dark:text-white font-medium">Push Notifications</Label>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Receive browser push notifications
                </p>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <Label className="text-zinc-900 dark:text-white font-medium">Sound Alerts</Label>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Play sound when alert is triggered
                </p>
              </div>
              <Switch checked={soundAlerts} onCheckedChange={setSoundAlerts} />
            </div>
          </div>
        </motion.div>

        {/* Camera Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Camera Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <Label className="text-zinc-900 dark:text-white font-medium">Auto-Record on Alert</Label>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Automatically save footage when alert triggers
                </p>
              </div>
              <Switch checked={autoRecord} onCheckedChange={setAutoRecord} />
            </div>

            <div className="py-3">
              <Label className="text-zinc-900 dark:text-white mb-2 block">Recording Quality</Label>
              <select className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                <option>High (1080p)</option>
                <option>Medium (720p)</option>
                <option>Low (480p)</option>
              </select>
            </div>

            <div className="py-3">
              <Label className="text-zinc-900 dark:text-white mb-2 block">Storage Duration</Label>
              <select className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                <option>7 Days</option>
                <option>14 Days</option>
                <option>30 Days</option>
                <option>90 Days</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* System Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">System Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="py-3 border-b border-zinc-200 dark:border-zinc-800">
              <Label className="text-zinc-900 dark:text-white mb-2 block">Language</Label>
              <select className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
            </div>

            <div className="py-3 border-b border-zinc-200 dark:border-zinc-800">
              <Label className="text-zinc-900 dark:text-white mb-2 block">Timezone</Label>
              <select className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                <option>IST (Indian Standard Time)</option>
                <option>UTC</option>
                <option>GMT</option>
              </select>
            </div>

            <div className="py-3">
              <Label className="text-zinc-900 dark:text-white mb-2 block">Date Format</Label>
              <select className="w-full p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4 justify-end"
      >
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:from-red-600 hover:to-orange-600 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </motion.div>
    </div>
  );
}
