import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Zap, Brain } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Initializing AI Systems...');

  const loadingTexts = [
    'Initializing AI Systems...',
    'Loading Neural Networks...',
    'Connecting to Backend...',
    'Optimizing Performance...',
    'Rendering Components...',
    'Almost Ready...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setCurrentText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [loadingTexts]);

  const icons = [Code, Cpu, Zap, Brain];

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-50" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Icon Animation */}
        <motion.div
          className="mb-8"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        >
          <div className="relative">
            {icons.map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  delay: index * 0.8,
                  ease: "easeInOut",
                  repeatType: "reverse"
                }}
              >
                <Icon 
                  className="w-16 h-16 text-primary-400" 
                  style={{ 
                    transform: `rotate(${index * 90}deg)`,
                    opacity: 0.3 + (index * 0.2)
                  }} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          key={currentText}
          className="text-2xl font-display font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentText}
        </motion.h2>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          className="text-primary-400 font-mono text-lg"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        >
          {progress}%
        </motion.p>

        {/* AI Status Indicators */}
        <div className="mt-8 flex justify-center space-x-4">
          {['Frontend', 'Backend', 'AI', 'Database'].map((system, index) => (
            <motion.div
              key={system}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: index * 0.3 }}
              />
              <span className="text-sm text-gray-400">{system}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Matrix-like Code Rain Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen; 