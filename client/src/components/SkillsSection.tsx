import { useRef } from 'react';
import { frontendSkills, backendSkills, otherSkills } from '../data/skillsData';
import { motion, useInView, Variants } from 'framer-motion';

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const skillCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const skillBarVariants: Variants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: `${i}%`,
      transition: {
        duration: 1.5,
        ease: [0.165, 0.84, 0.44, 1]
      }
    })
  };
  
  const otherSkillVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: {
      y: -8,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const pulseVariants: Variants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My Skills
          </motion.h2>
          <motion.div 
            className="mt-3 w-16 h-1 bg-primary-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
          <motion.p 
            className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            I've worked with a variety of technologies throughout my career. Here's an overview of my technical skills.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            variants={skillCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            whileHover="hover"
          >
            <motion.h3 
              className="text-xl font-poppins font-semibold mb-6 text-gray-900 dark:text-white"
              variants={titleVariants}
            >
              Frontend Development
            </motion.h3>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {frontendSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div 
                    className="flex justify-between items-center mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.span 
                      className="text-gray-700 dark:text-gray-300 font-medium"
                      whileHover={{ color: "#6366f1", x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {skill.name}
                    </motion.span>
                    <motion.span 
                      className="text-gray-600 dark:text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </motion.div>
                  <div className="relative h-2.5 bg-[#e0e7ff] dark:bg-gray-700 rounded-md overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full rounded-md bg-primary-500"
                      initial={{ width: 0 }}
                      variants={skillBarVariants}
                      custom={skill.level}
                      animate={isInView ? "visible" : "hidden"}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            variants={skillCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            whileHover="hover"
            transition={{ delay: 0.2 }}
          >
            <motion.h3 
              className="text-xl font-poppins font-semibold mb-6 text-gray-900 dark:text-white"
              variants={titleVariants}
            >
              Backend Development
            </motion.h3>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {backendSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div 
                    className="flex justify-between items-center mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.span 
                      className="text-gray-700 dark:text-gray-300 font-medium"
                      whileHover={{ color: "#8b5cf6", x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {skill.name}
                    </motion.span>
                    <motion.span 
                      className="text-gray-600 dark:text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </motion.div>
                  <div className="relative h-2.5 bg-[#e0e7ff] dark:bg-gray-700 rounded-md overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full rounded-md bg-secondary-500"
                      initial={{ width: 0 }}
                      variants={skillBarVariants}
                      custom={skill.level}
                      animate={isInView ? "visible" : "hidden"}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            variants={skillCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.h3 
              className="text-xl font-poppins font-semibold mb-8 text-gray-900 dark:text-white text-center"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Other Technical Skills
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {otherSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center"
                  variants={otherSkillVariants}
                  custom={index}
                  whileHover="hover"
                  transition={{ delay: 0.1 * index }}
                >
                  <motion.div
                    variants={pulseVariants}
                    initial="initial"
                    animate="pulse"
                  >
                    <motion.i 
                      className={`${skill.icon} text-3xl text-primary-600 dark:text-primary-400 mb-3`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, 10, -10, 0],
                        transition: {
                          duration: 0.5
                        }
                      }}
                    ></motion.i>
                  </motion.div>
                  <motion.span 
                    className="text-gray-800 dark:text-gray-200 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    {skill.name}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
