import { useEffect, useRef } from 'react';
import { LINKS, media } from '../content.js';
import { useInView } from '../hooks.js';

export const Arrow = () => (
  <svg className="arrow h-[1em] w-[1em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export function SendMessage({ className = '', size = 'md', label = 'Send message' }) {
  const pad = size === 'lg' ? 'px-6 py-3.5 text-base' : size === 'sm' ? 'px-4 py-2 text-sm' : 'px-5 py-3 text-[15px]';
  return (
    <a href={LINKS.message} target="_blank" rel="noreferrer" className={`btn btn-primary ${pad} ${className}`}>
      {label} <Arrow />
    </a>
  );
}

export function SectionTitle({ eyebrow, children, sub, center = false }) {
  return (
    <div className={`reveal flex max-w-2xl flex-col gap-4 ${center ? 'mx-auto items-center text-center' : ''}`}>
      {eyebrow && <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-royal">{eyebrow}</p>}
      <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-balance">{children}</h2>
      {sub && <p className="max-w-xl text-[17px] leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}

/** A 9:16 video in a plain rounded frame. Plays (muted, looping) only while it is on screen. */
export function Reel({ id, label, className = '', play = true, tag = true }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const video = useRef(null);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && play) v.play().catch(() => {});
    else v.pause();
  }, [inView, play]);
  return (
    <div ref={ref} className={`relative aspect-[9/16] overflow-hidden rounded-2xl border border-line bg-sand shadow-[0_24px_48px_-28px_rgba(11,31,68,0.4)] ${className}`}>
      <video ref={video} className="absolute inset-0 h-full w-full object-cover" src={media(`${id}.mp4`)} poster={media(`${id}.jpg`)}
        muted loop playsInline preload="metadata" aria-label={label} />
      {tag && (
        <span className="absolute left-2.5 top-2.5 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink backdrop-blur">
          Concept sample
        </span>
      )}
    </div>
  );
}
