import { useState } from 'react';
import { projectsData } from '../data/projectsData';

const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const handleSeeMore = () => {
    setVisibleProjects(projectsData.length);
  };

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 dark:text-white">My Projects</h2>
          <div className="mt-3 w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works. Each project presented unique challenges that helped me grow as a developer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <div 
              key={index}
              className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={100 + index * 50}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-poppins font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <a 
                    href={project.demoLink} 
                    className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe mr-2"></i> Demo
                  </a>
                  <a 
                    href={project.codeLink} 
                    className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github mr-2"></i> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {visibleProjects < projectsData.length && (
          <div className="mt-12 text-center" data-aos="fade-up">
            <button 
              onClick={handleSeeMore}
              className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition duration-300 shadow-md"
            >
              See More Projects <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
