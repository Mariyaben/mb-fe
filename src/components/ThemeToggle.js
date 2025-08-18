import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900/50 border border-gray-700/50 text-yellow-400 hover:bg-gray-800/50' 
          : 'bg-light-200/50 border border-light-300/50 text-blue-600 hover:bg-light-300/50'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-lg ${
          isDark 
            ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20' 
            : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle; 