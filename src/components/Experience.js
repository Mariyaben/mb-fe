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
  Globe,
  Brain,
  Scale,
  Microscope,
  Building2
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
      company: 'French Government',
      position: 'France Excellence Charpak Scholar',
      period: '2024',
      location: 'France',
      description: 'Prestigious scholarship awarded by the French government to support international students pursuing higher education in France.',
      technologies: ['Scholarship', 'International Education', 'French Government', 'Academic Excellence'],
      achievements: [
        'Selected as a recipient of the prestigious France Excellence Charpak Scholarship',
        'Recognized for academic excellence and potential by the French government',
        'Awarded financial support for pursuing higher education in France',
        'Demonstrated commitment to international academic collaboration'
      ],
      logo: Award,
      color: 'bg-blue-100'
    },
    {
      id: 2,
      company: 'Geojit Technologies',
      position: 'Machine Learning Intern',
      period: 'Aug 2024 - Aug 2025',
      location: 'Financial Services and Technology Company',
      description: 'Working on machine learning projects in the financial services domain, developing predictive models and AI solutions.',
      technologies: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'Scikit-learn', 'Financial Data Analysis'],
      achievements: [
        'Developed ML models for financial data analysis and prediction',
        'Worked on real-time financial data processing systems',
        'Collaborated with data science team on model optimization',
        'Gained hands-on experience with financial technology applications'
      ],
      logo: Brain,
      color: 'bg-gray-100'
    },
    {
      id: 3,
      company: 'Lejit AI',
      position: 'Project Manager and Tech Team Lead',
      period: 'Aug 2024 - Aug 2025',
      location: 'AI-powered Legal Management Service',
      description: 'Led a team of 8 developers in building AI-powered legal management solutions and managing project delivery.',
      technologies: ['Project Management', 'Team Leadership', 'AI/ML', 'Legal Tech', 'Agile', 'Product Development'],
      achievements: [
        'Successfully led a team of 8 developers across multiple projects',
        'Managed project timelines and deliverables for legal tech solutions',
        'Coordinated between technical and business stakeholders',
        'Improved team productivity and project delivery efficiency'
      ],
      logo: Scale,
      color: 'bg-gray-100'
    },
    {
      id: 4,
      company: 'National Institute of Technology Karnataka',
      position: 'Research Intern',
      period: 'May - June 2024',
      location: 'NIT Surathkal',
      description: 'Conducted research in emerging technologies and contributed to academic research projects.',
      technologies: ['Research', 'Academic Writing', 'Data Analysis', 'Emerging Technologies', 'Academic Collaboration'],
      achievements: [
        'Contributed to cutting-edge research in emerging technologies',
        'Collaborated with faculty and research scholars',
        'Developed research methodologies and data analysis skills',
        'Gained experience in academic research environment'
      ],
      logo: Microscope,
      color: 'bg-gray-100'
    },
    {
      id: 5,
      company: 'KPIT Technologies Ltd',
      position: 'Student Intern',
      period: 'June - July 2023',
      location: 'Kochi, Kerala, India',
      description: 'Gained practical experience in software development and technology solutions.',
      technologies: ['Software Development', 'Technology Solutions', 'Corporate Environment', 'Team Collaboration'],
      achievements: [
        'Worked on real-world software development projects',
        'Learned industry best practices and development methodologies',
        'Collaborated with experienced developers and engineers',
        'Gained exposure to corporate software development environment'
      ],
      logo: Building2,
      color: 'bg-gray-100'
    }
  ];

  const stats = [
    { label: 'Years Experience', value: '3+', icon: Calendar },
    { label: 'Projects Delivered', value: '10+', icon: Briefcase },
    { label: 'Technologies', value: '15+', icon: TrendingUp },
    { label: 'Team Members Led', value: '8+', icon: Users },
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
                  <div className={`w-12 h-12 rounded-full ${experience.color} flex items-center justify-center`}>
                    {React.createElement(experience.logo, { size: 24, className: "text-gray-700" })}
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
                <div className={`w-12 h-12 rounded-lg ${experiences[selectedExperience]?.color} flex items-center justify-center`}>
                  {experiences[selectedExperience]?.logo && React.createElement(experiences[selectedExperience].logo, { size: 24, className: "text-gray-700" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{experiences[selectedExperience]?.position}</h3>
                  <p className="text-primary-400">{experiences[selectedExperience]?.company}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  My diverse experiences across software development, team leadership, and AI technologies have given me a well-rounded perspective on building solutions. Each role has taught me valuable lessons about technology, people, and processes, helping me grow both technically and professionally.
                </p>
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