import { useEffect, useRef } from 'react';
import useTypingEffect from '../hooks/useTypingEffect';

const HeroSection = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  
  const typingText = useTypingEffect([
    "Full Stack Developer", 
    "UI/UX Enthusiast", 
    "Problem Solver"
  ], 100);

  return (
    <section id="home" className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-6" data-aos="fade-up">
            <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">Hello, I'm</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-gray-900 dark:text-white">
              John Doe
            </h1>
            <div className="h-8 sm:h-12">
              <p className="text-xl sm:text-2xl md:text-3xl font-poppins text-secondary-600 dark:text-secondary-400">
                <span ref={typingRef}>{typingText}</span>
                <span 
                  ref={cursorRef} 
                  className="typing-cursor inline-block w-[3px] h-[1em] bg-current ml-0.5 animate-blink"
                  style={{animation: 'blink 1s step-end infinite'}}
                />
              </p>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              I build exceptional digital experiences that are functional, beautiful, and accessible. Let's create something amazing together!
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </a>
              <a 
                href="#projects" 
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl"
              >
                View My Work
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur opacity-30 dark:opacity-40"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="John Doe" 
                className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
