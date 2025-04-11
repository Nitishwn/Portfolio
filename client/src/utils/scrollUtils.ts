/**
 * Smoothly scrolls to a specified element by ID
 * @param elementId The ID of the element to scroll to
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Detects which section is currently in the viewport
 * @param offset Number of pixels to offset the detection
 * @returns The ID of the current section
 */
export const getCurrentSection = (offset: number = 100): string => {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - offset) {
      currentSection = section.getAttribute('id') || '';
    }
  });

  return currentSection;
};
