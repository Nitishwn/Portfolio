import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP as useGSAPReact, type ContextFunc } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define a type for animation functions
export type AnimationFunction = (
  element: HTMLElement | null, 
  options?: Record<string, any>
) => gsap.core.Timeline | void;

/**
 * A custom hook to handle GSAP animations with automatic cleanup
 * @param animationFunction The animation function to execute
 * @param dependencies Dependencies array for the useEffect hook
 * @param options Additional options to pass to the animation function
 * @returns A ref object to attach to the DOM element
 */
export const useGSAP = (
  animationFunction: AnimationFunction,
  dependencies: any[] = [],
  options: Record<string, any> = {}
): RefObject<HTMLDivElement> => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only run animations on client-side
    if (typeof window === 'undefined') return;
    
    const element = elementRef.current;
    let animation: gsap.core.Timeline | void;
    
    // Apply animation and store any timeline returned
    if (element) {
      animation = animationFunction(element, options);
    }
    
    // Cleanup function to kill animations when component unmounts
    return () => {
      if (animation && 'kill' in animation) {
        animation.kill();
      }
      
      // Clear ScrollTrigger instances created for this element
      if (element) {
        gsap.killTweensOf(element);
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === element) {
            trigger.kill();
          }
        });
      }
    };
  }, dependencies);
  
  return elementRef;
};

/**
 * Hook that uses @gsap/react's useGSAP for better integration with React
 */
export const useGSAPContext = (
  callback: ContextFunc,
  dependencies?: any[],
  scopeId?: string
) => {
  return useGSAPReact(callback, { scope: scopeId, dependencies });
};

export default useGSAP;