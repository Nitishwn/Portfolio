const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 dark:text-white">About Me</h2>
          <div className="mt-3 w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience creating beautiful, functional, and user-centered digital experiences. I believe in the power of technology to transform and improve the lives of people around the world.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I graduated with a Bachelor's degree in Computer Science from the University of Technology, where I developed a strong foundation in software development principles and practices. Since then, I've worked with various technologies and frameworks, constantly expanding my skill set and staying up-to-date with the latest industry trends.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring hiking trails, experimenting with new recipes in the kitchen, or contributing to open-source projects. I'm a lifelong learner who's always eager to take on new challenges and collaborate with like-minded individuals.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center mt-4">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">5+</span>
                <span className="text-gray-600 dark:text-gray-400">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">50+</span>
                <span className="text-gray-600 dark:text-gray-400">Projects Completed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">20+</span>
                <span className="text-gray-600 dark:text-gray-400">Happy Clients</span>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-8" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-poppins font-semibold mb-6 text-gray-900 dark:text-white">Education & Experience</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 ml-1.5"></div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Senior Developer at TechSolutions Inc.</h4>
                    <p className="text-gray-600 dark:text-gray-400">2020 - Present</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">Leading development of enterprise-level web applications and mentoring junior developers.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 ml-1.5"></div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Web Developer at Digital Crafts LLC</h4>
                    <p className="text-gray-600 dark:text-gray-400">2018 - 2020</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">Worked on client projects focusing on responsive design and user experience.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">BSc in Computer Science</h4>
                    <p className="text-gray-600 dark:text-gray-400">University of Technology, 2014 - 2018</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">Specialized in software engineering with a focus on web technologies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
