import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './contexts/AppContext';
import { ToastProvider } from './contexts/ToastContext';
import { Home, Home as IconHome, Map, Settings as IconSettings, BarChart2 } from 'lucide-react';

// Screens (to be implemented)
import HomeScreen from './screens/Home';
import LevelsMapScreen from './screens/LevelsMap';
import LevelDetailsScreen from './screens/LevelDetails';
import CardDetailsScreen from './screens/CardDetails';
import QuizScreen from './screens/Quiz';
import FlashcardsScreen from './screens/Flashcards';
import StatsScreen from './screens/Stats';
import SettingsScreen from './screens/Settings';
import { useNotifications } from './hooks/useNotifications';

const NotificationManager = () => {
  useNotifications();
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomeScreen /></PageWrapper>} />
        <Route path="/levels" element={<PageWrapper><LevelsMapScreen /></PageWrapper>} />
        <Route path="/level/:id" element={<PageWrapper><LevelDetailsScreen /></PageWrapper>} />
        <Route path="/card/:id" element={<PageWrapper><CardDetailsScreen /></PageWrapper>} />
        <Route path="/quiz/:levelId" element={<PageWrapper><QuizScreen /></PageWrapper>} />
        <Route path="/flashcards" element={<PageWrapper><FlashcardsScreen /></PageWrapper>} />
        <Route path="/stats" element={<PageWrapper><StatsScreen /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><SettingsScreen /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="pb-24 pt-4 px-4 max-w-lg mx-auto min-h-screen"
  >
    {children}
  </motion.div>
);

const BottomNavigation = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: IconHome, label: 'الرئيسية' },
    { path: '/levels', icon: Map, label: 'الرحلة' },
    { path: '/stats', icon: BarChart2, label: 'إحصائيات' },
    { path: '/settings', icon: IconSettings, label: 'إعدادات' },
  ];

  // Hide nav on quiz and card details to maximize focus
  if (location.pathname.startsWith('/quiz') || location.pathname.startsWith('/card')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-card/90 backdrop-blur-lg border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} className="relative flex flex-col items-center justify-center w-full h-full">
              <Icon
                size={24}
                className={`transition-colors duration-200 ${isActive ? 'text-accent-cyan' : 'text-text-muted hover:text-text-secondary'}`}
              />
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'text-accent-cyan' : 'text-text-muted'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 w-8 h-1 bg-accent-cyan rounded-b-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-cyan selection:text-bg-primary overflow-x-hidden">
            <NotificationManager />
            <AnimatedRoutes />
            <BottomNavigation />
          </div>
        </Router>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
