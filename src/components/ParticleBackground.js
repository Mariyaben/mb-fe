import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [constellations, setConstellations] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const initStars = () => {
      const newStars = [];
      const starCount = Math.min(window.innerWidth / 15, 150);
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.8 ? '#ffffff' : Math.random() > 0.6 ? '#e2e8f0' : '#cbd5e1',
        });
      }
      setStars(newStars);
    };

    // Initialize constellations
    const initConstellations = () => {
      const newConstellations = [
        // Big Dipper
        {
          name: 'Big Dipper',
          stars: [
            { x: 0.1, y: 0.2, size: 2, opacity: 0.9 },
            { x: 0.15, y: 0.18, size: 1.5, opacity: 0.8 },
            { x: 0.2, y: 0.15, size: 1.8, opacity: 0.85 },
            { x: 0.25, y: 0.12, size: 1.2, opacity: 0.7 },
            { x: 0.3, y: 0.1, size: 1.6, opacity: 0.8 },
            { x: 0.35, y: 0.08, size: 1.4, opacity: 0.75 },
            { x: 0.4, y: 0.06, size: 1.9, opacity: 0.9 }
          ],
          connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [2, 5]],
          color: '#60a5fa',
          opacity: 0.15,
          rotationSpeed: 0.0001,
          rotationPhase: Math.random() * Math.PI * 2
        },
        // Little Dipper
        {
          name: 'Little Dipper',
          stars: [
            { x: 0.8, y: 0.15, size: 2.2, opacity: 0.95 },
            { x: 0.75, y: 0.18, size: 1.3, opacity: 0.7 },
            { x: 0.7, y: 0.22, size: 1.7, opacity: 0.8 },
            { x: 0.65, y: 0.25, size: 1.1, opacity: 0.6 },
            { x: 0.6, y: 0.28, size: 1.5, opacity: 0.75 },
            { x: 0.55, y: 0.32, size: 1.2, opacity: 0.65 },
            { x: 0.5, y: 0.35, size: 1.8, opacity: 0.85 }
          ],
          connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [2, 5]],
          color: '#a855f7',
          opacity: 0.12,
          rotationSpeed: 0.00008,
          rotationPhase: Math.random() * Math.PI * 2
        },
        // Orion's Belt
        {
          name: 'Orion\'s Belt',
          stars: [
            { x: 0.45, y: 0.4, size: 2.5, opacity: 0.9 },
            { x: 0.5, y: 0.42, size: 2.3, opacity: 0.85 },
            { x: 0.55, y: 0.44, size: 2.1, opacity: 0.8 }
          ],
          connections: [[0, 1], [1, 2]],
          color: '#f59e0b',
          opacity: 0.18,
          rotationSpeed: 0.00012,
          rotationPhase: Math.random() * Math.PI * 2
        },
        // Cassiopeia
        {
          name: 'Cassiopeia',
          stars: [
            { x: 0.2, y: 0.6, size: 1.8, opacity: 0.8 },
            { x: 0.25, y: 0.58, size: 1.4, opacity: 0.7 },
            { x: 0.3, y: 0.62, size: 1.6, opacity: 0.75 },
            { x: 0.35, y: 0.56, size: 1.2, opacity: 0.65 },
            { x: 0.4, y: 0.64, size: 1.9, opacity: 0.85 }
          ],
          connections: [[0, 1], [1, 2], [2, 3], [3, 4]],
          color: '#ec4899',
          opacity: 0.14,
          rotationSpeed: 0.00009,
          rotationPhase: Math.random() * Math.PI * 2
        }
      ];
      setConstellations(newConstellations);
    };

    initStars();
    initConstellations();

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle gradient background for night sky
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      );
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.3)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.1)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate stars
      stars.forEach((star, index) => {
        // Update twinkle
        star.twinklePhase += star.twinkleSpeed;
        const twinkleOpacity = star.opacity * (0.7 + 0.3 * Math.sin(star.twinklePhase));
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
        ctx.fill();
        
        // Add subtle glow for brighter stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity * 0.1})`;
          ctx.fill();
        }
      });

      // Add subtle atmospheric clouds
      const time = Date.now() * 0.0001;
      for (let i = 0; i < 3; i++) {
        const cloudX = (Math.sin(time * 0.5 + i) * 0.3 + 0.5) * canvas.width;
        const cloudY = (Math.cos(time * 0.3 + i * 0.7) * 0.2 + 0.3) * canvas.height;
        const cloudSize = 100 + Math.sin(time + i) * 20;
        
        ctx.beginPath();
        ctx.arc(cloudX, cloudY, cloudSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.03)';
        ctx.fill();
      }

      // Draw constellations
      constellations.forEach((constellation) => {
        // Update constellation rotation
        constellation.rotationPhase += constellation.rotationSpeed;

        // Draw constellation lines
        constellation.connections.forEach(([start, end]) => {
          const startStar = constellation.stars[start];
          const endStar = constellation.stars[end];
          
          // Rotate stars for constellation movement
          const rotatedStartX = startStar.x * canvas.width + Math.cos(constellation.rotationPhase) * 10;
          const rotatedStartY = startStar.y * canvas.height + Math.sin(constellation.rotationPhase) * 10;
          const rotatedEndX = endStar.x * canvas.width + Math.cos(constellation.rotationPhase) * 10;
          const rotatedEndY = endStar.y * canvas.height + Math.sin(constellation.rotationPhase) * 10;

          ctx.beginPath();
          ctx.moveTo(rotatedStartX, rotatedStartY);
          ctx.lineTo(rotatedEndX, rotatedEndY);
          ctx.strokeStyle = `rgba(96, 165, 250, ${constellation.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Draw constellation stars
        constellation.stars.forEach((star) => {
          const x = star.x * canvas.width;
          const y = star.y * canvas.height;
          
          // Rotate stars for constellation movement
          const rotatedX = x + Math.cos(constellation.rotationPhase) * 10;
          const rotatedY = y + Math.sin(constellation.rotationPhase) * 10;

          ctx.beginPath();
          ctx.arc(rotatedX, rotatedY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();
          
          // Add glow effect
          ctx.beginPath();
          ctx.arc(rotatedX, rotatedY, star.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${star.opacity * 0.3})`;
          ctx.fill();
        });
      });

      // Add subtle shooting stars occasionally
      if (Math.random() < 0.003) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = startY + (Math.random() - 0.5) * 200;
        
        // Draw shooting star trail
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add glow effect
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 6;
        ctx.stroke();
        
        // Fade out effect
        setTimeout(() => {
          ctx.clearRect(startX - 3, startY - 3, 206, 206);
        }, 150);
      }

      // Add occasional meteor shower effect
      if (Math.random() < 0.0005) {
        const meteorCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < meteorCount; i++) {
          const startX = Math.random() * canvas.width;
          const startY = Math.random() * canvas.height;
          const endX = startX + (Math.random() - 0.5) * 150;
          const endY = startY + (Math.random() - 0.5) * 150;
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [stars, constellations, mousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Additional visual effects */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900/10 to-transparent" />
        
        {/* Floating nebula-like orbs */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full opacity-5"
            style={{
              background: `radial-gradient(circle, ${i === 0 ? '#1e40af' : '#7c3aed'}10, transparent)`,
              left: `${15 + i * 70}%`,
              top: `${25 + i * 30}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 8 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticleBackground; 