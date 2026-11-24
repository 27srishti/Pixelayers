import { useRef } from 'react';
import { PIPELINE, still } from '../content.js';
import { easeInOut, lerp, pinProgress, range, useScrollFrame } from '../hooks.js';
import { Check, Reel, Tag } from './ui.jsx';

/* "From your website": as you scroll, the photo, logo, colors and message lift off a business website, arc
   across, and drop into place on a phone. When everything has landed, the finished promo starts playing. */
const PIECES = ['photo', 'logo', 'colors', 'message'];
const SWATCHES = ['#e8b4b0', '#3a3433', '#f3ece4'];
const { site } = PIPELINE;

function PieceArt({ id }) {
  switch (id) {
    case 'photo':
      return <img src={still('salon-bowls')} alt="" className="h-full w-full object-cover object-[50%_78%]" />;
    case 'logo':
      return (
        <span className="flex h-full items-center gap-[8cqw] whitespace-nowrap">
          <span className="aspect-square h-[80%] rounded-full bg-[#e8b4b0] ring-[0.6cqw] ring-white" />
          <span className="text-[28cqw] font-semibold tracking-[-0.04em] leading-none">{site.name}</span>
        </span>
      );
    case 'colors':
      return (
        <span className="flex h-full items-center gap-[6cqw]">
          {SWATCHES.map((c) => <span key={c} className="aspect-square h-full rounded-full ring-[1.5cqw] ring-white" style={{ background: c }} />)}
        </span>
      );
    default:
      return (
        <span className="flex h-full items-center rounded-[5cqw] bg-white px-[6cqw]">
          <span className="text-[8.5cqw] font-medium leading-[1.1] tracking-[-0.03em]">{site.headline}</span>
        </span>
      );
  }
}

/** An empty dashed placeholder that marks where a piece came from or is going. */
const Slot = ({ slot, className = '' }) => <div data-slot={slot} className={`slot rounded-xl border border-dashed border-ink/15 transition-opacity duration-300 ${className}`} />;

export default function Pipeline() {
  const sec = useRef(null), stage = useRef(null), fly = useRef([]), ticks = useRef([]);
  const video = useRef(null), ready = useRef(null);

  useScrollFrame((vh) => {
    if (!sec.current || !stage.current) return;
    const p = pinProgress(sec.current, vh);
    const s = stage.current.getBoundingClientRect();
    const done = range(p, 0.84, 0.93);
    PIECES.forEach((id, i) => {
      const el = fly.current[i];
      const src = stage.current.querySelector(`[data-slot="${id}-src"]`);
      const dst = stage.current.querySelector(`[data-slot="${id}-dst"]`);
      if (!el || !src || !dst) return;
      const a = src.getBoundingClientRect(), b = dst.getBoundingClientRect();
      const t = easeInOut(range(p, 0.1 + i * 0.13, 0.4 + i * 0.13));
      src.style.opacity = t > 0.02 ? '1' : '0'; // outline shows only once the piece has left
      dst.style.opacity = t < 0.98 ? '1' : '0';
      const arc = Math.sin(t * Math.PI);
      el.style.left = `${lerp(a.left, b.left, t) - s.left}px`;
      el.style.top = `${lerp(a.top, b.top, t) - s.top}px`;
      el.style.width = `${lerp(a.width, b.width, t)}px`;
      el.style.height = `${lerp(a.height, b.height, t)}px`;
      el.style.transform = `translate3d(0,${(-arc * 60).toFixed(1)}px,0) rotate(${(-arc * 5).toFixed(2)}deg) scale(${1 + arc * 0.06})`;
      el.style.boxShadow = `0 ${arc * 30}px ${arc * 60}px -20px rgb(27 24 36 / ${0.35 * arc})`;
      el.style.opacity = String(1 - done);
      if (ticks.current[i]) ticks.current[i].dataset.on = t > 0.98;
    });
    if (video.current) video.current.style.opacity = String(done);
    if (ready.current) {
      ready.current.style.opacity = String(done);
      ready.current.style.transform = `translate3d(-50%,${(1 - done) * 12}px,0)`;
    }
  });

  return (
    <section ref={sec} className="relative h-[300svh]">
      <div className="sticky top-0 flex h-svh min-h-[640px] flex-col justify-center overflow-hidden pt-16">
        <div className="gutter mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* words */}
          <div className="flex flex-col gap-5">
            <Tag>Made from your website</Tag>
            <h2 className="h2 !text-[clamp(2rem,4.2vw,3.8rem)]">Your website already has <span className="soft">everything we need.</span></h2>
            <p className="lede hidden max-w-md sm:block">{PIPELINE.sub}</p>
            <ul className="flex flex-wrap gap-2 lg:mt-2">
              {PIPELINE.pieces.map((t, i) => (
                <li key={t} ref={(el) => (ticks.current[i] = el)} data-on="false"
                  className="group flex items-center gap-2 rounded-full border border-line bg-white/60 py-1.5 pl-1.5 pr-3.5 text-sm text-ink-3 transition-colors duration-500 data-[on=true]:border-transparent data-[on=true]:bg-white data-[on=true]:text-ink">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-ground-2 text-transparent transition-colors duration-500 group-data-[on=true]:bg-ink group-data-[on=true]:text-white"><Check className="h-3 w-3" /></span>{t}
                </li>
              ))}
            </ul>
          </div>

          {/* stage: website → phone */}
          <div ref={stage} className="relative flex items-center justify-between gap-4 sm:gap-8">
            {/* the website */}
            <div className="lift w-[62%] overflow-hidden rounded-2xl bg-white sm:w-[66%]">
              <div className="flex items-center gap-2 border-b border-line bg-ground px-3 py-2.5">
                <span className="flex gap-1">{[0, 1, 2].map((k) => <span key={k} className="h-2 w-2 rounded-full bg-ink/12" />)}</span>
                <span className="ml-1 truncate rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] text-ink-3 sm:text-[11px]">{site.url}</span>
              </div>
              <div className="flex flex-col gap-3 p-3 sm:gap-5 sm:p-5">
                <div className="flex items-center justify-between">
                  <Slot slot="logo-src" className="h-5 w-16 sm:h-7 sm:w-24" />
                  <span className="hidden gap-3 text-[10px] text-ink-3 sm:flex"><span>Services</span><span>Team</span><span>Book</span></span>
                </div>
                <div className="grid grid-cols-[1fr_1fr] items-center gap-3 sm:gap-5">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <Slot slot="message-src" className="h-12 w-full sm:h-[4.6rem]" />
                    <span className="w-fit rounded-full bg-ink px-2.5 py-1 text-[9px] text-white sm:text-[11px]">Book a visit</span>
                    <Slot slot="colors-src" className="h-4 w-14 sm:h-6 sm:w-20" />
                  </div>
                  <Slot slot="photo-src" className="aspect-[4/5] w-full" />
                </div>
              </div>
            </div>

            {/* the phone */}
            <div className="relative w-[34%] max-w-[15rem] sm:w-[30%]">
              <div className="phone !rounded-[1.9rem] !p-1.5 sm:!rounded-[2.4rem] sm:!p-2">
                <div className="phone-screen !rounded-[1.5rem] bg-[#f3ece4] sm:!rounded-[1.95rem]">
                  <Slot slot="photo-dst" className="absolute inset-x-0 top-0 h-[64%] !rounded-none border-0" />
                  <Slot slot="logo-dst" className="absolute left-[8%] top-[5%] h-[5%] w-[38%] border-0" />
                  <Slot slot="message-dst" className="absolute inset-x-[6%] bottom-[13%] h-[17%]" />
                  <Slot slot="colors-dst" className="absolute bottom-[5%] left-[8%] h-[4%] w-[28%]" />
                  <div ref={video} className="absolute inset-0 opacity-0">
                    <Reel id="salon" label="Concept sample: the finished promo" rounded="rounded-none" className="!aspect-auto h-full" />
                  </div>
                </div>
              </div>
              <p ref={ready} className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[12px] opacity-0 shadow-sm sm:text-[13px]">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-ink text-white"><Check className="h-2.5 w-2.5" /></span>Ready to post
              </p>
            </div>

            {/* the pieces in flight */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {PIECES.map((id, i) => (
                <div key={id} ref={(el) => (fly.current[i] = el)} className={`absolute overflow-hidden will-change-transform [container-type:inline-size] ${id === 'photo' ? 'rounded-xl' : ''}`}>
                  <PieceArt id={id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
