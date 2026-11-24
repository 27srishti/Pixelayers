import { useEffect, useRef } from 'react';
import { SAMPLES } from '../content.js';
import { clamp, pinProgress, reduced, useScrollFrame } from '../hooks.js';
import { Reel, SectionHead } from './ui.jsx';

/* The samples gallery: the section pins, and scrolling down glides a row of large reels sideways. The reel nearest
   the middle of the screen comes into focus (full size, full colour); the others sit back slightly. */

export default function Samples() {
  const sec = useRef(null), row = useRef(null), view = useRef(null), cards = useRef([]), bar = useRef(null);

  // the section is as tall as the row is wide, so vertical scroll maps 1:1 to sideways travel
  useEffect(() => {
    const size = () => {
      if (!sec.current || !row.current || !view.current) return;
      const travel = Math.max(0, row.current.scrollWidth - view.current.clientWidth);
      sec.current.style.height = `${window.innerHeight + travel}px`;
    };
    size();
    window.addEventListener('resize', size);
    return () => window.removeEventListener('resize', size);
  }, []);

  useScrollFrame((vh, vw) => {
    if (!sec.current || !row.current || !view.current) return;
    const p = pinProgress(sec.current, vh);
    const travel = Math.max(0, row.current.scrollWidth - view.current.clientWidth);
    row.current.style.transform = `translate3d(${(-p * travel).toFixed(1)}px,0,0)`;
    if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.04, p)})`;
    if (reduced()) return;
    cards.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const k = clamp(1 - Math.abs(r.left + r.width / 2 - vw / 2) / (vw * 0.55));
      el.style.transform = `scale(${(0.9 + k * 0.1).toFixed(3)})`;
      el.style.opacity = String(0.55 + k * 0.45);
    });
  });

  return (
    <section ref={sec} id="samples" data-tone="stone" className="relative h-[300svh]">
      <div className="sticky top-0 h-svh min-h-[640px] px-2 pb-2 pt-[4.5rem] sm:px-3 sm:pb-3">
      <div className="room flex h-full flex-col justify-center gap-8 overflow-hidden sm:gap-10">
        <SectionHead className="gutter w-full" tag={<><span className="text-ink">03</span><span className="h-3 w-px bg-ink/20" />Samples</>} title={<>Every business gets <span className="soft">its own look.</span></>}
          note="Two styles: photo-based, made from your own photos, and animated, for when you don’t have many." />
        <div ref={view} className="relative">
          <ul ref={row} className="flex w-max items-end gap-5 px-[calc(50vw-min(31vw,14.5svh)-0.5rem)] will-change-transform sm:gap-8">
            {SAMPLES.map((s, i) => (
              <li key={s.id} ref={(el) => (cards.current[i] = el)} className="w-[min(62vw,29svh)] shrink-0 origin-bottom will-change-transform">
                <div className="glass rounded-[1.9rem] p-2">
                  <Reel id={s.id} label={`Concept sample for ${s.name}`} rounded="rounded-[1.4rem]" />
                </div>
                <div className="px-1 pt-4">
                  <p className="font-medium tracking-[-0.02em]">{s.name}</p>
                  <p className="mt-0.5 text-sm text-ink-3">{s.kind} · {s.style}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="gutter wrap flex w-full items-center gap-4">
          <span className="relative h-px flex-1 bg-line"><span ref={bar} className="absolute inset-0 origin-left scale-x-[0.04] bg-ink" /></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Concept samples · fictional businesses</span>
        </div>
      </div>
      </div>
    </section>
  );
}
