import { useRef } from 'react';
import { SAMPLES } from '../content.js';
import { Reel, SectionTitle } from './ui.jsx';

export default function Samples() {
  const row = useRef(null);
  const scroll = (dir) => row.current?.scrollBy({ left: dir * Math.min(row.current.clientWidth * 0.8, 600), behavior: 'smooth' });
  return (
    <section id="samples" className="py-24 sm:py-32">
      <div className="gutter mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
        <SectionTitle eyebrow="Samples" sub="Two styles: photo-based, made from your own photos, and animated, for when you don’t have many.">
          Every business gets its own look.
        </SectionTitle>
        <div className="reveal flex gap-2">
          {[-1, 1].map((d) => (
            <button key={d} type="button" onClick={() => scroll(d)} aria-label={d < 0 ? 'Previous samples' : 'More samples'} className="btn btn-ghost h-10 w-10">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: d < 0 ? 'scaleX(-1)' : 'none' }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          ))}
        </div>
      </div>
      <div ref={row} className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-[max(20px,calc((100vw-72rem)/2+20px))] pb-6">
        {SAMPLES.map((s, i) => (
          <figure key={s.id} className="reveal group w-[58vw] max-w-[13.2rem] shrink-0 snap-start" style={{ '--d': `${i * 80}ms` }}>
            <Reel id={s.id} label={`Concept sample for ${s.name}`} className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5" />
            <figcaption className="mt-4 flex flex-col gap-0.5">
              <span className="font-semibold leading-tight">{s.name}</span>
              <span className="text-sm text-muted">{s.kind} · {s.style}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="gutter mx-auto max-w-6xl text-sm text-muted">Concept samples made for fictional businesses.</p>
    </section>
  );
}
