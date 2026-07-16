import { motion } from 'framer-motion';
import { Flame, Star, ChevronLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressRing } from '../components/ui/ProgressRing';

export default function Home() {
  const { state } = useAppContext();
  const { streak, totalPoints } = state.userStats;

  return (
    <div className="flex flex-col gap-6 w-full pb-20">
      {/* Header section */}
      <header className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-2xl font-bold font-cairo">مرحباً بك! 👋</h1>
          <p className="text-text-secondary text-sm">مستعد لرحلة اليوم؟</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Flame size={16} className={streak > 0 ? 'text-accent-amber' : 'text-text-muted'} />
            <span className="font-bold text-sm">{streak}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Star size={16} className="text-accent-amber" />
            <span className="font-bold text-sm">{totalPoints}</span>
          </div>
        </div>
      </header>

      {/* Daily Lesson Card */}
      <Card elevated hoverable className="relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 to-accent-purple/20 opacity-50 transition-opacity group-hover:opacity-100" />
        <CardContent className="relative z-10 flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-accent-indigo/20 flex items-center justify-center mb-4 text-3xl">
            📚
          </div>
          <h2 className="text-2xl font-bold font-cairo mb-2">درس اليوم</h2>
          <p className="text-text-secondary mb-6 text-sm max-w-[250px]">
            حان الوقت لاسترجاع بعض المعلومات الهامة وتحدي ذاكرتك.
          </p>
          
          <Link to="/flashcards" className="btn-primary w-full flex items-center justify-center gap-2">
            <span>ابدأ المراجعة</span>
            <Play size={18} className="fill-current" />
          </Link>
        </CardContent>
      </Card>

      {/* Quick Stats / Motivation */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <ProgressRing percentage={state.completedCards.length > 0 ? 5 : 0} size={80} strokeWidth={6} color="#10B981">
            <span className="font-bold text-lg">{state.completedCards.length}</span>
          </ProgressRing>
          <span className="mt-2 text-sm text-text-secondary font-semibold">بطاقة منجزة</span>
        </Card>
        
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-2">🔥</div>
          <h3 className="font-bold text-xl">{state.userStats.longestStreak}</h3>
          <span className="text-sm text-text-secondary font-semibold">أطول سلسلة</span>
        </Card>
      </div>
      
      {/* Continue Journey */}
      <div className="flex items-center justify-between mt-4">
        <h3 className="font-bold font-cairo text-lg">أكمل رحلتك</h3>
        <Link to="/levels" className="text-accent-cyan text-sm flex items-center hover:underline">
          عرض الخريطة <ChevronLeft size={16} />
        </Link>
      </div>
    </div>
  );
}
