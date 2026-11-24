import { useRef } from 'react';
import { reduced, useScrollFrame } from '../hooks.js';

/* The page background: soft, grainy light behind everything. Sections name a tone with data-tone: the hero is warm
   cream, How it works is soft lilac, and everything after is a quiet neutral stone. The fields cross-fade between
   tones and sway slowly with scroll. The grain is drawn over the whole page in index.css. */
const PALETTES = {
  cream: { base: '#f3f1ec', c: ['#ece3d6', '#f3e3d8', '#ebe8e0', '#efe6da'] },
  lilac: { base: '#f2f0f8', c: ['#ddd3fa', '#e9e2fb', '#d6dcf8', '#f0dcef'] },
  stone: { base: '#f1efeb', c: ['#e7e3dc', '#ece8e1', '#e4e1db', '#efebe4'] },
};
const FIELDS = [
  { cls: 'left-[-15%] top-[-20%] h-[75vh] w-[60vw]', sway: [6, 4], phase: 0 },
  { cls: 'right-[-15%] top-[15%] h-[80vh] w-[55vw]', sway: [-5, 6], phase: 1.7 },
  { cls: 'left-[10%] bottom-[-25%] h-[70vh] w-[55vw]', sway: [4, -5], phase: 3.1 },
  { cls: 'right-[5%] bottom-[-30%] h-[65vh] w-[45vw]', sway: [-4, -4], phase: 4.4 },
];

export default function Backdrop() {
  const root = useRef(null), els = useRef([]), tone = useRef('cream');
  useScrollFrame((vh) => {
    // which section is in the middle of the screen?
    let next = tone.current;
    document.querySelectorAll('[data-tone]').forEach((sec) => {
      const r = sec.getBoundingClientRect();
      if (r.top <= vh * 0.55 && r.bottom > vh * 0.55) next = sec.dataset.tone;
    });
    if (next !== tone.current && PALETTES[next]) {
      tone.current = next;
      const pal = PALETTES[next];
      if (root.current) root.current.style.backgroundColor = pal.base;
      els.current.forEach((el, i) => el && (el.style.backgroundColor = pal.c[i]));
    }
    if (reduced()) return;
    const t = window.scrollY / 1400;
    els.current.forEach((el, i) => {
      if (!el) return;
      const f = FIELDS[i];
      el.style.transform = `translate3d(${(Math.sin(t + f.phase) * f.sway[0]).toFixed(2)}vw,${(Math.cos(t * 0.8 + f.phase) * f.sway[1]).toFixed(2)}vh,0)`;
    });
  });
  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-[background-color] duration-[1400ms]" style={{ backgroundColor: PALETTES.cream.base }}>
      {FIELDS.map((f, i) => (
        <div key={i} ref={(el) => (els.current[i] = el)} className={`absolute rounded-full opacity-95 blur-[110px] transition-[background-color] duration-[1400ms] will-change-transform ${f.cls}`} style={{ backgroundColor: PALETTES.cream.c[i] }} />
      ))}
    </div>
  );
}
