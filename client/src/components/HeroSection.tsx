import { useRef, useEffect } from 'react';
import useTypingEffect from '../hooks/useTypingEffect';
import useGSAP from '../hooks/useGSAP';
import { useGSAPContext } from '../hooks/useGSAP';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import { animateHeroSection } from '../utils/gsapAnimations';

const HeroSection = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  
  const typingText = useTypingEffect([
    "Full Stack Developer", 
    "UI/UX Enthusiast", 
    "Problem Solver"
  ], 100);

  // Use GSAP for the main hero animation
  const heroRef = useGSAP(animateHeroSection, []);

  // Use GSAP React for additional animations
  useGSAPContext((context) => {
    // Image floating animation
    context.add(() => {
      gsap.to('.hero-image-container', {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    // Glowing gradient animation
    context.add(() => {
      gsap.to('.hero-gradient', {
        opacity: 0.5,
        scale: 1.05,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Social icons animation
    if (socialIconsRef.current) {
      const icons = socialIconsRef.current.querySelectorAll('.social-icon');
      gsap.fromTo(
        icons,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          delay: 1.5,
        }
      );
    }
  }, []);

  // Framer Motion variants for compatibility with existing animations
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="home" className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden">
      <ParticleBackground id="hero-particles" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={heroRef}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          <div className="w-full md:w-1/2 space-y-6">
            <p className="hero-greeting text-lg text-primary-600 dark:text-primary-400 font-medium">
              Hello, I'm
            </p>
            <h1 className="hero-name text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-gray-900 dark:text-white">
              <span className="inline-block">John</span>
              <span className="text-primary-600 dark:text-primary-400 ml-2 inline-block">Doe</span>
            </h1>
            <div className="hero-title h-8 sm:h-12">
              <p className="text-xl sm:text-2xl md:text-3xl font-poppins text-secondary-600 dark:text-secondary-400">
                <span ref={typingRef}>{typingText}</span>
                <span 
                  ref={cursorRef} 
                  className="typing-cursor inline-block w-[3px] h-[1em] bg-current ml-0.5 animate-blink"
                  style={{animation: 'blink 1s step-end infinite'}}
                />
              </p>
            </div>
            <p className="hero-description text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              I build exceptional digital experiences that are functional, beautiful, and accessible. Let's create something amazing together!
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a 
                href="#contact" 
                className="hero-button px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300 shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Get in Touch
              </motion.a>
              <motion.a 
                href="#projects" 
                className="hero-button px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View My Work
              </motion.a>
            </div>
            <div
              ref={socialIconsRef}
              className="flex gap-5 mt-8"
            >
              {['linkedin', 'github', 'twitter', 'dribbble'].map((social) => (
                <motion.a
                  key={social}
                  href={`#${social}`}
                  className="social-icon w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <i className={`fab fa-${social}`}></i>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="hero-image-container w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="hero-gradient absolute -inset-1 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur opacity-30 dark:opacity-40"></div>
              <motion.div
                className="relative overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
                variants={imageVariants}
                whileHover="hover"
              >
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="John Doe" 
                  className="w-64 h-64 sm:w-80 sm:h-80 object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
