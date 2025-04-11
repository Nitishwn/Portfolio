import { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { motion } from 'framer-motion';

const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSeeMore = () => {
    setVisibleProjects(projectsData.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: { 
      y: -15,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.15,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: "var(--primary-600)",
      color: "#FFFFFF",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  const chipVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    }
  };

  const linkVariants = {
    hover: { 
      y: -3,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 overflow-hidden">
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
            My Projects
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
            Here are some of my recent works. Each project presented unique challenges that helped me grow as a developer.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <motion.div 
              key={index}
              className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
              variants={projectVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              layout
            >
              <div className="h-48 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                  initial={{ scale: 1.05 }}
                  animate={hoveredIndex === index ? { scale: 1.15 } : { scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <motion.div 
                className="p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <motion.h3 
                  className="text-xl font-poppins font-semibold text-gray-900 dark:text-white mb-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {project.description}
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-xs font-medium rounded-full"
                      variants={chipVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: 0.1 * techIndex }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div 
                  className="flex space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <motion.a 
                    href={project.demoLink} 
                    className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <i className="fas fa-globe mr-2"></i> Demo
                  </motion.a>
                  <motion.a 
                    href={project.codeLink} 
                    className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <i className="fab fa-github mr-2"></i> Code
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {visibleProjects < projectsData.length && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button 
              onClick={handleSeeMore}
              className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg shadow-md"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span>See More Projects</motion.span> 
              <motion.i 
                className="fas fa-arrow-right ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              ></motion.i>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
