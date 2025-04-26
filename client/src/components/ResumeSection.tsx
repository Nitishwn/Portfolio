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
              <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-2">Nitish Wani</h3>
              <p className="text-gray-600 dark:text-gray-400">Aspiring Data Scientist </p>
              <div className="flex justify-center mt-3 space-x-4">
                <a href="mailto:nitishw94@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="https://www.linkedin.com/in/nitish-wni/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/Nitishwn" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h4 className="text-lg font-poppins font-semibold text-gray-900 dark:text-white mb-4">Professional Summary</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
              I’m a passionate and project-driven tech enthusiast with a strong foundation in Data Science, AI, and Machine Learning, currently working on real-world projects that merge intelligent algorithms with IoT, computer vision, and scientific data. </p>
            </div>
            
            
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h4 className="text-lg font-poppins font-semibold text-gray-900 dark:text-white mb-4">Education</h4>
              <div>
                <div className="flex flex-wrap justify-between mb-1">
                  <h5 className="text-primary-600 dark:text-primary-400 font-medium">Bachelor of Technology in Electronics and Communication Engineering with specialization in AIML</h5>
                  <span className="text-gray-600 dark:text-gray-400">2022 - 2026</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">To be updated after an year as curently I am Clueless  </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300"> 2026-
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
