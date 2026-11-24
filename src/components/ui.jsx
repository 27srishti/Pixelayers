import { useEffect, useRef } from 'react';
import { LINKS, media, still } from '../content.js';
import { reduced, useInView, useScrollFrame } from '../hooks.js';

export const Arrow = () => (
  <svg className="arrow h-[1em] w-[1em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/** Button that leans gently toward the pointer. */
export function Magnetic({ as: Tag = 'a', className = '', children, strength = 0.22, ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    if (reduced() || e.pointerType !== 'mouse') return;
    const el = ref.current, r = el.getBoundingClientRect();
    el.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength * 1.4}px, 0)`;
  };
  const leave = () => { ref.current.style.transform = ''; };
  return <Tag ref={ref} onPointerMove={move} onPointerLeave={leave} className={`magnetic ${className}`} {...rest}>{children}</Tag>;
}

export function SendMessage({ className = '', size = 'md', label = 'Send message', tone = 'ink' }) {
  const pad = size === 'lg' ? 'h-14 px-7 text-[16px]' : size === 'sm' ? 'h-10 px-4.5 text-[14px]' : 'h-12 px-6 text-[15px]';
  return (
    <Magnetic href={LINKS.message} target="_blank" rel="noreferrer" className={`btn btn-${tone} ${pad} ${className}`}>
      {label} <Arrow />
    </Magnetic>
  );
}

export function Label({ children, className = '', dot }) {
  return <p className={`label ${className}`} style={dot ? { '--dot': dot } : undefined}>{children}</p>;
}

/** Wraps children in a layer that drifts at its own speed.
 *  speed > 0 lags behind the scroll (feels further away); speed < 0 runs ahead (feels closer). */
export function Parallax({ speed = 0.1, axis = 'y', as: Tag = 'div', className = '', innerClassName = '', children, style, ...rest }) {
  const outer = useRef(null), inner = useRef(null);
  useScrollFrame((vh) => {
    const o = outer.current, i = inner.current;
    if (!o || !i || reduced()) return;
    const r = o.getBoundingClientRect();
    if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return;
    const d = (r.top + r.height / 2 - vh / 2) * -speed;
    i.style.transform = axis === 'x' ? `translate3d(${d.toFixed(1)}px,0,0)` : `translate3d(0,${d.toFixed(1)}px,0)`;
  });
  return (
    <Tag ref={outer} className={className} style={style} {...rest}>
      <div ref={inner} className={`will-change-transform ${innerClassName}`}>{children}</div>
    </Tag>
  );
}

/** A 9:16 video. Plays (muted, looping) only while on screen. `inner` adds a picture-in-frame parallax:
 *  the video is taller than its frame and slides inside it as the page scrolls. */
export function Reel({ id, label, className = '', play = true, tag = false, inner = 0, rounded = 'rounded-[1.6rem]' }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const video = useRef(null);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && play) v.play().catch(() => {});
    else v.pause();
  }, [inView, play]);
  useScrollFrame((vh) => {
    if (!inner || !ref.current || !video.current || reduced()) return;
    const r = ref.current.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const t = (r.top + r.height / 2 - vh / 2) / vh; // −0.5…0.5 across the screen
    video.current.style.transform = `translate3d(0,${(t * inner * 100).toFixed(2)}%,0) scale(${1 + inner * 1.2})`;
  });
  return (
    <div ref={ref} className={`reel relative aspect-[9/16] overflow-hidden ${rounded} ${className}`}>
      <video ref={video} className="absolute inset-0 h-full w-full object-cover will-change-transform" src={`${media(`${id}.mp4`)}#t=2.5`} poster={still(id)}
        muted loop playsInline preload="metadata" aria-label={label} />
      {tag && <span className="reel-tag">Concept sample</span>}
    </div>
  );
}
