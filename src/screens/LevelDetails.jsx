import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Play, CheckCircle, ChevronLeft } from 'lucide-react';
import { getSpecialtyById, drugs, diseases } from '../content/data';
import { Card } from '../components/ui/Card';
import { useAppContext } from '../contexts/AppContext';

export default function LevelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const specialty = getSpecialtyById(id);
  const { state } = useAppContext();
  
  if (!specialty) return <div className="p-4 text-center mt-20 text-text-muted">Level not found</div>;

  const levelDrugs = drugs.filter(d => d.specialty === id);
  const levelDiseases = diseases.filter(d => d.specialty === id);
  const allItems = [...levelDiseases, ...levelDrugs];

  const totalItems = allItems.length;
  const completedCount = allItems.filter(item => state.completedCards.includes(item.id)).length;
  const progressPercent = totalItems ? Math.round((completedCount / totalItems) * 100) : 0;
  
  // Dynamic gradient based on color
  const gradientStyle = {
    background: `linear-gradient(135deg, ${specialty.color} 0%, rgba(30,41,59,1) 100%)`
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="flex flex-col w-full min-h-screen pb-24 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Dynamic Background Glow */}
      <div 
        className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: specialty.color }}
      />

      {/* Premium Header Segment */}
      <div className="relative pt-6 pb-12 px-6 rounded-b-[40px] shadow-glass mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-80" style={gradientStyle} />
        {/* Inner glass overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        
        <div className="relative z-10 flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-inner">
            <span className="drop-shadow-lg">{specialty.icon}</span>
          </div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold font-cairo text-white mb-1 drop-shadow-md">
            {specialty.nameAr}
          </h1>
          <p className="text-white/70 font-medium tracking-wide uppercase text-sm" dir="ltr">
            {specialty.name}
          </p>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-8 relative z-10">
        
        {/* Progress & Start Quiz */}
        <motion.div variants={itemVariants}>
          <Card elevated hoverable className="p-1 relative overflow-hidden">
            <div className="bg-bg-card/90 rounded-[14px] p-5">
              <div className="flex justify-between items-end mb-3">
                <span className="font-bold text-sm text-text-secondary">الإنجاز الكلي</span>
                <span className="font-extrabold text-xl" style={{ color: specialty.color }}>{progressPercent}%</span>
              </div>
              <div className="w-full h-3 bg-bg-primary rounded-full overflow-hidden shadow-inner mb-6 relative">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%`, backgroundColor: specialty.color, boxShadow: `0 0 10px ${specialty.color}` }}
                />
              </div>

              <Link to={`/quiz/${id}`} className="relative w-full flex items-center justify-center gap-2 py-4 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: specialty.color }} />
                <div className="absolute inset-0 opacity-80" style={{ background: `linear-gradient(90deg, ${specialty.color}, transparent)` }} />
                <Play size={20} className="fill-white text-white relative z-10 group-hover:scale-110 transition-transform" />
                <span className="text-white font-bold text-lg relative z-10 drop-shadow-md">اختبر معلوماتك</span>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Cards List */}
        <div className="flex flex-col gap-4">
          <motion.h3 variants={itemVariants} className="font-extrabold font-cairo text-xl text-white mb-2">
            محتوى التخصص ({totalItems})
          </motion.h3>
          
          {allItems.map(item => {
            const isCompleted = state.completedCards.includes(item.id);
            return (
              <motion.div key={item.id} variants={itemVariants}>
                <Link to={`/card/${item.id}`}>
                  <Card hoverable className="p-4 flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl glass-premium flex items-center justify-center text-3xl shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
                      <span className="drop-shadow-lg relative z-10">{item.icon || '💊'}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold font-cairo text-lg text-white leading-tight">
                          {item.nameAr}
                        </h4>
                        {isCompleted && <CheckCircle size={16} className="text-accent-emerald drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                      </div>
                      <span className="text-text-secondary text-sm font-medium tracking-wide" dir="ltr">{item.name}</span>
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-white/10 transition-all">
                      <ChevronLeft size={18} />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
          
          {totalItems === 0 && (
            <div className="text-center py-12 glass-card rounded-3xl border-dashed">
              <p className="text-text-muted font-medium">جاري إضافة محتوى هذا القسم...</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
