import { useRef } from 'react';
import { reduced, useScrollFrame } from '../hooks.js';

/* Soft pastel light behind the whole page. Each glow sits on its own depth and drifts up at its own speed as
   you scroll, so the background feels deep without ever drawing attention. */
const GLOWS = [
  { top: -15, left: -10, size: 62, color: '#e4dcff', f: 0.22 },
  { top: 10, left: 55, size: 58, color: '#ffe1d1', f: 0.38 },
  { top: 95, left: -20, size: 70, color: '#d6f1e4', f: 0.3 },
  { top: 150, left: 50, size: 64, color: '#dcebff', f: 0.42 },
  { top: 240, left: -5, size: 66, color: '#fff0c2', f: 0.34 },
  { top: 300, left: 45, size: 72, color: '#e4dcff', f: 0.4 },
  { top: 400, left: -15, size: 64, color: '#ffe1d1', f: 0.36 },
  { top: 470, left: 50, size: 70, color: '#d6f1e4', f: 0.44 },
  { top: 560, left: 0, size: 70, color: '#dcebff', f: 0.4 },
];

export default function Ambient() {
  const els = useRef([]);
  useScrollFrame((vh) => {
    if (reduced()) return;
    const y = window.scrollY;
    els.current.forEach((el, i) => {
      if (!el) return;
      const g = GLOWS[i];
      const sway = Math.sin(y / 900 + i) * 4;
      el.style.transform = `translate3d(${sway}vw,${(-y * g.f).toFixed(1)}px,0)`;
      // skip painting glows far off screen
      const top = (g.top / 100) * vh - y * g.f;
      el.style.visibility = top > vh * 1.4 || top + (g.size / 100) * window.innerWidth < -vh * 0.4 ? 'hidden' : 'visible';
    });
  });
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {GLOWS.map((g, i) => (
        <div key={i} ref={(el) => (els.current[i] = el)} className="absolute rounded-full will-change-transform"
          style={{ top: `${g.top}vh`, left: `${g.left}vw`, width: `${g.size}vw`, height: `${g.size}vw`, background: `radial-gradient(closest-side, ${g.color}, ${g.color}00)` }} />
      ))}
    </div>
  );
}
