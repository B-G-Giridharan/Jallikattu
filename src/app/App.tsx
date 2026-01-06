import { useState } from "react";
import { motion } from "motion/react";
import { Activity, LayoutDashboard, History, Settings, HelpCircle, Sun, Moon } from "lucide-react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { NotificationPanel } from "./components/NotificationPanel";
import { DashboardPage } from "./pages/DashboardPage";
import { HistoryPage } from "./pages/HistoryPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SupportPage } from "./pages/SupportPage";

type Page = 'dashboard' | 'history' | 'settings' | 'support';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { id: 'dashboard' as Page, name: 'Dashboard', icon: LayoutDashboard },
    { id: 'history' as Page, name: 'History & Logs', icon: History },
    { id: 'settings' as Page, name: 'Settings', icon: Settings },
    { id: 'support' as Page, name: 'Support', icon: HelpCircle }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      case 'support':
        return <SupportPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 backdrop-blur-lg bg-white/95 dark:bg-zinc-900/95 transition-colors">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-lg p-2">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Jallikattu</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">AI Surveillance & Safety System</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* System Status */}
              <div className="hidden md:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">System Active</span>
              </div>

              {/* Notifications */}
              <NotificationPanel />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Date/Time */}
              <div className="hidden lg:block text-right">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Live Monitoring</p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex gap-2 overflow-x-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg -z-10"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-6">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-12 transition-colors">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              © 2026 Jallikattu AI Surveillance System. Powered by Artificial Intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">Real-time Monitoring</span>
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">AI Detection</span>
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">24/7 Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
