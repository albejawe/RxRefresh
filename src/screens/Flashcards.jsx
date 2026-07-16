import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Settings } from 'lucide-react';
import { drugs, diseases } from '../content/data';
import { useAppContext } from '../contexts/AppContext';

export default function Flashcards() {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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

    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, 150);
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <p className="text-xl">جاري تحميل الفلاش كاردز...</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full">
      <header className="flex items-center justify-between py-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold font-cairo">مراجعة سريعة</h1>
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 opacity-50 cursor-not-allowed">
          <Settings size={20} />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative perspective-1000 w-full max-w-sm mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-back' : '-front')}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className={`w-full h-full glass-elevated flex flex-col items-center justify-center p-8 text-center ${isFlipped ? 'bg-accent-indigo/10 border-accent-indigo/20' : ''}`}>
              {!isFlipped ? (
                <>
                  <span className="text-sm text-text-muted mb-4 uppercase tracking-wider">سؤال</span>
                  <h2 className="text-2xl font-bold font-cairo leading-relaxed">{currentCard.q}</h2>
                  <p className="absolute bottom-6 text-sm text-text-muted">انقر للقلب 🔄</p>
                </>
              ) : (
                <>
                  <span className="text-sm text-accent-cyan mb-4 uppercase tracking-wider">الجواب</span>
                  <h2 className="text-xl font-bold font-cairo leading-relaxed">{currentCard.a}</h2>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => handleNext(false)}
          disabled={!isFlipped}
          className="flex-1 btn-secondary bg-accent-red/10 border-accent-red/20 text-accent-red disabled:opacity-30 disabled:pointer-events-none"
        >
          أحتاج مراجعة 🔁
        </button>
        <button 
          onClick={() => handleNext(true)}
          disabled={!isFlipped}
          className="flex-1 btn-secondary bg-accent-green/10 border-accent-green/20 text-accent-green disabled:opacity-30 disabled:pointer-events-none"
        >
          أعرف هذه ✅
        </button>
      </div>
    </div>
  );
}
