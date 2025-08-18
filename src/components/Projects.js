import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Code, 
  Database, 
  Globe, 
  Target, 
  Zap, 
  Users, 
  Award,
  Github,
  ExternalLink,
  Eye,
  Star,
  TrendingUp,
  Lightbulb,
  Rocket,
  Shield,
  Palette,
  BookOpen,
  Car,
  Building,
  Landmark
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { isDark } = useTheme();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Code, count: 12 },
    { id: 'ai-ml', label: 'AI/ML', icon: Brain, count: 6 },
    { id: 'web', label: 'Web Dev', icon: Globe, count: 4 },
    { id: 'mobile', label: 'Mobile', icon: Zap, count: 2 }
  ];

  const projects = [
    {
      id: 1,
      title: "Fusion-Enhanced Drug Target Affinity Prediction",
      description: "Designed and implemented a deep learning model for drug–target affinity prediction using multi-modal sequence–structure fusion with graph neural networks and attention mechanisms.",
      category: "ai-ml",
      technologies: ["Python", "Deep Learning", "Graph Neural Networks", "Attention Mechanisms"],
      icon: Brain,
      highlight: true,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Research Innovation",
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "AI-Sherlock-Holmes",
      description: "A conversational AI system integrating RAG, fine-tuned on the complete Sherlock Holmes corpus, to emulate deductive reasoning and assist users in solving mysteries through context-aware interactions.",
      category: "ai-ml",
      technologies: ["RAG", "NLP", "Fine-tuning", "Conversational AI"],
      icon: BookOpen,
      highlight: true,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "AI Innovation",
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "Malayalam Text Classifier",
      description: "Developed a probabilistic Malayalam text classification system using Naive Bayes with unigram and bigram models, incorporating morphological tokenization with mlmorph for enhanced linguistic accuracy.",
      category: "ai-ml",
      technologies: ["Python", "NLP", "Naive Bayes", "Morphological Analysis"],
      icon: Target,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Language Processing",
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "Marine Pollution Detection using Deep Learning",
      description: "Deep learning model utilizing underwater imagery to automate the detection of marine plastic pollution, presented at the National Conference on Marine Pollution & Ecotoxicology (NCMPE-24).",
      category: "ai-ml",
      technologies: ["Deep Learning", "Computer Vision", "Environmental AI", "OpenCV"],
      icon: Shield,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Environmental Impact",
      difficulty: "Advanced"
    },
    {
      id: 5,
      title: "Personalized Hand Gesture Interpreter",
      description: "A personalized sign language interpreter project utilizing machine learning and computer vision algorithms to learn users' unique sign language patterns and translate them into text or speech in real time.",
      category: "ai-ml",
      technologies: ["Machine Learning", "Computer Vision", "Real-time Processing", "Accessibility"],
      icon: Users,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Accessibility",
      difficulty: "Advanced"
    },
    {
      id: 6,
      title: "Lejit AI: Legal Management Application",
      description: "AI-powered legal management platform focused on optimizing legal workflows, case management, and document analytics. Built using Django and React, integrating advanced NLP for document parsing.",
      category: "web",
      technologies: ["Django", "React", "NLP", "AI", "Legal Tech"],
      icon: Building,
      highlight: true,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Startup Winner",
      difficulty: "Advanced"
    },
    {
      id: 7,
      title: "LegalGPT",
      description: "AI-powered legal document processing for improved efficiency utilizing LLM, RAG, and IBM WatsonX. Developed in collaboration with IBM WatsonX and presented during the IBM International GenAI Conclave.",
      category: "ai-ml",
      technologies: ["LLM", "RAG", "IBM WatsonX", "Legal AI"],
      icon: Award,
      highlight: true,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "IBM Collaboration",
      difficulty: "Advanced"
    },
    {
      id: 8,
      title: "Vitae: Healthcare Platform",
      description: "Healthcare platform for personalized diagnosis and recommendations using TensorFlow and scikit-learn.",
      category: "ai-ml",
      technologies: ["TensorFlow", "scikit-learn", "Healthcare AI", "Machine Learning"],
      icon: Shield,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Healthcare",
      difficulty: "Intermediate"
    },
    {
      id: 9,
      title: "LearnDrive.AI",
      description: "Automated driving learners assistance system providing real-time driver assistance based on object detection. Implemented using YOLO models and gtts.",
      category: "ai-ml",
      technologies: ["YOLO", "Computer Vision", "Real-time AI", "Driving Assistance"],
      icon: Car,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Transportation",
      difficulty: "Advanced"
    },
    {
      id: 10,
      title: "OfficeFlow: Office Management System",
      description: "An automated office management application for resume screening, HR-GPT, and project allocation.",
      category: "web",
      technologies: ["Automation", "HR Tech", "Office Management", "AI"],
      icon: Building,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Business Efficiency",
      difficulty: "Intermediate"
    },
    {
      id: 11,
      title: "Hyperpersonalized Banking App",
      description: "Recommendation system for personalized loan and financial plan recommendations based on user behavior for Fin-A-Thon Hackathon final round at IIT Delhi.",
      category: "web",
      technologies: ["Recommendation Systems", "FinTech", "Personalization", "AI"],
      icon: Landmark,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "FinTech Innovation",
      difficulty: "Advanced"
    },
    {
      id: 12,
      title: "Yocto Project on Raspberry Pi",
      description: "Leveraged the Yocto project to create a custom Linux distribution on the Raspberry Pi embedded system.",
      category: "mobile",
      technologies: ["Embedded Systems", "Linux", "Raspberry Pi", "IoT"],
      icon: Zap,
      github: "https://github.com/Mariyaben",
      demo: "#",
      impact: "Embedded Systems",
      difficulty: "Advanced"
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
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
              Featured Projects
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
            From AI-powered legal tech to marine pollution detection, explore my innovative 
            projects that combine cutting-edge technology with real-world impact.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
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
                  <span>{category.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isActive 
                      ? 'bg-white/20' 
                      : isDark ? 'bg-gray-800/50' : 'bg-light-200/50'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                className={`relative group cursor-pointer ${
                  project.highlight ? 'ring-2 ring-primary-500/50' : ''
                }`}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <motion.div
                  className={`h-full p-6 rounded-2xl border transition-all duration-500 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-700/50 hover:border-primary-500/50'
                      : 'bg-light-100/50 border-light-200/50 hover:border-primary-500/50'
                  }`}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    boxShadow: isDark 
                      ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
                      : '0 20px 40px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      isDark ? 'bg-primary-500/20' : 'bg-primary-100/50'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isDark ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </div>
                    {project.highlight && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-xs text-yellow-500 font-medium">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className={`text-xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className={`text-sm leading-relaxed mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-gray-800/50 text-primary-400' : 'bg-primary-100 text-primary-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project Impact & Difficulty */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className={`w-4 h-4 ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={`text-xs ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {project.impact}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.difficulty === 'Advanced' 
                        ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                        : isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isDark
                          ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-primary-400'
                          : 'bg-light-200/50 text-gray-600 hover:bg-light-300/50 hover:text-primary-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </motion.a>
                    
                    {project.demo !== '#' && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          isDark
                            ? 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
                            : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </motion.a>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl ${
                      isDark ? 'bg-primary-500/10' : 'bg-primary-100/20'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
        >
          <motion.a
            href="https://github.com/Mariyaben"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow hover:shadow-glow-lg'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6" />
            <span>View All Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;