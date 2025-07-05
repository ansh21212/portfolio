import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AnimatedInput = ({ 
  type = 'text', 
  name, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  required = false,
  placeholder,
  rows = 4,
  className = '',
  icon
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setHasValue(value && value.length > 0);
  }, [value]);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  const inputVariants = {
    initial: { scale: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
    focused: { 
      scale: 1.02, 
      borderColor: '#2563EB',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
    },
    error: { 
      borderColor: '#EF4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
    }
  };

  const labelVariants = {
    initial: { 
      y: type === 'textarea' ? 12 : 0, 
      x: 12, 
      scale: 1, 
      color: '#94A3B8' 
    },
    focused: { 
      y: -24, 
      x: 0, 
      scale: 0.85, 
      color: '#2563EB' 
    },
    filled: { 
      y: -24, 
      x: 0, 
      scale: 0.85, 
      color: '#94A3B8' 
    }
  };

  const iconVariants = {
    initial: { scale: 1, color: '#94A3B8' },
    focused: { scale: 1.1, color: '#2563EB' },
    error: { scale: 1.1, color: '#EF4444' }
  };

  const getAnimationState = () => {
    if (error) return 'error';
    if (isFocused) return 'focused';
    return 'initial';
  };

  const getLabelState = () => {
    if (isFocused || hasValue) return isFocused ? 'focused' : 'filled';
    return 'initial';
  };

  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative"
        variants={inputVariants}
        animate={getAnimationState()}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Icon */}
        {icon && (
          <motion.div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
            variants={iconVariants}
            animate={getAnimationState()}
            transition={{ duration: 0.2 }}
          >
            <Icon name={icon} size={18} />
          </motion.div>
        )}

        {/* Input/Textarea */}
        <InputComponent
          ref={inputRef}
          type={type !== 'textarea' ? type : undefined}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? placeholder : ''}
          required={required}
          rows={type === 'textarea' ? rows : undefined}
          className={`
            w-full px-4 py-3 bg-slate-800/50 border-2 border-white/10 rounded-lg
            text-slate-50 placeholder-slate-400 font-body
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-0
            ${icon ? 'pl-12' : 'pl-4'}
            ${type === 'textarea' ? 'resize-none min-h-[120px]' : 'h-12'}
            ${error ? 'border-red-500' : ''}
          `}
        />

        {/* Floating Label */}
        <motion.label
          htmlFor={name}
          className="absolute left-0 pointer-events-none font-body font-medium origin-left"
          variants={labelVariants}
          animate={getLabelState()}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </motion.label>

        {/* Focus Ring Animation */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-blue-600 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="flex items-center space-x-2 mt-2"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="AlertCircle" size={14} className="text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm font-body">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedInput;