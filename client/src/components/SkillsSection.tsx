import { useEffect, useRef } from 'react';
import { frontendSkills, backendSkills, otherSkills } from '../data/skillsData';

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate skill bars when section becomes visible
          const skillBars = document.querySelectorAll('.skill-progress');
          skillBars.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            if (width) {
              (bar as HTMLElement).style.width = `${width}%`;
            }
          });
        }
      });
    }, { threshold: 0.15 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 dark:text-white">My Skills</h2>
          <div className="mt-3 w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I've worked with a variety of technologies throughout my career. Here's an overview of my technical skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-xl font-poppins font-semibold mb-6 text-gray-900 dark:text-white">Frontend Development</h3>
            
            <div className="space-y-6">
              {frontendSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="skill-bar relative h-2.5 bg-[#e0e7ff] dark:bg-gray-700 rounded-md overflow-hidden">
                    <div 
                      className="skill-progress absolute top-0 left-0 h-full rounded-md bg-primary-500 w-0 transition-all duration-1000"
                      data-width={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-poppins font-semibold mb-6 text-gray-900 dark:text-white">Backend Development</h3>
            
            <div className="space-y-6">
              {backendSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="skill-bar relative h-2.5 bg-[#e0e7ff] dark:bg-gray-700 rounded-md overflow-hidden">
                    <div 
                      className="skill-progress absolute top-0 left-0 h-full rounded-md bg-secondary-500 w-0 transition-all duration-1000"
                      data-width={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-poppins font-semibold mb-8 text-gray-900 dark:text-white text-center">Other Technical Skills</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
              {otherSkills.map((skill, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center"
                >
                  <i className={`${skill.icon} text-3xl text-primary-600 dark:text-primary-400 mb-3`}></i>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
