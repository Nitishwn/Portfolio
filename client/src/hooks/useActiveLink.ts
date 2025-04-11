import { useState, useEffect } from 'react';
import { getCurrentSection } from '../utils/scrollUtils';

/**
 * Custom hook to track the active navigation link based on scroll position
 */
const useActiveLink = () => {
  const [activeLink, setActiveLink] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const current = getCurrentSection();
      if (current && current !== activeLink) {
        setActiveLink(current);
      }
    };

    // Set the initial active link on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeLink]);

  return { activeLink, setActiveLink };
};

export default useActiveLink;
