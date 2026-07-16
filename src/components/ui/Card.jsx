import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Card = forwardRef(({ className, children, elevated, hoverable, ...props }, ref) => {
  const CardComponent = hoverable ? motion.div : 'div';
  const hoverProps = hoverable ? {
    whileHover: { y: -4, scale: 1.01 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  } : {};

  return (
    <CardComponent
      ref={ref}
      className={cn(
        elevated ? 'glass-elevated' : 'glass-card',
        hoverable && 'cursor-pointer hover:border-white/20 hover:shadow-2xl transition-all',
        className
      )}
      {...hoverProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = 'Card';

const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('p-6 pb-4 border-b border-white/5', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn('text-xl font-bold font-cairo', className)} {...props}>
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={cn('p-6', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }) => (
  <div className={cn('p-6 pt-4 border-t border-white/5 flex items-center', className)} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
