import { motion } from 'framer-motion';

export function ProgressRing({ 
  percentage = 0, 
  size = 120, 
  strokeWidth = 10, 
  color = '#06B6D4',
  trackColor = 'rgba(255,255,255,0.05)',
  children
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer ambient glow */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-20"
        style={{ backgroundColor: color, transform: 'scale(0.85)' }}
      />
      <svg
        className="transform -rotate-90 relative z-10"
        width={size}
        height={size}
        style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
      >
        {/* Track */}
        <circle
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress */}
        <motion.circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {children}
        </div>
      )}
    </div>
  );
}
