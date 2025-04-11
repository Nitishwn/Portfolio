const ResumeSection = () => {
  const handleDownload = () => {
    // In a real implementation, this would point to an actual PDF file
    alert('Resume download would start in a production environment.');
  };

  return (
    <section id="resume" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 dark:text-white">My Resume</h2>
          <div className="mt-3 w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Want to know more about my professional experience and qualifications? Check out my full resume.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700" data-aos="fade-up" data-aos-delay="100">
          <div className="p-6 sm:p-10">
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-2">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-400">Full Stack Web Developer</p>
              <div className="flex justify-center mt-3 space-x-4">
                <a href="mailto:johndoe@example.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <i className="fas fa-phone"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h4 className="text-lg font-poppins font-semibold text-gray-900 dark:text-white mb-4">Professional Summary</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Full Stack Developer with 5+ years of experience designing and developing user-focused web applications from concept to completion. Proficient in modern JavaScript frameworks, responsive design, and server-side technologies. Strong problem-solver with a passion for creating intuitive, efficient digital experiences.
              </p>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h4 className="text-lg font-poppins font-semibold text-gray-900 dark:text-white mb-4">Professional Experience</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap justify-between mb-1">
                    <h5 className="text-primary-600 dark:text-primary-400 font-medium">Senior Developer</h5>
                    <span className="text-gray-600 dark:text-gray-400">2020 - Present</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">TechSolutions Inc.</p>
                  <ul className="mt-2 text-gray-700 dark:text-gray-300 space-y-1 list-disc pl-5">
                    <li>Led development of enterprise-level SaaS applications used by 50,000+ users</li>
                    <li>Mentored junior developers and conducted code reviews to ensure quality</li>
                    <li>Reduced application load time by 40% through performance optimizations</li>
                    <li>Implemented CI/CD pipelines that reduced deployment time by 60%</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex flex-wrap justify-between mb-1">
                    <h5 className="text-primary-600 dark:text-primary-400 font-medium">Web Developer</h5>
                    <span className="text-gray-600 dark:text-gray-400">2018 - 2020</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Digital Crafts LLC</p>
                  <ul className="mt-2 text-gray-700 dark:text-gray-300 space-y-1 list-disc pl-5">
                    <li>Developed responsive websites and web applications for diverse clients</li>
                    <li>Collaborated with designers to implement pixel-perfect user interfaces</li>
                    <li>Created custom CMS solutions for content management</li>
                    <li>Integrated third-party APIs and payment gateways</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h4 className="text-lg font-poppins font-semibold text-gray-900 dark:text-white mb-4">Education</h4>
              <div>
                <div className="flex flex-wrap justify-between mb-1">
                  <h5 className="text-primary-600 dark:text-primary-400 font-medium">Bachelor of Science in Computer Science</h5>
                  <span className="text-gray-600 dark:text-gray-400">2014 - 2018</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">University of Technology</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  GPA: 3.8/4.0 • Dean's List • Specialized in Software Engineering
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleDownload}
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300 shadow-lg"
              >
                <i className="fas fa-download mr-2"></i> Download Full Resume (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
