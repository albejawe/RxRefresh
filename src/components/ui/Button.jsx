import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default',
  isLoading,
  children,
  ...props 
}, ref) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-white/10 bg-transparent hover:bg-white/5 text-text-primary',
    ghost: 'bg-transparent hover:bg-white/10 text-text-secondary hover:text-white',
    danger: 'bg-accent-red/20 text-accent-red border border-accent-red/50 hover:bg-accent-red hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    default: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    icon: 'p-3 rounded-xl',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export { Button };
