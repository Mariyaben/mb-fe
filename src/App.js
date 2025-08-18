import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';

// Lazy load components for better performance
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Experience = React.lazy(() => import('./components/Experience'));
const Contact = React.lazy(() => import('./components/Contact'));
const Navbar = React.lazy(() => import('./components/Navbar'));
const Footer = React.lazy(() => import('./components/Footer'));
const LoadingScreen = React.lazy(() => import('./components/LoadingScreen'));
// Removed ParticleBackground import

// Create a query client for data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [shootingStars, setShootingStars] = useState([]);
  const { isDark } = useTheme();

  // Create static star positions that don't change on re-render
  const staticStars = React.useMemo(() => {
    const stars = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        type: i % 5 === 0 ? 'bright' : i % 3 === 0 ? 'regular' : 'dim',
        delay: Math.random() * 20
      });
    }
    return stars;
  }, []);

  // Shooting star effect
  useEffect(() => {
    const createShootingStar = () => {
      const newShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 100,
        startY: Math.random() * 50,
        endX: Math.random() * 100,
        endY: Math.random() * 50 + 50,
        duration: 2000 + Math.random() * 1000,
        burst: false
      };
      
      console.log('Creating shooting star:', newShootingStar);
      setShootingStars(prev => [...prev, newShootingStar]);
      
      // Remove shooting star after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, newShootingStar.duration + 1000);
    };

    // Create a test shooting star immediately
    setTimeout(() => createShootingStar(), 1000);

    // Create shooting stars more frequently
    const interval = setInterval(() => {
      if (Math.random() < 0.6) { // 60% chance every interval (increased from 30%)
        createShootingStar();
      }
    }, 3000 + Math.random() * 4000); // Every 3-7 seconds (faster than 8-20)

    return () => clearInterval(interval);
  }, []);

  // Click to create shooting star
  const handleScreenClick = (e) => {
    // Don't trigger on navigation or interactive elements
    if (e.target.closest('nav') || e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newShootingStar = {
      id: Date.now() + Math.random(),
      startX: clickX,
      startY: clickY,
      endX: clickX + (Math.random() * 60 - 30), // Random direction from click point
      endY: clickY + (Math.random() * 60 - 30),
      duration: 1500 + Math.random() * 1000, // Slightly faster for click-triggered
      burst: false
    };
    
    console.log('Click-triggered shooting star:', newShootingStar);
    setShootingStars(prev => [...prev, newShootingStar]);
    
    // Remove shooting star after animation
    setTimeout(() => {
      setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
    }, newShootingStar.duration + 1000);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reduced from 3000 to 1000ms
    return () => clearTimeout(timer);
  }, []);

  // Track current section for navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative" onClick={handleScreenClick}>
      {/* Static night sky background */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-black" />
        
        {/* Static star dots with different brightness levels */}
        {staticStars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full static-star ${
              star.type === 'bright' ? 'bright' : 
              star.type === 'regular' ? '' : 'dim'
            }`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
        
        {/* Static nebula elements with slow animations */}
        <div className="static-nebula blue w-96 h-96 absolute opacity-5" style={{ left: '15%', top: '25%', animationDelay: '0s' }} />
        <div className="static-nebula purple w-80 h-80 absolute opacity-5" style={{ left: '70%', top: '30%', animationDelay: '10s' }} />
        <div className="static-nebula green w-72 h-72 absolute opacity-5" style={{ left: '45%', top: '65%', animationDelay: '20s' }} />
        
        {/* Shooting Stars */}
        {shootingStars.map((shootingStar) => (
          <div key={shootingStar.id}>
            {/* Shooting star trail */}
            <div
              className="shooting-star-trail absolute w-1 h-1 bg-white rounded-full opacity-80"
              style={{
                left: `${shootingStar.startX}%`,
                top: `${shootingStar.startY}%`,
                '--start-x': `${shootingStar.startX}%`,
                '--start-y': `${shootingStar.startY}%`,
                '--end-x': `${shootingStar.endX}%`,
                '--end-y': `${shootingStar.endY}%`,
                animation: `shootingStarTrail ${shootingStar.duration}ms ease-out forwards`,
              }}
            />
            
            {/* Shooting star head */}
            <div
              className="shooting-star-head absolute w-2 h-2 bg-white rounded-full opacity-100 shadow-lg"
              style={{
                left: `${shootingStar.startX}%`,
                top: `${shootingStar.startY}%`,
                '--start-x': `${shootingStar.startX}%`,
                '--start-y': `${shootingStar.startY}%`,
                '--end-x': `${shootingStar.endX}%`,
                '--end-y': `${shootingStar.endY}%`,
                animation: `shootingStarHead ${shootingStar.duration}ms ease-out forwards`,
              }}
            />
            
            {/* Stardust burst effect */}
            <div
              className="stardust-burst absolute"
              style={{
                left: `${shootingStar.endX}%`,
                top: `${shootingStar.endY}%`,
                animation: `stardustBurst 1s ease-out forwards`,
                animationDelay: `${shootingStar.duration}ms`,
              }}
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="stardust-particle absolute w-1 h-1 bg-yellow-300 rounded-full opacity-80"
                  style={{
                    animation: `stardustParticle 1s ease-out forwards`,
                    animationDelay: `${shootingStar.duration + i * 50}ms`,
                    '--angle': `${i * 30}`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        
        {/* Static constellation lines */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Big Dipper */}
          <line x1="10%" y1="20%" x2="15%" y2="18%" className="constellation-line" />
          <line x1="15%" y1="18%" x2="20%" y2="15%" className="constellation-line" />
          <line x1="20%" y1="15%" x2="25%" y2="12%" className="constellation-line" />
          <line x1="25%" y1="12%" x2="30%" y2="10%" className="constellation-line" />
          <line x1="30%" y1="10%" x2="35%" y2="8%" className="constellation-line" />
          <line x1="35%" y1="8%" x2="40%" y2="6%" className="constellation-line" />
          {/* Orion's Belt */}
          <line x1="45%" y1="40%" x2="50%" y2="42%" className="constellation-line" />
          <line x1="50%" y1="42%" x2="55%" y2="44%" className="constellation-line" />
          {/* Cassiopeia */}
          <line x1="20%" y1="60%" x2="25%" y2="58%" className="constellation-line" />
          <line x1="25%" y1="58%" x2="30%" y2="62%" className="constellation-line" />
          <line x1="30%" y1="62%" x2="35%" y2="56%" className="constellation-line" />
          <line x1="35%" y1="56%" x2="40%" y2="64%" className="constellation-line" />
        </svg>
      </div>
      
      <Router>
        <Navbar currentSection={currentSection} />
        
        <main>
          <Routes>
            <Route path="/" element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Experience />
                  <Contact />
                </motion.div>
              </AnimatePresence>
            } />
          </Routes>
        </main>
        
        <Footer />
      </Router>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? '#1e293b' : '#ffffff',
            color: isDark ? '#ffffff' : '#1e293b',
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
