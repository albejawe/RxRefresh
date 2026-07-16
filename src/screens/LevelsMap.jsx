import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Lock, MapPin } from 'lucide-react';
import { SPECIALTIES } from '../content/data';
import { useAppContext } from '../contexts/AppContext';

export default function LevelsMap() {
  const { state } = useAppContext();
  // For demo purposes, let's assume the first 3 are completed, 4th is active, rest are locked.
  // In a real app, this would be computed from user progress.
  const activeLevelIndex = 3; 

  return (
    <div className="flex flex-col items-center w-full pb-24 relative overflow-hidden min-h-screen">
      {/* Background ambient light */}
      <div className="fixed top-[20%] left-[-20%] w-[70vh] h-[70vh] bg-accent-indigo/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-accent-cyan/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full px-6 py-6 mb-4 relative z-10"
      >
        <h1 className="text-3xl font-extrabold font-cairo text-white text-center text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-indigo">
          الرحلة العلمية
        </h1>
        <p className="text-center text-text-secondary mt-2 text-sm font-medium">
          أكمل التخصصات لتفتح تحديات جديدة
        </p>
      </motion.div>
      
      <div className="relative w-full max-w-md mx-auto flex flex-col items-center pb-20">
        
        {SPECIALTIES.map((specialty, index) => {
          const isLeft = index % 2 === 0;
          const isCompleted = index < activeLevelIndex;
          const isActive = index === activeLevelIndex;
          const isLocked = index > activeLevelIndex;
          
          const hasNext = index < SPECIALTIES.length - 1;
          
          // Define node status colors
          let nodeColor = specialty.color;
          if (isLocked) nodeColor = '#475569'; // Slate 600
          
          return (
            <div key={specialty.id} className="relative w-full h-[140px] flex items-center justify-center">
              
              {/* SVG Connecting Path to NEXT node */}
              {hasNext && (
                <div className="absolute top-[50%] left-0 w-full h-[140px] pointer-events-none z-0 opacity-50">
                  <svg 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-full overflow-visible"
                  >
                    <motion.path
                      d={isLeft 
                        ? "M 25 0 C 25 60, 75 40, 75 100" 
                        : "M 75 0 C 75 60, 25 40, 25 100"}
                      fill="none"
                      stroke={isCompleted ? '#10B981' : 'rgba(255,255,255,0.1)'}
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray="8 8"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      className={isActive ? 'animate-pulse-slow' : ''}
                    />
                  </svg>
                </div>
              )}

              {/* Node Item */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                className={`absolute z-10 w-full flex items-center px-12 ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                <Link 
                  to={isLocked ? '#' : `/level/${specialty.id}`} 
                  className={`relative group flex flex-col items-center ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  
                  <div className="relative">
                    {/* Ambient Glow */}
                    {!isLocked && (
                      <div 
                        className={`absolute -inset-4 rounded-full blur-xl transition-opacity duration-500
                          ${isActive ? 'opacity-60 animate-pulse-slow' : 'opacity-20 group-hover:opacity-40'}`}
                        style={{ backgroundColor: nodeColor }}
                      />
                    )}
                    
                    {/* The Node Circle */}
                    <div 
                      className={`w-20 h-20 rounded-[24px] rotate-3 flex items-center justify-center text-3xl shadow-glass relative z-10 transition-all duration-300 transform
                        ${isActive ? 'scale-110 -rotate-3 ring-4 ring-white/30' : 'group-hover:scale-105 group-hover:-rotate-3'}
                        ${isLocked ? 'bg-bg-elevated/40 backdrop-blur-md border border-white/5 grayscale' : 'glass-premium border border-white/20'}`}
                      style={!isLocked ? { background: `linear-gradient(135deg, ${nodeColor}40 0%, rgba(255,255,255,0.05) 100%)` } : {}}
                    >
                      {/* Inner Icon */}
                      <span className={isLocked ? 'opacity-30' : 'drop-shadow-lg'}>
                        {specialty.icon}
                      </span>

                      {/* Status Badges */}
                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-emerald border-2 border-bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)] z-20">
                          <Check size={16} className="text-white font-bold" />
                        </div>
                      )}
                      {isActive && (
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-accent-amber border-2 border-bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.5)] z-20 animate-bounce">
                          <MapPin size={16} className="text-white font-bold" />
                        </div>
                      )}
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-bg-primary/40 backdrop-blur-sm z-20">
                          <Lock size={24} className="text-text-muted" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Title badge */}
                  <div className={`absolute top-full mt-4 w-max max-w-[150px] text-center px-4 py-1.5 rounded-xl text-sm font-bold shadow-glass-sm z-30 transition-all duration-300
                    ${isLeft ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2'}
                    ${isLocked ? 'bg-bg-card/50 text-text-muted border border-white/5' : 'glass-premium text-white border-t border-white/20'}`}>
                    {specialty.nameAr}
                  </div>
                </Link>
              </motion.div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
