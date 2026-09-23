import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  poster: string;
  /** Accessible label for the clip */
  label: string;
  className?: string;
  /** Show native controls (used for the long walkthrough) */
  controls?: boolean;
  /** Distance from the viewport at which the file starts downloading */
  rootMargin?: string;
};

/**
 * Plays at most the clips that are actually on screen.
 *
 * Every device only has a couple of hardware video decoders; mounting eight
 * looping HD clips at once pushes the browser onto the CPU and the whole page
 * stutters. This component mounts the <video> only when it comes near, plays it
 * only while visible, and pauses (releasing the decoder) the moment it leaves.
 * The poster still is painted underneath so a card is never blank.
 */
export function LazyVideo({
  src,
  poster,
  label,
  className = "",
  controls = false,
  rootMargin = "400px",
}: LazyVideoProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;

    const nearIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          nearIO.disconnect();
        }
      },
      { rootMargin },
    );
    /* "Visible" means a meaningful part of the card is on screen — a sliver
       peeking in does not deserve a decoder. */
    const playIO = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0.25 },
    );

    nearIO.observe(el);
    playIO.observe(el);
    return () => {
      nearIO.disconnect();
      playIO.disconnect();
    };
  }, [rootMargin]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible) {
      void v.play().catch(() => {});
    } else if (!v.paused) {
      v.pause();
    }
  }, [visible, mounted]);

  return (
    <div ref={holderRef} className="absolute inset-0">
      <img
        src={poster}
        alt=""
        aria-hidden
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {mounted && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          controls={controls}
          preload="metadata"
          aria-label={label}
          className={`absolute inset-0 h-full w-full object-cover ${className}`}
        />
      )}
    </div>
  );
}
