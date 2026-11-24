import { useRef } from 'react';
import { PIPELINE, still } from '../content.js';
import { clamp, ease, easeInOut, lerp, pinProgress, range, useScrollFrame } from '../hooks.js';
import { Check, Reel, Tag } from './ui.jsx';

/* "Send us whatever you have". The section pins. As you scroll, each input (website, Instagram, Facebook, photos,
   clips) sends a token arcing into the empty frame on the right; once everything has landed, the finished promo
   starts playing. Scrolling on reshapes the same video from vertical to square to wide. */
const { sources: SOURCES, formats: FORMATS } = PIPELINE;
const TONE = ['#d9e8ff', '#e6defd', '#d9e8ff', '#ffe1d2', '#d9f0e4'];

function Icon({ id }) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (id === 'web') return <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>;
  if (id === 'insta') return <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>;
  if (id === 'fb') return <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}><circle cx="12" cy="12" r="9" /><path d="M13.5 21v-7h2.5l.4-3h-2.9V9.3c0-.9.3-1.5 1.6-1.5h1.4V5.2a17 17 0 0 0-2.1-.1c-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.4v7" /></svg>;
  if (id === 'photos') return <img src={still('salon-bowls')} alt="" className="h-full w-full object-cover" />;
  return (
    <span className="relative block h-full w-full">
      <img src={still('kitchen-bath')} alt="" className="h-full w-full object-cover" />
      <span className="absolute inset-0 grid place-items-center bg-black/20"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
    </span>
  );
}

const IconBox = ({ i, id, className = '' }) => (
  <span className={`grid shrink-0 place-items-center overflow-hidden rounded-xl text-ink ${className}`} style={{ background: TONE[i] }}><Icon id={id} /></span>
);

function Ratio({ w, h }) {
  const s = 14 / Math.max(w, h);
  return <span className="inline-block rounded-[3px] border-[1.5px] border-current" style={{ width: w * s, height: h * s }} />;
}

export default function Pipeline() {
  const sec = useRef(null), stage = useRef(null), box = useRef(null), frame = useRef(null);
  const icons = useRef([]), cards = useRef([]), tokens = useRef([]), pills = useRef([]);
  const video = useRef(null), empty = useRef(null), count = useRef(null);

  useScrollFrame((vh) => {
    if (!sec.current || !stage.current || !box.current || !frame.current) return;
    const p = pinProgress(sec.current, vh);
    const S = stage.current.getBoundingClientRect();

    // the frame: fit the current aspect ratio into its box
    const m = range(p, 0.58, 0.96) * 2;
    const seg = Math.min(1, Math.floor(m));
    const local = easeInOut(range(m - seg, 0.25, 0.85));
    const A = FORMATS.map((f) => f.w / f.h);
    const a = lerp(A[seg], A[seg + 1], local);
    const B = box.current.getBoundingClientRect();
    const w = B.width / B.height > a ? B.height * a : B.width;
    frame.current.style.width = `${w}px`;
    frame.current.style.height = `${w / a}px`;
    const active = Math.round(seg + local);
    pills.current.forEach((el, i) => el && (el.dataset.on = i === active));

    // the tokens: icon → frame centre, along an arc
    const F = frame.current.getBoundingClientRect();
    let landed = 0;
    SOURCES.forEach((src, i) => {
      const tok = tokens.current[i];
      const ic = [icons.current[i], icons.current[SOURCES.length + i]].find((el) => el && el.offsetParent);
      if (!tok || !ic) return;
      const I = ic.getBoundingClientRect();
      const t = easeInOut(range(p, 0.05 + i * 0.08, 0.25 + i * 0.08));
      const x0 = I.left + I.width / 2 - S.left, y0 = I.top + I.height / 2 - S.top;
      const x1 = F.left + F.width / 2 - S.left, y1 = F.top + F.height / 2 - S.top;
      const arc = Math.sin(t * Math.PI);
      const x = lerp(x0, x1, t), y = lerp(y0, y1, t) - arc * 90;
      const s = 1 + arc * 0.25 - (t > 0.85 ? (t - 0.85) * 4 : 0);
      tok.style.transform = `translate3d(${(x - 22).toFixed(1)}px,${(y - 22).toFixed(1)}px,0) scale(${s.toFixed(3)})`;
      tok.style.opacity = t > 0.01 && t < 0.99 ? '1' : '0';
      if (t >= 0.99) landed++;
      [cards.current[i], cards.current[SOURCES.length + i]].forEach((c) => c && (c.dataset.on = t >= 0.99));
    });
    if (count.current) count.current.textContent = `${landed} of ${SOURCES.length} added`;
    const done = ease(range(p, 0.5, 0.58));
    if (video.current) video.current.style.opacity = String(done);
    if (empty.current) empty.current.style.opacity = String(clamp(1 - done));
  });

  return (
    <section ref={sec} id="send" className="relative h-[400svh]">
      <div ref={stage} className="sticky top-0 flex h-svh min-h-[680px] flex-col justify-center overflow-hidden pb-6 pt-20">
        <div className="gutter wrap grid w-full items-center gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* words + inputs */}
          <div className="flex flex-col items-start gap-5 lg:gap-6">
            <Tag>What to send</Tag>
            <h2 className="h2 !text-[clamp(2.1rem,4.4vw,4rem)]">Send us <span className="soft">whatever you have.</span></h2>
            <p className="lede hidden max-w-md sm:block">{PIPELINE.sub}</p>

            {/* large screens: a list of input cards */}
            <ul className="hidden w-full max-w-md flex-col gap-2 lg:flex">
              {SOURCES.map((s, i) => (
                <li key={s.id} ref={(el) => (cards.current[i] = el)} data-on="false"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white/60 p-2.5 pr-4 transition-colors duration-500 data-[on=true]:border-transparent data-[on=true]:bg-white">
                  <span ref={(el) => (icons.current[i] = el)}><IconBox i={i} id={s.id} className="h-11 w-11" /></span>
                  <span className="flex-1 leading-tight">
                    <span className="block font-medium">{s.label}</span>
                    <span className="font-mono text-[12px] text-ink-3">{s.detail}</span>
                  </span>
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-line text-transparent transition-colors duration-500 group-data-[on=true]:border-ink group-data-[on=true]:bg-ink group-data-[on=true]:text-white"><Check className="h-3 w-3" /></span>
                </li>
              ))}
            </ul>
            {/* phones and tablets: compact chips */}
            <ul className="flex flex-wrap gap-1.5 lg:hidden">
              {SOURCES.map((s, i) => (
                <li key={s.id} ref={(el) => (cards.current[SOURCES.length + i] = el)} data-on="false"
                  className="flex items-center gap-2 rounded-full border border-line bg-white/60 py-1 pl-1 pr-3 text-[13px] transition-colors duration-500 data-[on=true]:border-ink data-[on=true]:bg-white">
                  <span ref={(el) => (icons.current[SOURCES.length + i] = el)}><IconBox i={i} id={s.id} className="h-7 w-7 !rounded-full [&_svg]:h-4 [&_svg]:w-4" /></span>{s.label}
                </li>
              ))}
            </ul>
          </div>

          {/* the video: fills up, then reshapes */}
          <div className="flex flex-col items-center gap-5">
            <div ref={box} className="relative grid h-[min(38svh,22rem)] w-full place-items-center sm:h-[min(52svh,30rem)] lg:h-[min(60svh,34rem)]">
              <div ref={frame} className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-[0_0_0_1px_rgb(18_18_18/0.08),0_40px_90px_-40px_rgb(18_18_18/0.45)]">
                <div ref={empty} className="absolute inset-2 flex flex-col items-center justify-center gap-2 rounded-[1.1rem] border border-dashed border-ink/20 text-center">
                  <span className="text-sm font-medium">Your promo</span>
                  <span ref={count} className="font-mono text-[11px] text-ink-3">0 of 5 added</span>
                </div>
                <div ref={video} className="absolute inset-0 opacity-0">
                  <Reel id="salon" label="Concept sample: the finished promo" rounded="rounded-none" className="!aspect-auto h-full" pos="50% 62%" />
                </div>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center gap-1.5">
              {FORMATS.map((f, i) => (
                <li key={f.id} ref={(el) => (pills.current[i] = el)} data-on={i === 0}
                  className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-3 transition-colors duration-500 data-[on=true]:border-ink data-[on=true]:bg-ink data-[on=true]:text-white">
                  <Ratio w={f.w} h={f.h} /><span className="font-mono text-[11px]">{f.id}</span><span className="hidden sm:inline">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* tokens in flight */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {SOURCES.map((s, i) => (
            <span key={s.id} ref={(el) => (tokens.current[i] = el)} className="absolute left-0 top-0 opacity-0 will-change-transform">
              <IconBox i={i} id={s.id} className="h-11 w-11 shadow-[0_14px_30px_-12px_rgb(18_18_18/0.45)] ring-2 ring-white" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
