import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Globe, 
  Trophy, 
  Award, 
  GraduationCap, 
  Users, 
  Palette, 
  BookOpen, 
  Mic, 
  Target,
  Zap,
  Code, 
  Database, 
  Lightbulb,
  Rocket,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const [activeTab, setActiveTab] = useState('education');
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { isDark } = useTheme();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const education = {
    degree: "MSc (5-year Integrated) in Computer Science",
    specialization: "AI and Data Science Specialization",
    university: "Cochin University of Science and Technology (CUSAT)",
    cgpa: "9.14",
    duration: "2021 - Present",
    location: "Kochi, Kerala, India",
    exchange: {
      university: "ENSSAT, University of Rennes",
      country: "France",
      duration: "Sept 2025 - Feb 2026",
      scholarship: "France Excellence Charpak Scholar"
    }
  };

  const achievements = [
    {
      title: "Dreamvestor Startup Winner",
      description: "Top 10 Startups in Kerala, 1 Lakh cash prize for Lejit AI",
      icon: Trophy,
      year: "2025",
      category: "Startup",
      highlight: true
    },
    {
      title: "IBM GenAI Conclave",
      description: "Presented LegalGPT at IBM International GenAI Conclave",
      icon: Award,
      year: "2024",
      category: "AI"
    },
    {
      title: "HackAthena Winner",
      description: "Theme Prize for Road Safety - Rs. 10,000",
      icon: Target,
      year: "2024",
      category: "Hackathon"
    },
    {
      title: "Fin-A-Thon Finalist",
      description: "Top 15 among 600 groups nationwide at IIT Delhi",
      icon: Rocket,
      year: "2023",
      category: "Hackathon"
    }
  ];

  const experiences = [
    {
      role: "AI Developer Intern",
      company: "Geojit Technologies",
      duration: "Aug 2024 - Aug 2025",
      description: "Financial Services and Technology Company",
      icon: Brain,
      type: "Internship"
    },
    {
      role: "Project Manager & Tech Lead",
      company: "Lejit AI",
      duration: "Aug 2024 - Aug 2025",
      description: "AI-powered Legal Management Service",
      icon: Users,
      type: "Leadership"
    },
    {
      role: "Research Intern",
      company: "NIT Karnataka",
      duration: "Apr 2024 - June 2024",
      description: "National Institute of Technology Surathkal",
      icon: Code,
      type: "Research"
    },
    {
      role: "Exchange Student",
      company: "ENSSAT, University of Rennes",
      duration: "Sept 2025 - Feb 2026",
      description: "France Excellence Charpak Scholar",
      icon: Globe,
      type: "International"
    }
  ];

  const creativePursuits = [
    {
      title: "Painting",
      description: "Creative expression through visual arts",
      icon: Palette,
      level: "Advanced"
    },
    {
      title: "Creative Writing",
      description: "University 1st prize in Short Story Writing & Poetry",
      icon: BookOpen,
      level: "Award Winner"
    },
    {
      title: "Public Speaking",
      description: "TEDx CUSAT 2024 Official Master of Ceremonies",
      icon: Mic,
      level: "Professional"
    }
  ];

  const tabs = [
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'creative', label: 'Creative', icon: Palette }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'education':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Main Education */}
            <div className={`p-8 rounded-2xl border-2 ${
              isDark 
                ? 'bg-gray-900/50 border-primary-500/30' 
                : 'bg-light-100/50 border-primary-200/50'
            } shadow-xl`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-xl ${
                  isDark ? 'bg-primary-500/20' : 'bg-primary-100/50'
                }`}>
                  <GraduationCap className={`w-8 h-8 ${
                    isDark ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {education.degree}
                  </h3>
                  <p className={`text-lg ${
                    isDark ? 'text-primary-400' : 'text-primary-600'
                  }`}>
                    {education.specialization}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className={`text-center p-4 rounded-xl ${
                  isDark ? 'bg-gray-800/50' : 'bg-light-200/50'
                }`}>
                  <div className={`text-3xl font-bold ${
                    isDark ? 'text-primary-400' : 'text-primary-600'
                  }`}>
                    {education.cgpa}
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    CGPA
                  </div>
                </div>
                <div className={`text-center p-4 rounded-xl ${
                  isDark ? 'bg-gray-800/50' : 'bg-light-200/50'
                }`}>
                  <div className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {education.duration}
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Duration
                  </div>
                </div>
                <div className={`text-center p-4 rounded-xl ${
                  isDark ? 'bg-gray-800/50' : 'bg-light-200/50'
                }`}>
                  <div className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {education.location}
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Location
                  </div>
                </div>
              </div>
            </div>

            {/* Exchange Program */}
            <div className={`p-8 rounded-2xl border-2 ${
              isDark 
                ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30' 
                : 'bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-200/50'
            } shadow-xl`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-xl ${
                  isDark ? 'bg-blue-500/20' : 'bg-blue-100/50'
                }`}>
                  <Globe className={`w-8 h-8 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    International Exchange Program
                  </h3>
                  <p className={`text-lg ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {education.exchange.university}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${
                  isDark ? 'bg-gray-800/50' : 'bg-light-200/50'
                }`}>
                  <div className={`text-sm font-semibold ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Duration
                  </div>
                  <div className={`text-lg ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {education.exchange.duration}
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${
                  isDark ? 'bg-gray-800/50' : 'bg-light-200/50'
                }`}>
                  <div className={`text-sm font-semibold ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Scholarship
                  </div>
                  <div className={`text-lg ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {education.exchange.scholarship}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={index}
                  className={`relative p-6 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-700/50 hover:border-primary-500/50'
                      : 'bg-light-100/50 border-light-200/50 hover:border-primary-500/50'
                  }`}
                  whileHover={{ scale: 1.01, x: 10 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      isDark ? 'bg-primary-500/20' : 'bg-primary-100/50'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isDark ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {exp.role}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-600'
                        }`}>
                          {exp.type}
                        </span>
                      </div>
                      <p className={`text-lg font-medium ${
                        isDark ? 'text-primary-400' : 'text-primary-600'
                      }`}>
                        {exp.company}
                      </p>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {exp.duration}
                      </p>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        );

      case 'achievements':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-700/50 hover:border-primary-500/50'
                      : 'bg-light-100/50 border-light-200/50 hover:border-primary-500/50'
                  } ${achievement.highlight ? 'ring-2 ring-primary-500/50' : ''}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      isDark ? 'bg-primary-500/20' : 'bg-primary-100/50'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isDark ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {achievement.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-secondary-500/20 text-secondary-400' : 'bg-secondary-100 text-secondary-600'
                        }`}>
                          {achievement.year}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {achievement.description}
                      </p>
                      <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                        isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-600'
                      }`}>
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        );

      case 'creative':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {creativePursuits.map((pursuit, index) => {
              const Icon = pursuit.icon;
              return (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-700/50 hover:border-primary-500/50'
                      : 'bg-light-100/50 border-light-200/50 hover:border-primary-500/50'
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      isDark ? 'bg-primary-500/20' : 'bg-primary-100/50'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isDark ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {pursuit.title}
                      </h4>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {pursuit.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-secondary-500/20 text-secondary-400' : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      {pursuit.level}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background - Removed to show stars through */}
      {/* <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        style={{ y }}
      /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          
          <motion.p
            className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            As a 9th semester MSc student specializing in AI and Data Science at CUSAT, 
            I blend academic excellence with innovation. Currently an exchange student at ENSSAT, France, 
            I'm passionate about solving real-world challenges through technology.
          </motion.p>
        </motion.div>

        {/* Interactive Tabs */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-primary-500 text-white shadow-lg'
                      : isDark
                      ? 'text-gray-300 hover:text-primary-300 hover:bg-gray-800/50'
                      : 'text-gray-600 hover:text-primary-500 hover:bg-light-200/50'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
            <motion.div
          className="min-h-[600px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </section>
  );
};

export default About; 