"use-client"
import { useEffect, useRef } from 'react';

const useScrollPosition = (key: string, delay: number = 100) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const savedScrollPosition = sessionStorage.getItem(key);

        if (container && savedScrollPosition) {
            const restoreScroll = () => {
                container.scrollTop = parseInt(savedScrollPosition, 10);
            };

            requestAnimationFrame(() => {
                setTimeout(restoreScroll, delay);
            });
        }
    }, [key, delay]);

    useEffect(() => {
        const container = containerRef.current;
        const saveScrollPosition = () => {
            if (container) {
                sessionStorage.setItem(key, container.scrollTop.toString());
            }
        };

        if (container) {
            container.addEventListener('scroll', saveScrollPosition);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', saveScrollPosition);
            }
        };
    }, [key]);
    return containerRef;
};

export default useScrollPosition;
