import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
  
  useEffect(() => {
    // Collect all quiz questions for this level
    const levelItems = [...drugs, ...diseases].filter(i => i.specialty === levelId);
    let allQs = [];
    levelItems.forEach(item => {
      if (item.quiz && item.quiz.length > 0) {
        item.quiz.forEach(q => allQs.push({ ...q, cardId: item.id }));
      }
    });
    // Shuffle and pick up to 10
    allQs = allQs.sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(allQs);
  }, [levelId]);

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xl">لا توجد أسئلة حالياً لهذا المستوى.</p>
        <button onClick={() => navigate(-1)} className="btn-secondary">العودة</button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    
    const correct = option === currentQ.correctAnswer;
    setSelectedAnswer(option);
    setIsCorrect(correct);
    
    // Play sound if possible (optional per prompt)
    // if (correct) playDing(); else playBuzzer();
    
    setResults(prev => [...prev, { q: currentQ, correct }]);
    
    dispatch({
      type: 'ANSWER_CARD',
      payload: { cardId: currentQ.cardId, correct, type: 'quiz' }
    });

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(c => c + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  if (isFinished) {
    const score = results.filter(r => r.correct).length;
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6 w-full pt-10 pb-8">
        <Card className="text-center p-8 flex flex-col items-center">
          <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '💪'}</div>
          <h2 className="text-3xl font-bold font-cairo mb-2">اكتمل الاختبار!</h2>
          <p className="text-text-secondary text-lg mb-6">لقد أجبت بشكل صحيح على {score} من أصل {questions.length} أسئلة.</p>
          
          <div className="w-full flex gap-4">
            <button onClick={() => navigate('/levels')} className="btn-secondary flex-1">الخريطة</button>
            <button onClick={() => navigate(0)} className="btn-primary flex-1">إعادة المحاولة</button>
          </div>
        </Card>
        
        {/* Wrong answers explanation */}
        {results.filter(r => !r.correct).length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-bold font-cairo text-lg">راجِع أخطاءك:</h3>
            {results.filter(r => !r.correct).map((r, i) => (
              <Card key={i} className="p-4 border-l-4 border-l-accent-red">
                <p className="font-bold mb-2">{r.q.question}</p>
                <p className="text-accent-red line-through text-sm mb-1">{r.q.options.find(o => o !== r.q.correctAnswer && o === selectedAnswer)}</p>
                <p className="text-accent-green font-bold text-sm">✅ {r.q.correctAnswer}</p>
                {r.q.explanation && <p className="mt-2 text-sm text-text-secondary bg-white/5 p-2 rounded-lg">{r.q.explanation}</p>}
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen pb-safe">
      <header className="flex items-center justify-between py-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
          <X size={24} />
        </button>
        <div className="flex-1 px-4">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-accent-cyan" 
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex) / questions.length) * 100}%` }} 
            />
          </div>
        </div>
        <div className="font-bold text-sm w-8 text-center">{currentIndex + 1}/{questions.length}</div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex-1 flex flex-col justify-center gap-8 pb-20"
        >
          <h2 className="text-2xl font-bold font-cairo leading-relaxed text-center px-2">
            {currentQ.question}
          </h2>

          <div className="flex flex-col gap-3">
            {currentQ.options?.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = currentQ.correctAnswer === option;
              
              let btnClass = "btn-secondary justify-start text-right px-6 py-4 h-auto min-h-[60px]";
              let animProps = {};

              if (selectedAnswer !== null) {
                if (isSelected && isCorrectOption) {
                  btnClass = "btn-secondary justify-start text-right px-6 py-4 bg-accent-green/20 border-accent-green text-accent-green";
                } else if (isSelected && !isCorrectOption) {
                  btnClass = "btn-secondary justify-start text-right px-6 py-4 bg-accent-red/20 border-accent-red text-accent-red";
                  animProps = {
                    animate: { x: [-10, 10, -10, 10, 0] },
                    transition: { duration: 0.4 }
                  };
                } else if (isCorrectOption) {
                  btnClass = "btn-secondary justify-start text-right px-6 py-4 bg-accent-green/10 border-accent-green/50 text-accent-green";
                } else {
                  btnClass = "btn-secondary justify-start text-right px-6 py-4 opacity-50";
                }
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={btnClass}
                  whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                  {...animProps}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          {selectedAnswer !== null && currentQ.explanation && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl text-sm font-semibold ${isCorrect ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}
            >
              {currentQ.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
