import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Settings, RotateCcw, Check, X, Repeat, Layers } from 'lucide-react';
import { drugs, diseases } from '../content/data';
import { useAppContext } from '../contexts/AppContext';

export default function Flashcards() {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0); // 1 right, -1 left

  useEffect(() => {
    // Basic endless mode: load all flashcards
    const allItems = [...drugs, ...diseases];
    let fCards = [];
    allItems.forEach(item => {
      if (item.flashCards && item.flashCards.length > 0) {
        item.flashCards.forEach(fc => fCards.push({ ...fc, itemId: item.id }));
      }
    });
    fCards = fCards.sort(() => Math.random() - 0.5);
    setCards(fCards);
  }, []);

  const handleNext = (knewIt) => {
    if (cards.length === 0) return;
    const currentCard = cards[currentIndex];
    
    dispatch({
      type: 'ANSWER_CARD',
      payload: { cardId: currentCard.itemId, correct: knewIt, type: 'flashcard' }
    });

    setSwipeDirection(knewIt ? 1 : -1);
    setIsFlipped(false);
    
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
      setSwipeDirection(0);
    }, 300);
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6">
         <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
          <Layers size={40} className="text-text-muted animate-pulse" />
        </div>
        <p className="text-xl font-bold font-cairo text-white">جاري تحميل البطاقات...</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const cardVariants = {
    initial: (direction) => ({
      x: direction === 1 ? 200 : direction === -1 ? -200 : 0,
      opacity: direction !== 0 ? 0 : 1,
      scale: direction !== 0 ? 0.8 : 1,
      rotateY: isFlipped ? 180 : 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: isFlipped ? 180 : 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    },
    exit: (direction) => ({
      x: direction === 1 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    })
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent-indigo/10 blur-[100px] rounded-full pointer-events-none" />

      <header className="flex items-center justify-between py-5 px-4 relative z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
          <ChevronRight size={24} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
           <Layers size={20} className="text-accent-cyan" />
           <h1 className="text-xl font-extrabold font-cairo text-white tracking-wide">مراجعة سريعة</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 opacity-50 cursor-not-allowed">
          <Settings size={20} className="text-white" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative perspective-1000 w-full max-w-sm mx-auto px-4 z-10">
        <AnimatePresence mode="wait" custom={swipeDirection}>
          <motion.div
            key={currentIndex}
            custom={swipeDirection}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-96 cursor-pointer relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of Card */}
            <div 
              className="absolute inset-0 w-full h-full glass-premium flex flex-col items-center justify-center p-8 text-center rounded-3xl"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/10 blur-[30px] rounded-bl-full" />
              <span className="text-xs font-bold text-accent-cyan mb-6 uppercase tracking-widest border border-accent-cyan/30 px-3 py-1 rounded-full bg-accent-cyan/5">سؤال</span>
              <h2 className="text-2xl md:text-3xl font-extrabold font-cairo leading-relaxed text-white drop-shadow-md z-10">{currentCard.q}</h2>
              <div className="absolute bottom-6 flex items-center gap-2 text-text-muted opacity-70">
                 <RotateCcw size={16} />
                 <span className="text-xs font-bold uppercase tracking-wider">انقر للقلب</span>
              </div>
            </div>

            {/* Back of Card */}
            <div 
              className="absolute inset-0 w-full h-full glass-premium flex flex-col items-center justify-center p-8 text-center rounded-3xl border-accent-indigo/30"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(255,255,255,0.02) 100%)' }}
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-indigo/20 blur-[30px] rounded-tr-full" />
              <span className="text-xs font-bold text-accent-indigo mb-6 uppercase tracking-widest border border-accent-indigo/30 px-3 py-1 rounded-full bg-accent-indigo/10">الجواب</span>
              <h2 className="text-xl md:text-2xl font-bold font-cairo leading-relaxed text-white drop-shadow-md z-10">{currentCard.a}</h2>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 px-6 pb-6 relative z-10">
        <button 
          onClick={() => handleNext(false)}
          disabled={!isFlipped}
          className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl glass-card bg-accent-red/10 border-accent-red/20 text-accent-red disabled:opacity-20 disabled:pointer-events-none hover:bg-accent-red/20 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-accent-red/20 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.3)]">
             <Repeat size={24} className="text-accent-red" />
          </div>
          <span className="font-bold text-sm">أحتاج مراجعة</span>
        </button>
        <button 
          onClick={() => handleNext(true)}
          disabled={!isFlipped}
          className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl glass-card bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald disabled:opacity-20 disabled:pointer-events-none hover:bg-accent-emerald/20 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-accent-emerald/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
             <Check size={28} strokeWidth={3} className="text-accent-emerald drop-shadow-md" />
          </div>
          <span className="font-bold text-sm">أعرف هذه</span>
        </button>
      </div>
    </div>
  );
}
