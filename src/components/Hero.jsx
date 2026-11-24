import { useRef } from 'react';
import { BUSINESS_TYPES, HERO } from '../content.js';
import { reduced, useScrollFrame } from '../hooks.js';
import Stream from './Stream.jsx';
import { SendMessage } from './ui.jsx';

/* Centred headline over a stream of frames from the sample videos flowing toward the viewer (see Stream.jsx).
   A soft cream glow behind the words keeps them easy to read; the words drift up a little slower than the page. */
export default function Hero() {
  const copy = useRef(null);
  useScrollFrame((vh) => {
    if (reduced() || !copy.current) return;
    const y = window.scrollY;
    if (y > vh * 1.2) return;
    copy.current.style.transform = `translate3d(0,${(y * 0.16).toFixed(1)}px,0)`;
  });

  return (
    <section id="top" className="relative">
      <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-20 pt-32 lg:pt-28">
        <Stream className="animate-rise absolute inset-0 h-full w-full" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_42%_at_50%_50%,#faf7f2_0%,rgb(250_247_242/0.9)_50%,rgb(250_247_242/0)_100%)] sm:bg-[radial-gradient(ellipse_44%_40%_at_50%_48%,#faf7f2_0%,rgb(250_247_242/0.88)_45%,rgb(250_247_242/0)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cream" />

        {/* words */}
        <div ref={copy} className="gutter relative z-10 flex max-w-4xl flex-col items-center text-center will-change-transform">
          <p className="animate-rise frosted inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] text-ink-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2fb37a]" />{HERO.badge}
          </p>
          <h1 className="display mt-8 text-[clamp(3rem,7.6vw,7.4rem)]">
            <span className="animate-rise block" style={{ animationDelay: '80ms' }}>{HERO.title[0]}</span>
            <span className="animate-rise block" style={{ animationDelay: '180ms' }}>{HERO.title[1]} <em className="mark [--mark:var(--color-lilac)]">{HERO.title[2]}</em></span>
          </h1>
          <p className="lede animate-rise mt-8 max-w-xl" style={{ animationDelay: '300ms' }}>{HERO.sub}</p>
          <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '400ms' }}>
            <SendMessage size="lg" label="Get a free preview" />
            <a href="#samples" className="btn btn-soft h-14 px-7 text-[16px]">See samples</a>
          </div>
          <p className="animate-rise mt-6 text-sm text-ink-3" style={{ animationDelay: '500ms' }}>No filming · No editing · No cost to see it</p>
        </div>
      </div>

      {/* business types */}
      <div className="relative overflow-hidden border-y border-line/80 bg-white/40 py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center" aria-hidden={k === 1}>
              {[...BUSINESS_TYPES, ...BUSINESS_TYPES].map((b, i) => (
                <span key={i} className="flex items-center font-display text-2xl italic font-light text-ink-2 sm:text-3xl">
                  <span className="px-7">{b}</span>
                  <span className="h-2 w-2 rounded-full" style={{ background: ['#c9bfff', '#ffbf9f', '#96d8b8', '#9cc6ff', '#ffdb73'][i % 5] }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
