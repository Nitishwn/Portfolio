import { useState, useEffect } from 'react';

/**
 * Custom hook for creating a typing effect
 * @param phrases Array of strings to type
 * @param typingSpeed Speed of typing in milliseconds
 * @param deletingSpeed Speed of deleting in milliseconds
 * @param delayAfterPhrase Delay after typing a complete phrase
 * @param delayBeforePhrase Delay before typing the next phrase
 */
const useTypingEffect = (
  phrases: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  delayAfterPhrase: number = 1500,
  delayBeforePhrase: number = 500
): string => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Deleting text
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        // Typing text
        setText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }
      
      // Handle state changes
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing current phrase
        setIsDeleting(true);
        clearTimeout(timer);
        setTimeout(() => {}, delayAfterPhrase);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting current phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        clearTimeout(timer);
        setTimeout(() => {}, delayBeforePhrase);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases, deletingSpeed, typingSpeed, delayAfterPhrase, delayBeforePhrase]);

  return text;
};

export default useTypingEffect;
