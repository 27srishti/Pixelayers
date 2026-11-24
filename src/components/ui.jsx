import { useEffect, useRef } from 'react';
import { LINKS, media, still } from '../content.js';
import { reduced, useInView, useScrollFrame } from '../hooks.js';

export const Arrow = () => (
  <svg className="arrow h-[0.95em] w-[0.95em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const Check = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/** Button that leans gently toward the pointer. */
export function Magnetic({ as: Tag = 'a', className = '', children, strength = 0.2, ...rest }) {
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

export const Tag = ({ children, dark = false, className = '' }) => <span className={`tag ${dark ? 'tag-dark' : ''} ${className}`}>{children}</span>;

/** Section opener: two columns framed by hairlines. Title on the left, a short note (and optional extra) on the right. */
export function SectionHead({ tag, title, note, children, className = '' }) {
  return (
    <div className={`wrap grid lg:grid-cols-2 ${className}`}>
      <div className="flex flex-col items-start gap-6 border-line pb-8 lg:border-l lg:px-10 lg:pb-0">
        {tag && <Tag className="reveal">{tag}</Tag>}
        <h2 className="h2 reveal">{title}</h2>
      </div>
      <div className="flex flex-col items-start justify-end gap-6 border-line lg:border-x lg:px-10">
        {note && <p className="lede reveal max-w-md">{note}</p>}
        {children}
      </div>
    </div>
  );
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

/** A 9:16 video. Plays (muted, looping) only while on screen. */
export function Reel({ id, label, className = '', play = true, rounded = 'rounded-[1.5rem]' }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const video = useRef(null);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && play) v.play().catch(() => {});
    else v.pause();
  }, [inView, play]);
  return (
    <div ref={ref} className={`reel relative aspect-[9/16] overflow-hidden ${rounded} ${className}`}>
      <video ref={video} className="absolute inset-0 h-full w-full object-cover" src={`${media(`${id}.mp4`)}#t=2.5`} poster={still(id)}
        muted loop playsInline preload="metadata" aria-label={label} />
    </div>
  );
}
