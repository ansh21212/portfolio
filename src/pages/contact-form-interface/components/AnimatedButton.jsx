import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AnimatedButton = ({ 
  children, 
  onClick, 
  loading = false, 
  disabled = false, 
  variant = 'primary',
  icon,
  iconPosition = 'left',
  className = '',
  type = 'button'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: {
      base: 'bg-blue-600 text-white border-blue-600',
      hover: 'bg-blue-700 border-blue-700',
      disabled: 'bg-blue-600/50 border-blue-600/50 cursor-not-allowed'
    },
    secondary: {
      base: 'bg-slate-700 text-white border-slate-700',
      hover: 'bg-slate-600 border-slate-600',
      disabled: 'bg-slate-700/50 border-slate-700/50 cursor-not-allowed'
    },
    outline: {
      base: 'bg-transparent text-blue-600 border-blue-600',
      hover: 'bg-blue-600 text-white border-blue-600',
      disabled: 'bg-transparent text-blue-600/50 border-blue-600/50 cursor-not-allowed'
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      boxShadow: variant === 'primary' ?'0 0 20px rgba(37, 99, 235, 0.4)' :'0 0 20px rgba(148, 163, 184, 0.2)'
    },
    tap: { scale: 0.98 },
    loading: { scale: 1 }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    loading: { rotate: 360 }
  };

  const getButtonClass = () => {
    const baseClass = 'px-6 py-3 rounded-lg border-2 font-body font-medium transition-all duration-200 ease-out flex items-center justify-center space-x-2 min-h-[48px]';
    
    if (disabled || loading) {
      return `${baseClass} ${variants[variant].disabled}`;
    }
    
    return `${baseClass} ${variants[variant].base} hover:${variants[variant].hover}`;
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      type={type}
      className={`${getButtonClass()} ${className}`}
      variants={buttonVariants}
      initial="initial"
      animate={loading ? 'loading' : 'initial'}
      whileHover={!disabled && !loading ? 'hover' : 'initial'}
      whileTap={!disabled && !loading ? 'tap' : 'initial'}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || loading}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Loading Spinner */}
      {loading && (
        <motion.div
          variants={iconVariants}
          animate="loading"
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Icon name="Loader2" size={18} />
        </motion.div>
      )}

      {/* Left Icon */}
      {!loading && icon && iconPosition === 'left' && (
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name={icon} size={18} />
        </motion.div>
      )}

      {/* Button Text */}
      {!loading && (
        <span className="relative">
          {children}
        </span>
      )}

      {/* Right Icon */}
      {!loading && icon && iconPosition === 'right' && (
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1, x: isHovered ? 2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name={icon} size={18} />
        </motion.div>
      )}

      {/* Glow Effect */}
      {isHovered && !disabled && !loading && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-50 blur-xl"
          style={{
            background: variant === 'primary' ?'linear-gradient(45deg, #2563EB, #3B82F6)' :'linear-gradient(45deg, #475569, #64748B)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedButton;