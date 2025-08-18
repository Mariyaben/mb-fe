import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Download,
  ArrowRight,
  Star
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { isDark } = useTheme();

  // Removed scroll-based motion
  // const { scrollYProgress } = useScroll();
  // const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const texts = [
    'AI & Data Science Specialist',
    'International Exchange Student',
    'Charpak Excellence Scholar',
    'Aspiring Startup Founder',
    'Full-Stack Developer',
    'Machine Learning Engineer'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Mariyaben', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/mariyabenny123', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mariyaben02@gmail.com', label: 'Email' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - Removed to show stars through */}
      {/* <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        style={{ y }}
      /> */}

      {/* Static Background Elements - Removed all motion */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gray-700/20 blur-3xl"
        />
        <div
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gray-600/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Photo */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 1.2 }}
          >
            <div className={`relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 ${
               isDark ? 'border-primary-500/30' : 'border-primary-200/50'
             } shadow-2xl`}>
              <motion.img
                src="/machukuttan.jpg"
                alt="Mariya"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              {/* Static glow effect - Removed motion */}
              <div
                className={`absolute inset-0 rounded-full ${
                  isDark ? 'bg-primary-500/20' : 'bg-primary-100/30'
                }`}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 1.0 }} // Added duration for smoother animation
          >
                         <span className={`bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent ${
               isDark ? 'drop-shadow-glow' : ''
             }`}>
               Mariya Benny
             </span>
          </motion.h1>

          {/* Dynamic Role Text */}
          <motion.div
            className="h-8 mb-8 flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 1.0 }} // Added duration for smoother animation
          >
            <span className={`text-xl lg:text-2xl font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              I'm a{' '}
            </span>
            <span className={`text-xl lg:text-2xl font-bold ml-2 ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>
              {texts[currentTextIndex]}
            </span>
            <motion.span
              className={`ml-1 ${
                isDark ? 'text-primary-400' : 'text-primary-600'
              }`}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }} // Increased from 0.5s to 1.2s
            >
              |
            </motion.span>
          </motion.div>

                     {/* Description */}
           <motion.p
             className={`text-lg lg:text-xl max-w-4xl mx-auto mb-12 leading-relaxed ${
               isDark ? 'text-gray-400' : 'text-gray-600'
             }`}
             initial={{ opacity: 0, y: 20 }}
             animate={inView ? { opacity: 1, y: 0 } : {}}
             transition={{ delay: 0.8, duration: 1.2 }} // Increased from default to 1.2s
           >
             As a 9th semester MSc student specializing in AI and Data Science at CUSAT, I blend academic excellence with innovation. 
             Currently an exchange student at ENSSAT, France, I'm passionate about solving real-world challenges through technology. 
           </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 1.2 }} // Added duration for smoother animation
          >
            <motion.button
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow hover:shadow-glow-lg'
                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.6 }} // Added explicit transition duration
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                isDark
                  ? 'border border-primary-500/50 text-primary-400 hover:bg-primary-500/10'
                  : 'border border-primary-500/50 text-primary-600 hover:bg-primary-500/10'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.6 }} // Added explicit transition duration
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 1.2 }} // Added duration for smoother animation
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isDark
                      ? 'text-gray-400 hover:text-primary-400 hover:bg-gray-800/50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-light-200/50'
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.4 + index * 0.1, duration: 1.0 }} // Added duration for smoother animation
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </motion.div>

                     
         </motion.div>
       </div>
     </section>
   );
 };
 
 export default Hero; 