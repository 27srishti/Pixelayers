import { useRef } from 'react';
import { range, useScrollFrame } from '../hooks.js';
import { Label } from './ui.jsx';

/* A sentence that fills itself in, word by word, as it scrolls up the screen. Business types get a pastel chip. */
const TEXT = [
  ['Cafés,', 'peach'], ['salons,', 'lilac'], ['boutiques,', 'mint'], ['bakeries,', 'butter'], ['med', 'sky'], ['spas,', 'sky'],
  ['gyms,', 'peach'], ['florists', 'mint'], ['and'], ['local'], ['services.'],
  ['If'], ['you'], ['have'], ['a'], ['website,'], ['we'], ['can'], ['make'], ['your'], ['promo.', 'em'],
];

export default function Statement() {
  const sec = useRef(null), words = useRef([]);
  useScrollFrame((vh) => {
    if (!sec.current) return;
    const r = sec.current.getBoundingClientRect();
    const p = range(vh * 0.85 - r.top, 0, r.height * 0.9);
    const lit = Math.round(p * TEXT.length);
    words.current.forEach((el, i) => { if (el) el.dataset.on = i < lit; });
  });
  return (
    <section ref={sec} className="gutter py-24 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Label dot="#96d8b8" className="reveal">Made for small businesses</Label>
        <p className="mt-8 font-display text-[clamp(2rem,4.8vw,4.2rem)] font-light leading-[1.18] tracking-[-0.03em]">
          {TEXT.map(([w, tone], i) => (
            <span key={i}>
              <span ref={(el) => (words.current[i] = el)} data-on="false"
                className={`scrub-word ${tone && tone !== 'em' ? `tone-${tone} rounded-[0.4em] px-[0.18em] transition-[background-color,color] data-[on=true]:bg-[var(--tone)]` : ''} ${tone === 'em' ? 'italic' : ''}`}>{w}</span>{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
