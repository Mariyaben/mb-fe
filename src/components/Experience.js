import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Award,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const experiences = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      position: 'Senior Full-Stack Developer',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Leading development of AI-powered applications and mentoring junior developers.',
      technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'AWS'],
      achievements: [
        'Led team of 8 developers in building AI-powered e-commerce platform',
        'Improved application performance by 40% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Mentored 5 junior developers and conducted technical interviews'
      ],
      logo: '🏢',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      company: 'InnovateLabs',
      position: 'AI/ML Engineer',
      period: '2021 - 2022',
      location: 'New York, NY',
      description: 'Developed machine learning models for predictive analytics and computer vision.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Docker'],
      achievements: [
        'Built computer vision system achieving 95% accuracy in object detection',
        'Developed predictive models reducing customer churn by 25%',
        'Optimized ML pipeline reducing training time by 50%',
        'Published 3 research papers on AI applications'
      ],
      logo: '🧠',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      company: 'StartupHub',
      position: 'Frontend Developer',
      period: '2020 - 2021',
      location: 'Austin, TX',
      description: 'Built responsive web applications and collaborated with design teams.',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
      achievements: [
        'Developed 10+ responsive web applications',
        'Improved user experience scores by 35%',
        'Implemented design system used across 5 projects',
        'Reduced bundle size by 30% through optimization'
      ],
      logo: '🚀',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      company: 'Digital Dynamics',
      position: 'Backend Developer',
      period: '2019 - 2020',
      location: 'Seattle, WA',
      description: 'Built scalable backend systems and RESTful APIs.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'],
      achievements: [
        'Built RESTful APIs serving 1M+ requests daily',
        'Implemented caching strategy reducing response time by 70%',
        'Designed database schema for 5 major applications',
        'Set up monitoring and logging infrastructure'
      ],
      logo: '⚙️',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Years Experience', value: '5+', icon: Calendar },
    { label: 'Projects Delivered', value: '50+', icon: Briefcase },
    { label: 'Technologies', value: '20+', icon: TrendingUp },
    { label: 'Team Members Led', value: '15+', icon: Users },
  ];

  return (
    <section id="experience" className="relative py-20 overflow-hidden">
      {/* Background - Removed to show stars through */}
      {/* <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        style={{ y }}
      /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A journey through diverse roles and companies, building expertise across the full technology stack
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                onClick={() => setSelectedExperience(index)}
              >
                {/* Timeline Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-20 bg-gradient-to-b from-primary-500 to-secondary-500" />
                )}
                
                <motion.div
                  className={`flex items-start space-x-4 p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    selectedExperience === index
                      ? 'bg-gradient-to-r from-primary-900/20 to-secondary-900/20 border-primary-500/50 shadow-glow'
                      : 'bg-gray-900/50 border-gray-700/50 hover:border-primary-500/30'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${experience.color} flex items-center justify-center text-2xl`}>
                    {experience.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{experience.position}</h3>
                      <span className="text-primary-400 font-mono text-sm">{experience.period}</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-lg font-semibold text-primary-400">{experience.company}</span>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{experience.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-3">{experience.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Selected Experience Details */}
          <div className="space-y-6">
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${experiences[selectedExperience]?.color} flex items-center justify-center text-2xl`}>
                  {experiences[selectedExperience]?.logo}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{experiences[selectedExperience]?.position}</h3>
                  <p className="text-primary-400">{experiences[selectedExperience]?.company}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                {experiences[selectedExperience]?.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Icon className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-semibold hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Full Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 