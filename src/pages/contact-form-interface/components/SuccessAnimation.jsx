import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SuccessAnimation = ({ isVisible, onComplete }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 0.8, ease: 'easeInOut' },
        opacity: { duration: 0.3 }
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut',
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: { 
      scale: [1, 1.2, 1], 
      opacity: [0.6, 0.2, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            />

            {/* Success Icon */}
            <motion.div
              className="relative w-20 h-20 mx-auto mb-6"
              variants={circleVariants}
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-green-500/20"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
              
              {/* Inner Circle */}
              <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    variants={checkVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-heading font-bold text-slate-50">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-400 font-body leading-relaxed">
                Thank you for reaching out! I'll get back to you within 24 hours.
              </p>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}

            {/* Progress Indicator */}
            <motion.div
              className="mt-6 flex justify-center space-x-2"
              variants={itemVariants}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;