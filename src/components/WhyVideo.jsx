import { useRef } from 'react';
import { BEFORE_AFTER, still } from '../content.js';
import { ease, lerp, pinProgress, range, useScrollFrame } from '../hooks.js';
import { Check, Reel, Tag } from './ui.jsx';

/* The problem and the fix on one phone. Scrolling wipes a shaky handheld clip away to reveal an animated promo;
   the phone steadies itself and the panel warms from grey to a soft pastel. */
const GREY = [228, 226, 220], WARM = [232, 225, 253];

export default function WhyVideo() {
  const sec = useRef(null), stage = useRef(null), phone = useRef(null), after = useRef(null), seam = useRef(null);
  const before = useRef(null), fix = useRef(null), bNotes = useRef([]), aNotes = useRef([]);

  useScrollFrame((vh) => {
    if (!sec.current) return;
    const p = pinProgress(sec.current, vh);
    const w = ease(range(p, 0.15, 0.75));
    if (stage.current) stage.current.style.background = `rgb(${GREY.map((g, i) => Math.round(lerp(g, WARM[i], w))).join(',')})`;
    if (phone.current) phone.current.style.transform = `rotate(${lerp(-4, 0, w).toFixed(2)}deg) translate3d(0,${lerp(12, 0, w)}px,0) scale(${lerp(0.96, 1, w)})`;
    if (after.current) after.current.style.clipPath = `inset(${((1 - w) * 100).toFixed(2)}% 0 0 0)`;
    if (seam.current) {
      seam.current.style.top = `${(1 - w) * 100}%`;
      seam.current.style.opacity = w > 0.01 && w < 0.99 ? 1 : 0;
    }
    if (before.current) before.current.style.opacity = String(lerp(1, 0.3, w));
    if (fix.current) fix.current.style.opacity = String(lerp(0.3, 1, w));
    bNotes.current.forEach((el, i) => el && (el.style.opacity = String(1 - range(w, 0.1 + i * 0.1, 0.4 + i * 0.1))));
    aNotes.current.forEach((el, i) => el && (el.style.opacity = String(range(w, 0.5 + i * 0.12, 0.8 + i * 0.1))));
  });

  const { before: B, after: A } = BEFORE_AFTER;
  return (
    <section ref={sec} id="why" className="relative h-[260svh]">
      <div className="sticky top-0 h-svh px-2 pb-2 pt-[4.5rem] sm:px-3 sm:pb-3">
        <div ref={stage} className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]" style={{ background: `rgb(${GREY.join(',')})` }}>
          <div className="gutter grid w-full max-w-7xl items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
            <div ref={before} className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
              <Tag>{B.label}</Tag>
              <h2 className="h2 !text-[clamp(1.8rem,3.6vw,3.4rem)]">{B.title}</h2>
              <ul className="hidden flex-col gap-2.5 lg:flex">
                {B.notes.map((n, i) => (
                  <li key={n} ref={(el) => (bNotes.current[i] = el)} className="flex items-center gap-3 text-ink-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-ink/15 text-[10px] text-ink-3">✕</span>{n}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-[min(44vw,14.5rem)] sm:w-[15.5rem] lg:w-[17rem]">
              <div ref={phone} className="phone will-change-transform">
                <div className="phone-screen">
                  <div className="absolute inset-0">
                    <img src={still('kitchen-bath')} alt="" className="handheld absolute inset-0 h-full w-full object-cover object-[50%_80%]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.45))]" />
                    <div className="absolute left-3 right-3 top-4 flex items-center justify-between font-mono text-[10px] text-white/90">
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 animate-pulse rounded-full bg-[#ff4d4d]" />00:14</span>
                      <span>IMG_4821.MOV</span>
                    </div>
                  </div>
                  <div ref={after} className="absolute inset-0" style={{ clipPath: 'inset(100% 0 0 0)' }}>
                    <Reel id="kitchen" label="Concept sample: animated promo for a remodeling company" rounded="rounded-none" className="!aspect-auto h-full" />
                  </div>
                  <div ref={seam} className="pointer-events-none absolute inset-x-0 z-10 h-0 opacity-0" style={{ top: '100%' }}>
                    <div className="absolute inset-x-0 -top-px h-0.5 bg-white shadow-[0_0_18px_3px_rgb(255_255_255/0.8)]" />
                  </div>
                </div>
              </div>
            </div>

            <div ref={fix} className="flex flex-col items-center gap-5 text-center opacity-30 lg:items-start lg:text-left">
              <Tag>{A.label}</Tag>
              <h2 className="h2 !text-[clamp(1.8rem,3.6vw,3.4rem)]">{A.title}</h2>
              <ul className="hidden flex-col gap-2.5 lg:flex">
                {A.notes.map((n, i) => (
                  <li key={n} ref={(el) => (aNotes.current[i] = el)} className="flex items-center gap-3 opacity-0">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white"><Check className="h-3 w-3" /></span>{n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
