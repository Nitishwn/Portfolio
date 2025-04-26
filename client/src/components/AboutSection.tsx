import { motion, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGSAP from '../hooks/useGSAP';
import { useGSAPContext } from '../hooks/useGSAP';
import { animateAboutSection } from '../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const aboutSectionRef = useGSAP(animateAboutSection, []);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Enhanced GSAP animations
  useGSAPContext((context) => {
    // Timeline animation with GSAP
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      const timelineDots = timelineRef.current.querySelectorAll('.timeline-dot');
      const timelineLines = timelineRef.current.querySelectorAll('.timeline-line');
      
      context.add(() => {
        // Create a ScrollTrigger for the timeline
        gsap.from(timelineItems, {
          x: -50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 70%',
            toggleActions: 'play none none reverse',
          }
        });
        
        // Animate timeline dots
        gsap.from(timelineDots, {
          scale: 0,
          stagger: 0.2,
          duration: 0.5,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 70%',
            toggleActions: 'play none none reverse',
          }
        });
        
        // Animate timeline connecting lines
        gsap.from(timelineLines, {
          scaleY: 0,
          transformOrigin: 'top center',
          stagger: 0.2,
          duration: 0.8,
          delay: 0.7,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 70%',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }
    
    // Stats counter animation
    if (statsRef.current) {
      const statValues = statsRef.current.querySelectorAll('.stat-value');
      
      context.add(() => {
        statValues.forEach((stat) => {
          const value = stat.getAttribute('data-value') || '';
          const numValue = parseInt(value.replace(/\D/g, ''));
          
          gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: 0.2,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            onUpdate: function() {
              // @ts-ignore
              stat.textContent = Math.ceil(this.targets()[0].textContent) + (value.includes('+') ? '+' : '');
            }
          });
        });
      });
    }
  }, []);
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

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    }
  };

  const statVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: custom * 0.2
      }
    }),
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: 0.4
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  const timelineItemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.6 + (custom * 0.2)
      }
    })
  };

  const dotVariants: Variants = {
    hidden: { scale: 0 },
    visible: (custom: number) => ({
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        delay: 0.8 + (custom * 0.2)
      }
    }),
    hover: {
      scale: 1.5,
      backgroundColor: "#4f46e5", // Darker primary color
      transition: { duration: 0.3 }
    }
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: (custom: number) => ({
      scaleY: 1,
      transition: {
        duration: 0.5,
        delay: 1 + (custom * 0.2)
      }
    })
  };

  return (
    <section id="about" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
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
            About Me
          </motion.h2>
          <motion.div 
            className="mt-3 w-16 h-1 bg-primary-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={textVariants}
            >
              I’m a passionate and project-driven tech enthusiast with a strong foundation in Data Science, AI, and Machine Learning, currently working on real-world projects that merge intelligent algorithms with IoT, computer vision, and scientific data. I believe in the power of technology to transform and improve the lives of people around the world.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={textVariants}
            >
              I am currently persuing  Electronics and Communication Engineering with specialization in Artificial Intelligence and Machine Learning, where I developed a strong foundation in ML Algorithms, Python programming and AI fundamentals. Since then, I've worked with various technologies and frameworks, constantly expanding my skill set and staying up-to-date with the latest industry trends.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={textVariants}
            >
              When I'm not coding, you'll find me exploring music, experimenting with my start-up driven mind, or contributing to open-source projects. I'm a lifelong learner who's always eager to take on new challenges and collaborate with like-minded individuals.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-6 items-center mt-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { value: "0", label: "Years Experience", index: 0 },
                { value: "10+", label: "Projects Completed", index: 1 },
                { value: "20+", label: "Happy Birthdays done", index: 2 }
              ].map((stat) => (
                <motion.div 
                  key={stat.label}
                  className="flex flex-col"
                  variants={statVariants}
                  custom={stat.index}
                  whileHover="hover"
                >
                  <motion.span 
                    className="text-4xl font-bold text-primary-600 dark:text-primary-400"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + (stat.index * 0.2), duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.span>
                  <motion.span 
                    className="text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + (stat.index * 0.2), duration: 0.5 }}
                  >
                    {stat.label}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.3 }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <motion.h3 
                className="text-xl font-poppins font-semibold mb-6 text-gray-900 dark:text-white"
                variants={titleVariants}
              >
                Education & Experience
              </motion.h3>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  
                  {
                    title: "Research Intern at MIT-WPU",
                    period: "2024 - 2025",
                    description: "Worked on automating hydroponic system and analysing the Plant Diseases in the hydroponic plants.",
                    index: 1
                  },
                  {
                    title: "BTech ECE AIML",
                    period: "MIT World Peace University, 2022 - 2026",
                    description: "Specialized in AIML with a focus on Data Science and ML techniques.",
                    index: 2,
                    isLast: true
                  }
                ].map((item, index) => (
                  <motion.div key={index} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-primary-500"
                        variants={dotVariants}
                        custom={item.index}
                        whileHover="hover"
                      ></motion.div>
                      {!item.isLast && (
                        <motion.div 
                          className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 ml-1.5"
                          variants={lineVariants}
                          custom={item.index}
                        ></motion.div>
                      )}
                    </div>
                    <motion.div 
                      className="ml-6"
                      variants={timelineItemVariants}
                      custom={item.index}
                    >
                      <motion.h4 
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + (item.index * 0.2) }}
                      >
                        {item.title}
                      </motion.h4>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + (item.index * 0.2) }}
                      >
                        {item.period}
                      </motion.p>
                      <motion.p 
                        className="mt-2 text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 + (item.index * 0.2) }}
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;