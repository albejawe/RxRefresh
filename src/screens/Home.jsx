import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, ChevronLeft, Play, Award, Zap, BookOpen, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressRing } from '../components/ui/ProgressRing';

export default function Home() {
  const { state } = useAppContext();
  const { streak, totalPoints, longestStreak } = state.userStats;

  const [showPermissionBanner, setShowPermissionBanner] = useState(false);

  useEffect(() => {
    // Check if permission is not yet granted/denied, or if user is on iOS Safari
    if ('Notification' in window) {
      setShowPermissionBanner(Notification.permission === 'default');
    }
  }, []);

  const handleRequestPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setShowPermissionBanner(false);
        if (permission === 'granted') {
          // Show a welcome notification
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('RxRefresh', {
              body: '🎉 تم تفعيل الإشعارات بنجاح! ستصلك التنبيهات يومياً.',
              icon: '/pwa-192x192.png'
            });
          }).catch(() => {
            new Notification('RxRefresh', {
              body: '🎉 تم تفعيل الإشعارات بنجاح! ستصلك التنبيهات يومياً.',
              icon: '/pwa-192x192.png'
            });
          });
        }
      });
    }
  };

  // Stagger animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="flex flex-col gap-8 w-full pb-20 relative"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-accent-indigo/20 blur-[80px] pointer-events-none" />
      <div className="fixed top-[40%] right-[-10%] w-[40vh] h-[40vh] rounded-full bg-accent-purple/20 blur-[80px] pointer-events-none" />
      
      {/* Header section */}
      <motion.header variants={itemVariants} className="flex justify-between items-center py-2 relative z-10">
        <div>
          <h1 className="text-3xl font-extrabold font-cairo text-white tracking-tight flex items-center gap-2">
            مرحباً بك! <span className="text-accent-cyan inline-block animate-float">✨</span>
          </h1>
          <p className="text-text-secondary mt-1 font-medium text-sm">مستعد لرحلة اليوم العلمية?</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 glass-premium px-4 py-2 rounded-2xl relative overflow-hidden group cursor-default">
            {/* Inner shimmer on hover */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
            <Flame size={18} className={streak > 0 ? 'text-accent-amber drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'text-text-muted'} />
            <span className="font-bold text-sm text-white">{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 glass-premium px-4 py-2 rounded-2xl relative overflow-hidden group cursor-default">
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
            <Star size={18} className="text-accent-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            <span className="font-bold text-sm text-white">{totalPoints}</span>
          </div>
        </div>
      </motion.header>

      {/* Notification Permission Banner */}
      {showPermissionBanner && (
        <motion.div variants={itemVariants} className="relative z-20">
          <Card className="border border-accent-cyan/30 p-5 relative overflow-hidden bg-gradient-to-r from-accent-cyan/10 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center shrink-0">
                <Bell className="text-accent-cyan animate-pulse" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-white text-base font-cairo mb-1">تفعيل التنبيهات اليومية</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  احصل على التذكيرات والدروس والأسئلة مباشرة على شاشتك لتضمن مراجعة مستمرة.
                </p>
                <button 
                  onClick={handleRequestPermission}
                  className="px-4 py-2 bg-accent-cyan text-bg-primary rounded-xl font-bold text-xs hover:bg-opacity-80 transition-colors shadow-glow-cyan"
                >
                  تفعيل الآن
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Daily Lesson Card */}
      <motion.div variants={itemVariants}>
        <Card elevated hoverable className="relative overflow-hidden group border-0 p-[1px]">
          {/* Animated gradient border wrapper */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo via-accent-purple to-accent-cyan opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative h-full bg-bg-card/90 backdrop-blur-2xl rounded-[15px] z-10 overflow-hidden">
            {/* Inner decorative light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-indigo/30 blur-[40px] rounded-full mix-blend-screen" />
            
            <CardContent className="relative z-10 flex flex-col items-start p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-indigo to-accent-purple flex items-center justify-center mb-6 shadow-glow-indigo">
                <BookOpen size={24} className="text-white" />
              </div>
              
              <h2 className="text-3xl font-extrabold font-cairo mb-2 text-white">درس اليوم</h2>
              <p className="text-text-secondary mb-8 text-sm font-medium leading-relaxed max-w-[80%]">
                استرجع أهم المعلومات الطبية واصقل مهاراتك الدوائية بأسلوب تفاعلي سريع.
              </p>
              
              <Link to="/flashcards" className="btn-primary w-full flex items-center justify-center gap-3">
                <span className="text-lg">ابدأ المراجعة</span>
                <Play size={20} className="fill-current" />
              </Link>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats / Motivation */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-5">
        <Card hoverable className="p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute -inset-2 bg-gradient-to-tr from-accent-emerald/0 via-accent-emerald/5 to-accent-emerald/0 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
          
          <ProgressRing 
            percentage={state.completedCards.length > 0 ? Math.min(state.completedCards.length, 100) : 0} 
            size={90} 
            strokeWidth={8} 
            color="#10B981"
          >
            <div className="flex flex-col items-center">
              <span className="font-extrabold text-2xl text-white">{state.completedCards.length}</span>
            </div>
          </ProgressRing>
          <div className="mt-4 flex items-center gap-1.5 text-text-secondary">
            <Award size={16} className="text-accent-emerald" />
            <span className="text-sm font-bold">بطاقة منجزة</span>
          </div>
        </Card>
        
        <Card hoverable className="p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-20 h-20 rounded-full bg-bg-elevated border border-white/5 shadow-inner flex items-center justify-center mb-2 relative">
             <div className="absolute inset-0 rounded-full bg-accent-amber/10 blur-md animate-pulse-slow" />
             <Zap size={32} className="text-accent-amber drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] relative z-10" />
          </div>
          <h3 className="font-extrabold text-3xl text-white mt-2">{longestStreak}</h3>
          <span className="text-sm text-text-secondary font-bold mt-1">أطول سلسلة أيام</span>
        </Card>
      </motion.div>
      
      {/* Continue Journey */}
      <motion.div variants={itemVariants} className="flex items-center justify-between mt-2 px-2">
        <h3 className="font-extrabold font-cairo text-xl text-white">خريطتك العلمية</h3>
        <Link to="/levels" className="glass-premium px-4 py-2 rounded-xl text-accent-cyan text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-colors">
          عرض الرحلة <ChevronLeft size={16} />
        </Link>
      </motion.div>
      
    </motion.div>
  );
}
