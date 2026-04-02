import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches Intersection Observer to all
 * `.reveal`, `.reveal-left` elements within the component.
 *
 * Usage: call `useScrollReveal()` once in each section component.
 * Pass dependencies for elements fetched asynchronously.
 */
const useScrollReveal = (threshold = 0.12, dependencies = []) => {
    const observerRef = useRef(null);

    useEffect(() => {
        // Disconnect previous observer if any
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Once revealed, stop observing
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin: '0px 0px -40px 0px' }
        );

        // Uses a timeout to ensure DOM has updated before observing elements.
        const timeoutId = setTimeout(() => {
            const elements = document.querySelectorAll('.reveal, .reveal-left');
            elements.forEach((el) => {
                if (!el.classList.contains('visible')) {
                    observerRef.current?.observe(el);
                }
            });
        }, 50);

        return () => {
            clearTimeout(timeoutId);
            observerRef.current?.disconnect();
        };
    }, [threshold, ...dependencies]); // Re-run effect when dependencies change
};

export default useScrollReveal;
