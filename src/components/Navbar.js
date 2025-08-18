import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Code, ChevronDown, Sparkles, Zap, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ currentSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { isDark } = useTheme();
  const navbarRef = useRef(null);
  
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const blurAmount = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home', icon: Sparkles },
    { id: 'about', label: 'About', href: '#about', icon: Target },
    { id: 'skills', label: 'Skills', href: '#skills', icon: Zap },
    { id: 'projects', label: 'Projects', href: '#projects', icon: Code },
    { id: 'experience', label: 'Experience', href: '#experience', icon: ChevronDown },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Sparkles },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Floating particles effect
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            isDark ? 'bg-primary-400/30' : 'bg-primary-500/30'
          }`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Background Pattern */}
      <div className="fixed top-0 left-0 right-0 h-20 z-40 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(107,114,128,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1)_0%,transparent_50%)]" />
        </div>
      </div>

      <motion.nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: `blur(${blurAmount}px)`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glassmorphism Background */}
        <motion.div
          className="absolute inset-0 rounded-b-3xl"
          style={{
            backgroundColor: isDark 
              ? `rgba(17, 24, 39, ${backgroundOpacity})` 
              : `rgba(255, 255, 255, ${backgroundOpacity})`,
            border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.3)'}`,
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Animated Logo */}
            <motion.div
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('#home')}
            >
              {/* Morphing Logo Container */}
              <motion.div
                className={`relative w-12 h-12 rounded-2xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600' 
                    : 'bg-gradient-to-br from-primary-400 via-secondary-400 to-primary-500'
                } flex items-center justify-center shadow-2xl group-hover:shadow-glow-lg transition-all duration-500`}
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Floating particles inside logo */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  animate={{
                    background: [
                      'linear-gradient(45deg, #6b7280, #8b5cf6)',
                      'linear-gradient(45deg, #8b5cf6, #ec4899)',
                      'linear-gradient(45deg, #ec4899, #6b7280)',
                      'linear-gradient(45deg, #6b7280, #8b5cf6)',
                    ],
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                />
                
                <Code className="w-6 h-6 text-white relative z-10" />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-white/20"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                />
              </motion.div>

              {/* Text Logo with gradient */}
              <div className="relative">
                <motion.span
                  className={`text-2xl font-black ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                  whileHover={{
                    background: 'linear-gradient(45deg, #6b7280, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                                 >
                   
                 </motion.span>
                
                {/* Underline effect */}
                <motion.div
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                    isDark ? 'bg-gradient-to-r from-primary-400 to-secondary-400' : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                  }`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    className="relative"
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ y: -2 }}
                  >
                    <motion.button
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                        currentSection === item.id
                          ? isDark
                            ? 'text-primary-300 bg-primary-500/20'
                            : 'text-primary-600 bg-primary-100'
                          : isDark
                          ? 'text-gray-300 hover:text-primary-300'
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                      whileHover={{
                        scale: 1.05,
                        rotateY: 5,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Background glow on hover */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl ${
                          isDark ? 'bg-primary-500/10' : 'bg-primary-100/50'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Icon */}
                      <IconComponent className="w-4 h-4 inline-block mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      {item.label}
                      
                      {/* Active indicator */}
                      {currentSection === item.id && (
                        <motion.div
                          className={`absolute -bottom-1 left-1/2 w-2 h-2 rounded-full ${
                            isDark ? 'bg-primary-400' : 'bg-primary-500'
                          }`}
                          layoutId="activeIndicator"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>

                    {/* Hover effect line */}
                    {hoveredItem === item.id && (
                      <motion.div
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          isDark ? 'bg-gradient-to-r from-primary-400 to-secondary-400' : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

                         {/* Mobile Menu Button */}
             <div className="flex items-center space-x-4">
               <motion.button
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className={`relative p-3 rounded-xl transition-all duration-300 ${
                   isDark
                     ? 'text-gray-300 hover:bg-gray-800/50 hover:text-primary-300'
                     : 'text-gray-600 hover:bg-light-200/50 hover:text-primary-500'
                 }`}
                 whileHover={{ 
                   scale: 1.05,
                   rotate: isMobileMenuOpen ? 180 : 0,
                 }}
                 whileTap={{ scale: 0.95 }}
               >
                 {isMobileMenuOpen ? (
                   <X className="w-6 h-6" />
                 ) : (
                   <Menu className="w-6 h-6" />
                 )}
                 
                 {/* Button glow effect */}
                 <motion.div
                   className={`absolute inset-0 rounded-xl ${
                     isDark ? 'bg-primary-500/20' : 'bg-primary-100/50'
                   }`}
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileHover={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.2 }}
                 />
               </motion.button>
             </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className={`py-6 space-y-3 border-t ${
                  isDark ? 'border-gray-700/30' : 'border-light-200/30'
                }`}>
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                          currentSection === item.id
                            ? isDark
                              ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                              : 'bg-primary-100 text-primary-600 border border-primary-200'
                            : isDark
                            ? 'text-gray-300 hover:bg-gray-800/50 hover:text-primary-300'
                            : 'text-gray-600 hover:bg-light-200/50 hover:text-primary-500'
                        }`}
                        whileHover={{ x: 10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        
                        {currentSection === item.id && (
                          <motion.div
                            className={`ml-auto w-2 h-2 rounded-full ${
                              isDark ? 'bg-primary-400' : 'bg-primary-500'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"
          style={{ 
            width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`,
            backgroundSize: '200% 100%',
          }}
          initial={{ width: 0 }}
          animate={{ 
            width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ 
            width: { duration: 0.1 },
            backgroundPosition: { 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "reverse"
            }
          }}
        />
      </motion.nav>
    </>
  );
};

export default Navbar; 