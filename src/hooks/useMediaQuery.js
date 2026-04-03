import { useState, useEffect } from 'react';

/**
 * useMediaQuery — A hook to detect screen size and media query matches.
 * 
 * @param {string} query - The CSS media query to match.
 * @returns {boolean} - Whether the query matches.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}

/**
 * useIsMobile — A specialized hook for detecting mobile devices.
 * 
 * @returns {boolean} - Whether the device is mobile (width < 768px).
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * useIsTouchDevice — A hook to detect if the device has touch capabilities.
 * 
 * @returns {boolean} - True if touch is supported.
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}
