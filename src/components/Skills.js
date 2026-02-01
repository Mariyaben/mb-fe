import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Code,
  Globe,
  Database,
  Cloud,
  Cpu,
  Wrench,
  Target,
  Zap,
  Layers,
  Network,
  Eye,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Box,
  TestTube,
  GitBranch,
  Palette,
  Server,
  GitPullRequest,
  Workflow,
  Settings,
  BookOpen,
  Send,
  Monitor,
  FileText,
  Star,
  Award,
  Sparkles
} from 'lucide-react';
// Technology icons from react-icons - using verified available icons
import { 
  SiPython, SiCplusplus, SiJavascript, SiTypescript, SiHtml5, SiCss3,
  SiReact, SiNodedotjs, SiMongodb, SiMysql, SiPostgresql,
  SiAmazonwebservices, SiGithubactions, SiGit, SiLinux, SiJupyter, SiPostman,
  SiJira, SiRaspberrypi, SiGraphql, SiFigma,
  SiCardano, SiPolkadot, SiChainlink, SiPolygon, SiAvalanche, SiSolana,
  SiTron, SiVeChain, SiIota, SiNano, SiMonero, SiZcash, SiDash, SiRipple,
  SiStellar, SiAlgorand, SiCosmos, SiTezos, SiFilecoin, SiArweave, SiIpfs
} from 'react-icons/si';
import SEO from './SEO';

// Floating Particle Component
const FloatingParticle = ({ delay, duration, x, y }) => (
  <motion.div
    className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-30"
    animate={{
      x: [0, x],
      y: [0, y],
      opacity: [0.3, 0.8, 0.3],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
      repeatType: "reverse"
    }}
  />
);

// Interactive Skill Card Component
const InteractiveSkillCard = ({ skill, index, isHovered, onHover }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [skillLevel, setSkillLevel] = useState(Math.floor(Math.random() * 3) + 3); // 3-5 stars

  const SkillIcon = skill.icon;
  
  return (
    <motion.div
      className="relative cursor-pointer perspective-1000"
      onHoverStart={() => onHover(skill.name)}
      onHoverEnd={() => onHover(null)}
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-full h-32 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-700/50 overflow-hidden"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="relative h-full p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-16 h-16 border border-primary-400/30 rounded-full" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border border-secondary-400/30 rounded-full" />
            </div>
            
            {/* Skill Icon */}
            <div className="flex items-center justify-center h-full">
              <motion.div
                className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                  skill.bgColor ? '' : 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20'
                }`}
                style={{
                  background: skill.bgColor || 'linear-gradient(135deg, rgba(107, 114, 128, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)'
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <SkillIcon className={`w-8 h-8 ${skill.color || 'text-white'}`} />
              </motion.div>
            </div>
            
            {/* Skill Name */}
            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-white font-medium text-sm truncate block">{skill.name}</span>
            </div>
            
            {/* Skill Level Indicator */}
            <div className="absolute top-2 right-2 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < skillLevel ? 'text-yellow-400 fill-current' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-primary-900 to-secondary-900">
          <div className="h-full p-4 flex flex-col justify-center items-center text-center">
            <Sparkles className="w-6 h-6 text-yellow-400 mb-2" />
            <span className="text-white text-xs font-medium">Click to flip back</span>
            <div className="mt-2 text-xs text-gray-300">
              {skillLevel === 5 && "Expert"}
              {skillLevel === 4 && "Advanced"}
              {skillLevel === 3 && "Intermediate"}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};



// 3D Skill Category Card
const SkillCategoryCard = ({ category, categoryIndex, isHovered, onHover, inView, expandedCategories, toggleCategoryExpansion }) => {
  const Icon = category.icon;
  const isExpanded = expandedCategories[category.id] || false;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: categoryIndex * 0.1, duration: 0.8 }}
      onHoverStart={() => onHover(category.id)}
      onHoverEnd={() => onHover(null)}
      onClick={(e) => {
        // Prevent card click from interfering with button clicks
        if (e.target.closest('button')) return;
      }}
    >
      <motion.div
        className={`relative bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 rounded-2xl p-6 h-full transition-all duration-500 ${
          isHovered === category.id ? 'border-primary-500/50 shadow-glow' : ''
        }`}
        whileHover={{ 
          scale: 1.02, 
          y: -8,
          rotateY: 5,
          rotateX: 2,
        }}
        animate={{
          rotateY: isHovered === category.id ? 5 : 0,
          rotateX: isHovered === category.id ? 2 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 3D Depth Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl"
          animate={{
            opacity: isHovered === category.id ? 1 : 0,
            scale: isHovered === category.id ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Category Header with 3D Effect */}
        <motion.div 
          className="flex items-center space-x-3 mb-6 relative z-10"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shadow-lg"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-6 h-6 text-gray-700" />
          </motion.div>
          <h3 className="text-xl font-bold text-white">{category.title}</h3>
        </motion.div>

        {/* Expandable Skills Grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 overflow-hidden"
          initial={{ height: "200px" }}
          animate={{ 
            height: isExpanded ? `${Math.ceil(category.skills.length / 2) * 120 + 32}px` : "200px",
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          {category.skills.slice(0, isExpanded ? category.skills.length : 6).map((skill, skillIndex) => {
            const SkillIcon = skill.icon;
            const isHidden = skillIndex >= 6 && !isExpanded;
            
            return (
              <motion.div
                key={skill.name}
                className="relative overflow-hidden p-4 rounded-lg transition-all duration-300 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, ${skill.bgColor || 'rgba(0, 0, 0, 0.8)'} 100%)`
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { 
                  opacity: isHidden ? 0 : 1, 
                  x: isHidden ? -20 : 0,
                  scale: isHidden ? 0.8 : 1
                } : {}}
                transition={{ 
                  delay: categoryIndex * 0.1 + skillIndex * 0.05,
                  duration: 0.3
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateZ: 2,
                }}
              >
                {/* Static Background Pattern - Removed motion */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${skill.color || '#ffffff'} 0%, transparent 50%)`
                  }}
                />
                
                {/* Large faded logo watermark */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20">
                  <SkillIcon className={`w-20 h-20 ${skill.color || 'text-white'}`} />
                </div>
                
                {/* Skill name */}
                <span className="relative z-10 text-white font-medium text-lg">{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Expand/Collapse Button */}
        {category.skills.length > 6 && (
          <motion.button
            className="relative z-20 mt-4 w-full py-3 px-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded-lg text-primary-400 hover:from-primary-500/30 hover:to-secondary-500/30 hover:border-primary-500/50 transition-all duration-300 font-medium cursor-pointer select-none"
            onClick={(e) => {
              e.stopPropagation();
              toggleCategoryExpansion(category.id);
            }}
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={false}
            type="button"
            style={{ pointerEvents: 'auto' }}
            data-category-id={category.id}
            data-testid={`expand-button-${category.id}`}
          >
            <motion.span
              key={isExpanded ? 'expanded' : 'collapsed'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-full h-full pointer-events-none"
            >
              {isExpanded ? 'Show Less' : `Show ${category.skills.length - 6} More`}
            </motion.span>
          </motion.button>
        )}

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl opacity-0 pointer-events-none"
          animate={{ opacity: isHovered === category.id ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };


  const skillCategories = [
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: Code,
      color: 'from-gray-500 to-cyan-500',
      skills: [
        { name: 'Python', icon: SiPython, color: 'text-yellow-400', bgColor: 'rgba(255, 193, 7, 0.2)' },
        { name: 'C++', icon: SiCplusplus, color: 'text-gray-500', bgColor: 'rgba(107, 114, 128, 0.2)' },
        { name: 'Java', icon: Code, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'R', icon: Code, color: 'text-gray-600', bgColor: 'rgba(75, 85, 99, 0.2)' },
        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400', bgColor: 'rgba(255, 193, 7, 0.2)' },
        { name: 'TypeScript', icon: SiTypescript, color: 'text-gray-600', bgColor: 'rgba(75, 85, 99, 0.2)' },
        { name: 'HTML', icon: SiHtml5, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'CSS', icon: SiCss3, color: 'text-gray-500', bgColor: 'rgba(107, 114, 128, 0.2)' },
        { name: 'Bash/Shell', icon: Code, color: 'text-green-500', bgColor: 'rgba(34, 197, 94, 0.2)' },
      ]
    },
    {
      id: 'ai-ml',
      title: 'Machine Learning & Data Science',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Machine Learning', icon: Brain },
        { name: 'Deep Learning', icon: Layers },
        { name: 'Neural Networks', icon: Network },
        { name: 'NLP', icon: MessageSquare },
        { name: 'Computer Vision', icon: Eye },
        { name: 'Data Science', icon: BarChart3 },
        { name: 'Data Structures', icon: Box },
        { name: 'TensorFlow', icon: Brain },
        { name: 'PyTorch', icon: Brain },
        { name: 'Keras', icon: Brain },
        { name: 'scikit-learn', icon: Brain },
        { name: 'pandas', icon: BarChart3 },
        { name: 'NumPy', icon: BarChart3 },
        { name: 'Matplotlib', icon: BarChart3 },
        { name: 'OpenCV', icon: Eye },
        { name: 'Hugging Face Transformers', icon: Brain },
      ]
    },
    {
      id: 'web-dev',
      title: 'Web & App Development',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'ReactJS', icon: SiReact, color: 'text-gray-400', bgColor: 'rgba(156, 163, 175, 0.2)' },
        { name: 'Next.js', icon: Globe, color: 'text-black', bgColor: 'rgba(0, 0, 0, 0.2)' },
        { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500', bgColor: 'rgba(34, 197, 94, 0.2)' },
        { name: 'Django', icon: Server, color: 'text-green-700', bgColor: 'rgba(21, 128, 61, 0.2)' },
        { name: 'MERN Stack', icon: Server, color: 'text-green-600', bgColor: 'rgba(22, 163, 74, 0.2)' },
        { name: 'RESTful APIs', icon: GitPullRequest, color: 'text-gray-500', bgColor: 'rgba(107, 114, 128, 0.2)' },
        { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500', bgColor: 'rgba(236, 72, 153, 0.2)' },
        { name: 'UI/UX Design', icon: Palette, color: 'text-purple-500', bgColor: 'rgba(168, 85, 247, 0.2)' },
        { name: 'Figma', icon: SiFigma, color: 'text-purple-600', bgColor: 'rgba(147, 51, 234, 0.2)' },
      ]
    },
    {
      id: 'database',
      title: 'Database Management',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'MySQL', icon: SiMysql, color: 'text-gray-600', bgColor: 'rgba(75, 85, 99, 0.2)' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-gray-500', bgColor: 'rgba(107, 114, 128, 0.2)' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500', bgColor: 'rgba(34, 197, 94, 0.2)' },
      ]
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'from-indigo-500 to-purple-500',
      skills: [
        { name: 'AWS S3', icon: SiAmazonwebservices, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'AWS RDS', icon: SiAmazonwebservices, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'AWS Lambda', icon: SiAmazonwebservices, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'AWS EC2', icon: SiAmazonwebservices, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'GitHub Actions', icon: SiGithubactions, color: 'text-black', bgColor: 'rgba(0, 0, 0, 0.2)' },
        { name: 'CI/CD', icon: Workflow, color: 'text-gray-500', bgColor: 'rgba(107, 114, 128, 0.2)' },
      ]
    },
    {
      id: 'embedded',
      title: 'Embedded Systems & IoT',
      icon: Cpu,
      color: 'from-yellow-500 to-orange-500',
      skills: [
        { name: 'Raspberry Pi', icon: SiRaspberrypi },
        { name: 'Yocto Project', icon: Cpu },
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      icon: Wrench,
      color: 'from-gray-500 to-slate-500',
      skills: [
        { name: 'Git', icon: SiGit, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'Linux', icon: SiLinux, color: 'text-black', bgColor: 'rgba(0, 0, 0, 0.2)' },
        { name: 'LaTeX', icon: FileText, color: 'text-gray-600', bgColor: 'rgba(75, 85, 99, 0.2)' },
        { name: 'Jupyter Notebook', icon: SiJupyter, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'Postman', icon: SiPostman, color: 'text-orange-500', bgColor: 'rgba(249, 115, 22, 0.2)' },
        { name: 'VS Code', icon: Code, color: 'text-gray-500', bgColor: 'rgba(107, 114, 128, 0.2)' },
        { name: 'PyCharm', icon: Code, color: 'text-green-500', bgColor: 'rgba(34, 197, 94, 0.2)' },
        { name: 'Jira', icon: SiJira, color: 'text-gray-500', bgColor: 'rgba(107, 114, 128, 0.2)' },
      ]
    },
    {
      id: 'expertise',
      title: 'Other Expertise',
      icon: Target,
      color: 'from-teal-500 to-cyan-500',
      skills: [
        { name: 'Agile Methodologies', icon: Workflow },
        { name: 'Software Testing', icon: TestTube },
        { name: 'Version Control', icon: GitBranch },
        { name: 'Technical Documentation', icon: FileText },
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* SEO for Skills Section */}
      <SEO 
        title="Skills & Technologies"
        description="Explore my technical skills including programming languages, frameworks, tools, and technologies. From frontend development to AI and blockchain expertise."
        keywords="programming skills, technical skills, programming languages, frameworks, tools, frontend, backend, AI, blockchain, web development"
        section="skills"
      />
      
      {/* Background with Floating Particles */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        style={{ y }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticle delay={0} duration={20} x={100} y={-50} />
        <FloatingParticle delay={2} duration={25} x={-80} y={100} />
        <FloatingParticle delay={4} duration={30} x={120} y={80} />
        <FloatingParticle delay={6} duration={22} x={-60} y={-120} />
        <FloatingParticle delay={8} duration={28} x={90} y={-90} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-16 h-16 text-primary-400 mx-auto" />
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From AI/ML and data science to web development and embedded systems, 
            a comprehensive toolkit that powers my innovative solutions
          </p>
        </motion.div>



        {/* Enhanced Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategoryCard
              key={category.id}
              category={category}
              categoryIndex={categoryIndex}
              isHovered={hoveredCategory === category.id}
              onHover={setHoveredCategory}
              inView={inView}
              expandedCategories={expandedCategories}
              toggleCategoryExpansion={toggleCategoryExpansion}
            />
          ))}
        </div>

        {/* Currently Learning Section with Enhanced UI */}
        <motion.div
          className="bg-gradient-to-r from-gray-900/20 to-black/20 border border-gray-700/20 rounded-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-32 h-32 border border-primary-400 rounded-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border border-secondary-400 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-primary-400 rounded-full" />
          </div>

          <div className="relative z-10">
                      <div className="flex items-center justify-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              Currently Learning & Exploring
            </h3>
          </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Flutter', icon: Code, color: 'text-blue-500', description: 'Cross-platform mobile development' },
                { name: 'AutoGen', icon: Brain, color: 'text-purple-500', description: 'Multi-agent AI framework' },
                { name: 'RAGatouille', icon: Brain, color: 'text-indigo-500', description: 'Advanced RAG implementation' },
              ].map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    className="group relative bg-black/50 rounded-lg border border-gray-700/50 p-6 hover:border-primary-500/50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                    }}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors duration-300">
                        <ItemIcon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <span className="text-white font-semibold text-lg">{item.name}</span>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                    

                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 