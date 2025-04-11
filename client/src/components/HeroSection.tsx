import { useRef } from 'react';
import useTypingEffect from '../hooks/useTypingEffect';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  
  const typingText = useTypingEffect([
    "Full Stack Developer", 
    "UI/UX Enthusiast", 
    "Problem Solver"
  ], 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 150,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const floatingAnimation = {
    y: ["-5px", "5px", "-5px"],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  const gradientAnimation = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden">
      <ParticleBackground id="hero-particles" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full md:w-1/2 space-y-6">
            <motion.p 
              className="text-lg text-primary-600 dark:text-primary-400 font-medium"
              variants={itemVariants}
            >
              Hello, I'm
            </motion.p>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                John 
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-primary-600 dark:text-primary-400 ml-2"
              >
                Doe
              </motion.span>
            </motion.h1>
            <motion.div 
              className="h-8 sm:h-12"
              variants={itemVariants}
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-poppins text-secondary-600 dark:text-secondary-400">
                <span ref={typingRef}>{typingText}</span>
                <span 
                  ref={cursorRef} 
                  className="typing-cursor inline-block w-[3px] h-[1em] bg-current ml-0.5 animate-blink"
                  style={{animation: 'blink 1s step-end infinite'}}
                />
              </p>
            </motion.div>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
              variants={itemVariants}
            >
              I build exceptional digital experiences that are functional, beautiful, and accessible. Let's create something amazing together!
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 pt-2"
              variants={itemVariants}
            >
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300 shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Get in Touch
              </motion.a>
              <motion.a 
                href="#projects" 
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View My Work
              </motion.a>
            </motion.div>
            <motion.div
              className="flex gap-5 mt-8"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {['linkedin', 'github', 'twitter', 'dribbble'].map((social, index) => (
                <motion.a
                  key={social}
                  href={`#${social}`}
                  className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <i className={`fab fa-${social}`}></i>
                </motion.a>
              ))}
            </motion.div>
          </div>
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            variants={itemVariants}
            animate={floatingAnimation}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur opacity-30 dark:opacity-40"
                initial="initial"
                animate="animate"
                variants={gradientAnimation}
              ></motion.div>
              <motion.div
                className="relative overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <motion.img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="John Doe" 
                  className="w-64 h-64 sm:w-80 sm:h-80 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
