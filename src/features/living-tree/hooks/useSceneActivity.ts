import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
const query = '(prefers-reduced-motion: reduce)';
const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
};
export function useSceneActivity(forceReduced = false) {
    const preferredReduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
    const reduced = forceReduced || preferredReduced;
    const container = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);
    const [foreground, setForeground] = useState(() => !document.hidden);
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        if (container.current)
            observer.observe(container.current);
        const onVisibility = () => setForeground(!document.hidden);
        document.addEventListener('visibilitychange', onVisibility);
        return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
    }, []);
    return { container, moving: !reduced && !paused && visible && foreground, reduced, paused, setPaused };
}
