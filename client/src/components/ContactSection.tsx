import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setFormErrors({ name: false, email: false, message: false });
    
    // Validate form
    let isValid = true;
    if (formData.name.trim() === '') {
      setFormErrors(prev => ({ ...prev, name: true }));
      isValid = false;
    }
    
    if (!validateEmail(formData.email)) {
      setFormErrors(prev => ({ ...prev, email: true }));
      isValid = false;
    }
    
    if (formData.message.trim() === '') {
      setFormErrors(prev => ({ ...prev, message: true }));
      isValid = false;
    }
    
    if (isValid) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you soon.",
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const contactCardVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: custom * 0.1
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const formContainerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
        staggerChildren: 0.07
      }
    }
  };

  const formFieldVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: custom * 0.1
      }
    }),
    focus: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#4f46e5", // Darker primary color
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    },
    disabled: {
      opacity: 0.7,
      scale: 1
    }
  };

  const socialIconVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.3 + custom * 0.1
      }
    }),
    hover: {
      scale: 1.15,
      backgroundColor: "var(--primary-200)",
      color: "var(--primary-700)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    }
  };

  const successMessageVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconContainerVariants: Variants = {
    hover: {
      backgroundColor: "var(--primary-200)",
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
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
            Get In Touch
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
            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                icon: "fas fa-envelope",
                title: "Email",
                content: <a href="mailto:johndoe@example.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">johndoe@example.com</a>,
                index: 0
              },
              {
                icon: "fas fa-phone-alt",
                title: "Phone",
                content: <a href="tel:+1234567890" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">+1 (234) 567-890</a>,
                index: 1
              },
              {
                icon: "fas fa-map-marker-alt",
                title: "Location",
                content: "San Francisco, California",
                index: 2
              }
            ].map((item) => (
              <motion.div 
                key={item.title}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                variants={contactCardVariants}
                custom={item.index}
                whileHover="hover"
              >
                <div className="flex">
                  <motion.div 
                    className="flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.6 + item.index * 0.1 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center"
                      variants={iconContainerVariants}
                      whileHover="hover"
                    >
                      <motion.i 
                        className={`${item.icon} text-primary-600 dark:text-primary-400 text-xl`}
                        variants={iconVariants}
                        initial="initial"
                        whileHover="hover"
                      ></motion.i>
                    </motion.div>
                  </motion.div>
                  <div className="ml-4">
                    <motion.h3 
                      className="text-lg font-medium text-gray-900 dark:text-white"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + item.index * 0.1 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      className="mt-1 text-gray-600 dark:text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + item.index * 0.1 }}
                    >
                      {item.content}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              variants={contactCardVariants}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <motion.h3 
                className="text-lg font-medium text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                Connect With Me
              </motion.h3>
              <div className="flex space-x-5">
                {['linkedin-in', 'github', 'twitter', 'dribbble', 'medium-m'].map((icon, index) => (
                  <motion.a 
                    key={icon}
                    href={`https://${icon === 'linkedin-in' ? 'linkedin' : icon === 'medium-m' ? 'medium' : icon}.com`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 transition-colors"
                    variants={socialIconVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.h3 
              className="text-xl font-poppins font-semibold text-gray-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              Send Me a Message
            </motion.h3>
            
            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                variants={formFieldVariants}
                custom={0}
                animate={focusedField === 'name' ? 'focus' : 'visible'}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <motion.input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${formErrors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'} rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition duration-200`} 
                  placeholder="Your name" 
                  whileFocus={{ scale: 1.01 }}
                />
                <AnimatePresence>
                  {formErrors.name && (
                    <motion.span 
                      className="text-red-500 text-sm mt-1 block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Please enter your name
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div
                variants={formFieldVariants}
                custom={1}
                animate={focusedField === 'email' ? 'focus' : 'visible'}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <motion.input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${formErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'} rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition duration-200`} 
                  placeholder="your.email@example.com" 
                  whileFocus={{ scale: 1.01 }}
                />
                <AnimatePresence>
                  {formErrors.email && (
                    <motion.span 
                      className="text-red-500 text-sm mt-1 block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Please enter a valid email address
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div
                variants={formFieldVariants}
                custom={2}
                animate={focusedField === 'message' ? 'focus' : 'visible'}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <motion.textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${formErrors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'} rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition duration-200`} 
                  placeholder="Your message..." 
                  whileFocus={{ scale: 1.01 }}
                />
                <AnimatePresence>
                  {formErrors.message && (
                    <motion.span 
                      className="text-red-500 text-sm mt-1 block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Please enter your message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div
                variants={formFieldVariants}
                custom={3}
              >
                <motion.button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  disabled={isSubmitting}
                  variants={buttonVariants}
                  whileHover={isSubmitting ? "disabled" : "hover"}
                  whileTap={isSubmitting ? "disabled" : "tap"}
                >
                  {isSubmitting ? (
                    <motion.span 
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <motion.span
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        Sending...
                      </motion.span>
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>
            </form>
            
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg"
                  variants={successMessageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex">
                    <motion.div 
                      className="flex-shrink-0"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <div className="ml-3">
                      <motion.p 
                        className="text-sm font-medium text-green-800"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Message sent successfully! I'll get back to you soon.
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
