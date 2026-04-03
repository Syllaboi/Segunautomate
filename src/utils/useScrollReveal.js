import { useEffect, useRef } from 'react';

// Singleton variables to share observer across all component instances
let globalObserver = null;
const observedElements = new WeakSet();

const getObserver = (threshold) => {
    if (!globalObserver) {
        globalObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        globalObserver?.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin: '0px 0px -40px 0px' }
        );
    }
    return globalObserver;
};

/**
 * useScrollReveal — attaches Intersection Observer to all
 * `.reveal`, `.reveal-left` elements within the component.
 *
 * It uses a global observer to prevent severe scroll lag.
 */
const useScrollReveal = (threshold = 0.12, dependencies = []) => {
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = getObserver(threshold);

        const timeoutId = setTimeout(() => {
            const elements = document.querySelectorAll('.reveal, .reveal-left');
            
            elements.forEach((el) => {
                // If it isn't visible yet and we haven't observed it
                if (!el.classList.contains('visible') && !observedElements.has(el)) {
                    observerRef.current?.observe(el);
                    observedElements.add(el);
                }
            });
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [threshold, ...dependencies]); // Re-run effect when dependencies change
};

export default useScrollReveal;

