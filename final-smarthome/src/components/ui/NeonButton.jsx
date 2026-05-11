import { motion } from 'framer-motion';
import { useSpark } from '../../context/SparkContext';

export default function NeonButton({ variant = 'filled', spark = false, onClick, children, size = 'md', className = '', type = 'button' }) {
  const { triggerSpark } = useSpark();

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `font-semibold rounded-full transition-all duration-300 ${sizeClasses[size]} ${className}`;
  
  const variantClasses = variant === 'filled'
    ? 'bg-accent text-bg hover:shadow-[0_0_24px_rgba(0,200,255,0.5)]'
    : 'border border-accent text-accent hover:bg-accent/10 hover:shadow-[0_0_16px_rgba(0,200,255,0.3)]';

  const handleClick = (e) => {
    if (spark && triggerSpark) {
      triggerSpark(e.clientX, e.clientY);
    }
    onClick?.(e);
  };

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses}`}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
