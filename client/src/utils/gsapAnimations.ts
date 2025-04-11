import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// Main hero section animations
export const animateHeroSection = (container: HTMLElement | null) => {
  if (!container) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    container.querySelector('.hero-greeting'),
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 }
  )
    .fromTo(
      container.querySelector('.hero-name'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      container.querySelector('.hero-title'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo(
      container.querySelector('.hero-description'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      container.querySelectorAll('.hero-button'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 },
      '-=0.4'
    )
    .fromTo(
      container.querySelector('.hero-image-container'),
      { opacity: 0, x: 30, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 1 },
      '-=1.2'
    )
    .fromTo(
      container.querySelectorAll('.hero-social'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      '-=0.5'
    );

  return tl;
};

// About section animations with ScrollTrigger
export const animateAboutSection = (container: HTMLElement | null) => {
  if (!container) return;

  // Heading animation
  gsap.fromTo(
    container.querySelector('.about-heading'),
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // Text animation
  gsap.fromTo(
    container.querySelector('.about-text'),
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // Timeline animation
  gsap.fromTo(
    container.querySelectorAll('.timeline-item'),
    { opacity: 0, x: -30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container.querySelector('.timeline'),
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Projects section animations
export const animateProjectsSection = (container: HTMLElement | null) => {
  if (!container) return;

  // Heading animation
  gsap.fromTo(
    container.querySelector('.projects-heading'),
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // Project cards animation with stagger
  gsap.fromTo(
    container.querySelectorAll('.project-card'),
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container.querySelector('.projects-grid'),
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Skills section animations
export const animateSkillsSection = (container: HTMLElement | null) => {
  if (!container) return;

  // Heading animation
  gsap.fromTo(
    container.querySelector('.skills-heading'),
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // Skill bars animation
  gsap.fromTo(
    container.querySelectorAll('.skill-bar'),
    { width: 0 },
    {
      width: 'var(--skill-level)',
      duration: 1.2,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('.skills-list'),
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // Skill items animation
  gsap.fromTo(
    container.querySelectorAll('.skill-item'),
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.querySelector('.skills-list'),
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Contact section animations
export const animateContactSection = (container: HTMLElement | null) => {
  if (!container) return;

  // Heading animation
  gsap.fromTo(
    container.querySelector('.contact-heading'),
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // Contact info animation
  gsap.fromTo(
    container.querySelectorAll('.contact-info-item'),
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: container.querySelector('.contact-info'),
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // Form fields animation
  gsap.fromTo(
    container.querySelectorAll('.form-field'),
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.querySelector('.contact-form'),
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // Submit button animation
  gsap.fromTo(
    container.querySelector('.submit-button'),
    { opacity: 0, y: 20, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay: 0.4,
      scrollTrigger: {
        trigger: container.querySelector('.contact-form'),
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Text animation (typing effect)
export const animateText = (element: HTMLElement | null, text: string, duration: number = 2) => {
  if (!element) return;
  
  gsap.to(element, {
    duration,
    text: { value: text },
    ease: 'none',
  });
};

// Scroll to section animation
export const scrollToSection = (target: string, duration: number = 1) => {
  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: 80,
    },
    ease: 'power3.inOut',
  });
};

// Header animation on scroll
export const animateHeader = (header: HTMLElement | null) => {
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'header-scrolled', targets: header },
  });
};

// Parallax background effect
export const createParallaxEffect = (elements: NodeListOf<Element> | null) => {
  if (!elements || elements.length === 0) return;

  elements.forEach((element) => {
    const speed = element.getAttribute('data-speed') || '0.1';
    
    gsap.to(element, {
      y: `+=${window.innerHeight * parseFloat(speed)}`,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
};

// Reveal animation for any element
export const revealElement = (element: HTMLElement | string, start: string = 'top 80%') => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Export default animation config
export default {
  animateHeroSection,
  animateAboutSection,
  animateProjectsSection,
  animateSkillsSection,
  animateContactSection,
  animateText,
  scrollToSection,
  animateHeader,
  createParallaxEffect,
  revealElement,
};