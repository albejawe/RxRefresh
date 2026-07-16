import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SPECIALTIES } from '../content/data';
import { ProgressRing } from '../components/ui/ProgressRing';

export default function LevelsMap() {
  return (
    <div className="flex flex-col items-center w-full pb-24 pt-4">
      <h1 className="text-2xl font-bold font-cairo mb-8 self-start px-4">خريطة التخصصات</h1>
      
      <div className="relative w-full max-w-sm mx-auto flex flex-col items-center gap-12">
        {/* Connection Line */}
        <div className="absolute top-10 bottom-10 w-1 bg-white/10 left-1/2 -translate-x-1/2 z-0 rounded-full" />
        
        {SPECIALTIES.map((specialty, index) => {
          // Zigzag pattern
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div 
              key={specialty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative z-10 flex w-full items-center ${isLeft ? 'justify-start' : 'justify-end'} px-8`}
            >
              <Link to={`/level/${specialty.id}`} className="flex flex-col items-center group relative">
                
                <div className="relative">
                  {/* Outer glowing effect */}
                  <div 
                    className="absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{ backgroundColor: specialty.color }}
                  />
                  
                  {/* Main Circle node */}
                  <div 
                    className="w-20 h-20 rounded-full bg-bg-elevated border-4 flex items-center justify-center text-3xl shadow-xl z-10 relative transition-transform group-hover:scale-110"
                    style={{ borderColor: specialty.color }}
                  >
                    {specialty.icon}
                  </div>
                  
                  {/* Progress Ring overlaid (dummy progress 0 for now) */}
                  <div className="absolute -inset-1 pointer-events-none z-20">
                    <ProgressRing percentage={0} size={88} strokeWidth={4} color={specialty.color} trackColor="transparent" />
                  </div>
                </div>
                
                {/* Title badge */}
                <div className={`absolute top-full mt-2 w-max max-w-[140px] text-center bg-bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10 shadow-lg text-sm font-semibold transition-transform group-hover:scale-105 z-30
                  ${isLeft ? 'left-0 origin-top-left' : 'right-0 origin-top-right'}`}>
                  {specialty.nameAr}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
