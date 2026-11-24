import { useRef } from 'react';
import { SAMPLES } from '../content.js';
import { passProgress, reduced, useScrollFrame } from '../hooks.js';
import { Label, Reel } from './ui.jsx';

/* A row of reels that glides sideways as you scroll down the page. Inside each frame the video also slides a
   little (picture-in-frame parallax), and every card sits on its own pastel. */
export default function Samples() {
  const sec = useRef(null), row = useRef(null);
  useScrollFrame((vh, vw) => {
    if (!sec.current || !row.current || reduced()) return;
    const p = passProgress(sec.current, vh);
    const travel = Math.max(0, row.current.scrollWidth - vw);
    row.current.style.transform = `translate3d(${(-p * travel * 1.15 + travel * 0.08).toFixed(1)}px,0,0)`;
  });
  return (
    <section ref={sec} id="samples" className="relative overflow-hidden py-28 sm:py-36">
      <div className="gutter mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8">
        <div className="flex max-w-xl flex-col gap-5">
          <Label dot="#ffbf9f" className="reveal">Samples</Label>
          <h2 className="h2 reveal">Every business gets <em>its own look.</em></h2>
        </div>
        <p className="lede reveal max-w-sm">Two styles: <span className="text-ink">photo-based</span>, made from your own photos, and <span className="text-ink">animated</span>, for when you don’t have many.</p>
      </div>

      <div className="mt-16 sm:mt-20">
        <ul ref={row} className="flex w-max gap-4 px-[max(20px,6vw)] will-change-transform sm:gap-6">
          {SAMPLES.map((s, i) => (
            <li key={s.id} className={`tone-${s.tone} w-[64vw] max-w-[17rem] shrink-0 rounded-[2rem] bg-[var(--tone)] p-2.5 sm:w-[17rem] ${i % 2 ? 'sm:mt-16' : ''}`}>
              <Reel id={s.id} label={`Concept sample for ${s.name}`} inner={0.08} rounded="rounded-[1.5rem]" />
              <div className="flex items-end justify-between gap-3 px-2.5 pb-1.5 pt-4">
                <div>
                  <p className="font-display text-lg leading-tight tracking-tight">{s.name}</p>
                  <p className="mt-0.5 text-sm text-ink-2">{s.kind}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-2">{s.style}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="gutter mx-auto mt-12 max-w-6xl text-sm text-ink-3">Concept samples made for fictional businesses.</p>
    </section>
  );
}
