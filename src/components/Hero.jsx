import { useRef } from 'react';
import { BUSINESS_TYPES, HERO } from '../content.js';
import { clamp, pinProgress, range, reduced, useScrollFrame } from '../hooks.js';
import Stream from './Stream.jsx';
import { SendMessage, Tag } from './ui.jsx';

/* Centred headline over a stream of the sample videos (see Stream.jsx). The stage stays pinned for a short while:
   scrolling flies the camera forward through the stream while the words lift away, then the page moves on. */
export default function Hero() {
  const sec = useRef(null), copy = useRef(null), foot = useRef(null);
  const progress = useRef(0);
  useScrollFrame((vh) => {
    if (!sec.current) return;
    const p = pinProgress(sec.current, vh);
    progress.current = p;
    if (reduced()) return;
    if (copy.current) {
      copy.current.style.transform = `translate3d(0,${(-p * vh * 0.28).toFixed(1)}px,0) scale(${(1 - p * 0.06).toFixed(3)})`;
      copy.current.style.opacity = String(clamp(1 - range(p, 0.25, 0.85)));
    }
    if (foot.current) foot.current.style.opacity = String(1 - range(p, 0, 0.2));
  });

  return (
    <section id="top" data-tone="cream">
      <div ref={sec} className="relative h-[165svh]">
        <div className="sticky top-0 h-svh min-h-[620px] overflow-hidden">
          <Stream className="animate-rise absolute inset-0 h-full w-full" fly={() => progress.current} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f2f0eb]/70 to-transparent" />
          {/* quiet zone behind the words */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_40%_at_50%_50%,rgb(244_242_238/0.92)_0%,rgb(244_242_238/0.75)_50%,rgb(244_242_238/0)_100%)] sm:bg-[radial-gradient(ellipse_42%_38%_at_50%_48%,rgb(244_242_238/0.9)_0%,rgb(244_242_238/0.7)_48%,rgb(244_242_238/0)_100%)]" />

          <div ref={copy} className="gutter relative z-10 flex h-full flex-col items-center justify-center pt-16 text-center will-change-transform">
            <span className="animate-rise frosted inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] text-ink-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2fb37a]" />{HERO.badge}
            </span>
            <h1 className="display mt-7 max-w-[15ch] text-[clamp(3.1rem,7.4vw,7.2rem)]">
              <span className="animate-rise block" style={{ animationDelay: '80ms' }}>{HERO.title[0]} {HERO.title[1]}</span>
              <span className="animate-rise block text-ink/35" style={{ animationDelay: '180ms' }}>{HERO.title[2]}</span>
            </h1>
            <p className="lede animate-rise mt-7 max-w-[34rem]" style={{ animationDelay: '300ms' }}>{HERO.sub}</p>
            <div className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '400ms' }}>
              <SendMessage size="lg" label="Get a free preview" />
              <a href="#samples" className="btn btn-line h-14 px-7 text-[16px]">See samples</a>
            </div>
          </div>

          <div ref={foot} className="gutter absolute inset-x-0 bottom-5 z-10 flex items-center justify-between">
            <Tag>Concept samples · fictional businesses</Tag>
            <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 sm:flex">
              Scroll <span className="relative h-6 w-px overflow-hidden bg-ink/15"><span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_1.8s_ease-in-out_infinite] bg-ink/60" /></span>
            </span>
          </div>
        </div>
      </div>

      {/* business types */}
      <div className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center" aria-hidden={k === 1}>
              {[...BUSINESS_TYPES, ...BUSINESS_TYPES].map((b, i) => (
                <span key={i} className="flex items-center text-[clamp(1.4rem,2.4vw,2rem)] font-medium tracking-[-0.03em] text-ink/30">
                  <span className="px-8">{b}</span><span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{'@keyframes cue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}'}</style>
    </section>
  );
}
