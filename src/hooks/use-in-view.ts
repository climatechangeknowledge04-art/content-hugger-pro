import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is on screen.
 * `near` turns true once the element approaches the viewport (mount heavy work),
 * `visible` follows live visibility (pause render loops when off screen).
 */
export function useInView<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nearIO = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setNear(true);
      },
      { rootMargin },
    );
    const visibleIO = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting));

    nearIO.observe(el);
    visibleIO.observe(el);
    return () => {
      nearIO.disconnect();
      visibleIO.disconnect();
    };
  }, [rootMargin]);

  return { ref, near, visible };
}
