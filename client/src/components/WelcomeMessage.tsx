import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAPContext } from '../hooks/useGSAP';

interface WelcomeMessageProps {
  className?: string;
  isReturningVisitor?: boolean;
}

const WelcomeMessage = ({ className = '', isReturningVisitor = false }: WelcomeMessageProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation with GSAP
  useGSAPContext((context) => {
    context.add(() => {
      if (message) {
        gsap.fromTo(
          '.welcome-message-text',
          { 
            opacity: 0,
            y: -20 
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2
          }
        );

        // Animate the close button
        gsap.fromTo(
          '.welcome-close-btn',
          { scale: 0 },
          { 
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            delay: 1
          }
        );
      }
    });
  }, [message]);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/welcome?returning=${isReturningVisitor}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch welcome message');
        }
        
        const data = await response.json();
        setMessage(data.message);
        setError(null);
      } catch (err) {
        console.error('Error fetching welcome message:', err);
        setError('Failed to load welcome message');
        setMessage('Welcome to my portfolio!'); // Fallback message
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWelcomeMessage();
    
    // Auto-hide the message after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [isReturningVisitor]);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  // If there's no message or component is not visible, don't render
  if (!message || !isVisible) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-primary-500 animate-pulse"></div>
                    <div className="w-4 h-4 rounded-full bg-primary-500 animate-pulse delay-150"></div>
                    <div className="w-4 h-4 rounded-full bg-primary-500 animate-pulse delay-300"></div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Personalizing welcome message...</span>
                  </div>
                ) : (
                  <p className="welcome-message-text text-gray-700 dark:text-gray-200 font-medium">
                    {message}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="welcome-close-btn text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Close welcome message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessage;