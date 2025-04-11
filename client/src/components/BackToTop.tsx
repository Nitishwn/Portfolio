import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8, 
      rotate: -45 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    hover: { 
      scale: 1.15,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)", 
      backgroundColor: "#4f46e5", 
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.9,
      backgroundColor: "#3730a3" 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8, 
      rotate: 45,
      transition: { duration: 0.3 } 
    }
  };

  const arrowVariants: Variants = {
    hover: {
      y: [-4, 0, -4],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary-600 text-white rounded-full shadow-lg z-50"
          variants={buttonVariants}
          initial="hidden"
          animate={isVisible ? {
            ...buttonVariants.visible,
            ...pulseAnimation
          } : "visible"}
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          aria-label="Back to top"
        >
          <motion.i 
            className="fas fa-arrow-up"
            variants={arrowVariants}
            whileHover="hover"
          ></motion.i>
          <motion.div
            className="absolute -inset-1 rounded-full bg-primary-400 -z-10 opacity-30 blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
