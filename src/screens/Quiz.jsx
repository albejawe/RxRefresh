import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, ThumbsUp, Zap, CheckCircle, XCircle } from 'lucide-react';
import { getSpecialtyById, drugs, diseases } from '../content/data';
import { Card, CardContent } from '../components/ui/Card';
import { useAppContext } from '../contexts/AppContext';

export default function Quiz() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [results, setResults] = useState([]);
  
  const specialty = getSpecialtyById(levelId);

  useEffect(() => {
    const levelItems = [...drugs, ...diseases].filter(i => i.specialty === levelId);
    let allQs = [];
    levelItems.forEach(item => {
      if (item.quiz && item.quiz.length > 0) {
        item.quiz.forEach(q => allQs.push({ ...q, cardId: item.id }));
      }
    });
    allQs = allQs.sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(allQs);
  }, [levelId]);

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
          <Zap size={40} className="text-text-muted" />
        </div>
        <p className="text-xl font-bold text-center text-text-secondary">لا توجد أسئلة حالياً لهذا التخصص.</p>
        <button onClick={() => navigate(-1)} className="btn-secondary w-full max-w-[200px]">العودة</button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return; 
    
    const correct = option === currentQ.correctAnswer;
    setSelectedAnswer(option);
    setIsCorrect(correct);
    
    setResults(prev => [...prev, { q: currentQ, correct }]);
    
    dispatch({
      type: 'ANSWER_CARD',
      payload: { cardId: currentQ.cardId, correct, type: 'quiz' }
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const score = results.filter(r => r.correct).length;
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 w-full pt-6 pb-20 px-4 min-h-screen relative overflow-hidden">
        {/* Confetti or Glow based on score */}
        <div 
          className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: percentage >= 80 ? '#10B98130' : (percentage >= 50 ? '#F59E0B30' : '#F43F5E30') }}
        />

        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', damping: 20 }}>
          <Card elevated className="text-center p-8 flex flex-col items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5" />
            
            <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 shadow-glow-indigo relative z-10
              ${percentage >= 80 ? 'bg-gradient-to-br from-accent-emerald to-accent-cyan' : percentage >= 50 ? 'bg-gradient-to-br from-accent-amber to-orange-500' : 'bg-gradient-to-br from-accent-red to-pink-600'}`}>
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-slow" />
              {percentage >= 80 ? <Trophy size={48} className="text-white drop-shadow-md relative z-10" /> : 
               percentage >= 50 ? <ThumbsUp size={48} className="text-white drop-shadow-md relative z-10" /> : 
               <Zap size={48} className="text-white drop-shadow-md relative z-10" />}
            </div>
            
            <h2 className="text-4xl font-extrabold font-cairo mb-2 text-white relative z-10">اكتمل الاختبار!</h2>
            <p className="text-white/80 text-lg mb-8 font-medium relative z-10">
              لقد أجبت بشكل صحيح على <span className="font-bold text-white text-xl">{score}</span> من أصل <span className="font-bold text-white text-xl">{questions.length}</span> أسئلة.
            </p>
            
            <div className="w-full flex gap-4 relative z-10">
              <button onClick={() => navigate('/levels')} className="btn-secondary flex-1 py-4 text-base">الخريطة</button>
              <button onClick={() => navigate(0)} className="btn-primary flex-1 py-4 text-base">إعادة المحاولة</button>
            </div>
          </Card>
        </motion.div>
        
        {/* Wrong answers explanation */}
        {results.filter(r => !r.correct).length > 0 && (
          <div className="flex flex-col gap-4 mt-4 relative z-10">
            <h3 className="font-extrabold font-cairo text-2xl text-white">المراجعة العلمية</h3>
            {results.filter(r => !r.correct).map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="p-5 border-0 bg-bg-elevated/40 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-accent-red" />
                  <p className="font-extrabold text-white text-lg mb-4">{r.q.question}</p>
                  
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-start gap-2 text-accent-red opacity-80">
                      <XCircle size={18} className="shrink-0 mt-0.5" />
                      <p className="line-through text-sm font-medium">{r.q.options.find(o => o !== r.q.correctAnswer && o === selectedAnswer)}</p>
                    </div>
                    <div className="flex items-start gap-2 text-accent-emerald">
                      <CheckCircle size={18} className="shrink-0 mt-0.5" />
                      <p className="font-bold text-base drop-shadow-sm">{r.q.correctAnswer}</p>
                    </div>
                  </div>
                  
                  {r.q.explanation && (
                    <div className="mt-4 text-sm font-semibold text-white/90 bg-white/5 border border-white/10 p-3 rounded-xl leading-relaxed">
                      💡 {r.q.explanation}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen pb-safe relative overflow-hidden">
      {/* Dynamic Specialty Background */}
      <div 
        className="absolute top-[-20%] right-[-20%] w-[60vh] h-[60vh] rounded-full blur-[100px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: specialty?.color || '#6366F1' }}
      />

      <header className="flex items-center justify-between py-5 px-2 relative z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full border border-transparent hover:border-white/10 transition-colors">
          <X size={24} className="text-white" />
        </button>
        <div className="flex-1 px-6">
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner relative">
            <motion.div 
              className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-accent-cyan to-accent-indigo shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex) / questions.length) * 100}%` }} 
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            />
          </div>
        </div>
        <div className="font-extrabold text-sm text-white w-10 text-center tracking-widest">{currentIndex + 1}<span className="opacity-50">/</span>{questions.length}</div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex-1 flex flex-col justify-center gap-10 px-4 pb-20 relative z-10"
        >
          <div className="glass-premium p-6 rounded-[24px] text-center shadow-glass relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-indigo to-accent-purple flex items-center justify-center shadow-glow-indigo border border-white/20">
              <Zap size={24} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-cairo leading-relaxed text-white mt-4 drop-shadow-md">
              {currentQ.question}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {currentQ.options?.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = currentQ.correctAnswer === option;
              
              let btnClass = "glass-card text-right px-6 py-5 h-auto min-h-[60px] relative overflow-hidden transition-all duration-300 border hover:bg-white/10";
              let textClass = "font-bold text-lg text-white/90 relative z-10";
              let animProps = { whileTap: { scale: selectedAnswer === null ? 0.96 : 1 } };

              if (selectedAnswer !== null) {
                if (isSelected && isCorrectOption) {
                  btnClass = "glass-card text-right px-6 py-5 bg-accent-emerald/20 border-accent-emerald shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                  textClass = "font-bold text-lg text-accent-emerald drop-shadow-md relative z-10";
                } else if (isSelected && !isCorrectOption) {
                  btnClass = "glass-card text-right px-6 py-5 bg-accent-red/20 border-accent-red shadow-[0_0_20px_rgba(244,63,94,0.3)]";
                  textClass = "font-bold text-lg text-accent-red relative z-10";
                  animProps = {
                    animate: { x: [-10, 10, -10, 10, 0] },
                    transition: { duration: 0.4 }
                  };
                } else if (isCorrectOption) {
                  btnClass = "glass-card text-right px-6 py-5 border-accent-emerald/50 bg-white/5";
                  textClass = "font-bold text-lg text-accent-emerald relative z-10";
                } else {
                  btnClass = "glass-card text-right px-6 py-5 opacity-40 border-white/5";
                }
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={btnClass}
                  {...animProps}
                >
                  <span className={textClass}>{option}</span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedAnswer !== null && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: 20 }} 
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden flex flex-col gap-4 mt-2"
              >
                {currentQ.explanation && (
                  <div className={`p-5 rounded-2xl text-sm md:text-base font-bold shadow-glass border relative ${isCorrect ? 'bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald' : 'bg-accent-red/10 border-accent-red/30 text-accent-red'}`}>
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: isCorrect ? '#10B981' : '#F43F5E' }} />
                    {currentQ.explanation}
                  </div>
                )}
                
                <button 
                  onClick={handleNextQuestion}
                  className="btn-primary w-full py-4 text-base font-bold tracking-wide flex items-center justify-center gap-2"
                >
                  <span>{currentIndex === questions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'}</span>
                  <span className="rotate-180">➔</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
