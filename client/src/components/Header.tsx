import { useState, useEffect } from 'react';
import useThemeToggle from '../hooks/useThemeToggle';
import useActiveLink from '../hooks/useActiveLink';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeToggle();
  const { activeLink, setActiveLink } = useActiveLink();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveLink(id);
    closeMobileMenu();
  };
  
  const headerVariants: Variants = {
    initial: {
      y: -100
    },
    animate: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };
  
  const navItemVariants: Variants = {
    initial: { y: -20, opacity: 0 },
    animate: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: custom * 0.1
      }
    }),
    hover: {
      y: -3,
      color: "var(--primary-600)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    },
    active: {
      color: "var(--primary-600)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  const logoVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    }
  };
  
  const themeButtonVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        delay: 0.6
      }
    },
    hover: {
      scale: 1.1,
      backgroundColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };
  
  const iconVariants: Variants = {
    initial: { opacity: 0, rotate: -90 },
    animate: {
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    exit: {
      opacity: 0,
      rotate: 90,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };
  
  const mobileMenuVariants: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const mobileNavItemVariants: Variants = {
    closed: {
      y: -10,
      opacity: 0
    },
    open: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: custom * 0.05
      }
    })
  };
  
  const mobileButtonVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        delay: 0.7
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.header 
      className={`fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.a 
            href="#home" 
            className="text-primary-600 dark:text-primary-400 font-poppins font-bold text-xl sm:text-2xl"
            onClick={() => handleNavClick('home')}
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            Nitish<span className="text-secondary-600 dark:text-secondary-400"> Wani</span>
          </motion.a>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={() => handleNavClick(link.id)}
                className={`nav-link text-gray-700 dark:text-gray-300 font-medium transition duration-300 ${
                  activeLink === link.id ? 'active-nav-link relative after:content-[""] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-0.5 after:bg-current' : ''
                }`}
                variants={navItemVariants}
                custom={index}
                initial="initial"
                animate={activeLink === link.id ? ["animate", "active"] : "animate"}
                whileHover="hover"
              >
                {link.label}
                {activeLink === link.id && (
                  <motion.span
                    className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary-500 dark:bg-primary-400"
                    layoutId="activeNavIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </motion.a>
            ))}
          </nav>
          
          {/* Theme Toggle Button */}
          <motion.button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition duration-300 ml-2"
            aria-label="Toggle theme"
            variants={themeButtonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.svg 
                  key="moon" 
                  className="w-5 h-5 text-gray-100" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </motion.svg>
              ) : (
                <motion.svg 
                  key="sun" 
                  className="w-5 h-5 text-gray-800" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Mobile Menu Button */}
          <motion.button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
            aria-label="Toggle mobile menu"
            variants={mobileButtonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                rotate: mobileMenuOpen ? 90 : 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
            >
              {mobileMenuOpen ? (
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container mx-auto px-4 py-3 space-y-3">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.id} 
                  href={`#${link.id}`} 
                  onClick={() => handleNavClick(link.id)}
                  className={`mobile-nav-link block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition duration-300 ${
                    activeLink === link.id ? 'text-primary-600 dark:text-primary-400' : ''
                  }`}
                  variants={mobileNavItemVariants}
                  custom={index}
                  whileHover={{ x: 10, transition: { type: "spring", stiffness: 400 } }}
                >
                  {link.label}
                  {activeLink === link.id && (
                    <motion.span 
                      className="inline-block ml-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      •
                    </motion.span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
