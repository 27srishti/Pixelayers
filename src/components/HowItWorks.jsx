import { useRef } from 'react';
import { STEPS, asset, still } from '../content.js';
import { pinProgress, reduced, usePointerVars, useScrollFrame } from '../hooks.js';
import { Check, Reel } from './ui.jsx';

/* How it works, played out as the real conversation on a frosted-glass phone. The section pins over a soft pastel
   aurora that changes colour with each step. Scrolling taps "Message" on the Pixelayers profile; the client's link,
   Instagram, photos and a clip (glass cards bobbing around the phone at different depths) fly in and land as
   messages; a watermarked preview arrives, then the full version. A glass highlight follows the current step. */

// aurora colours per step: three blobs each
const AURORA = [
  ['#f7f5fb', '#ddd3fa', '#d6dcf8'],
  ['#f7f5fb', '#e6d6f7', '#dcd3fa'],
  ['#f7f5fb', '#d6dcf8', '#e2d8fa'],
  ['#f7f5fb', '#ddd3fa', '#cfdaf7'],
];
const BLOBS = [
  { cls: 'left-[-10%] top-[-20%] h-[70%] w-[55%]', drift: 120 },
  { cls: 'right-[-12%] top-[10%] h-[80%] w-[55%]', drift: -160 },
  { cls: 'left-[25%] bottom-[-35%] h-[75%] w-[55%]', drift: 90 },
];
const STEP_AT = [0, 0.18, 0.5, 0.74];

const MSGS = [
  { at: 0.21, from: 'us', kind: 'text', text: 'Hi! Send us whatever you have: a link, photos or clips.' },
  { at: 0.27, from: 'you', kind: 'link', text: 'lumahairstudio.com', fly: 0 },
  { at: 0.33, from: 'you', kind: 'text', text: 'and our Instagram: @lumahairstudio', fly: 1 },
  { at: 0.39, from: 'you', kind: 'photos', fly: 2 },
  { at: 0.45, from: 'you', kind: 'clip', fly: 3 },
  { at: 0.52, until: 0.58, from: 'us', kind: 'typing' },
  { at: 0.58, from: 'us', kind: 'video', watermark: true, text: 'Your free 30-second preview is ready.' },
  { at: 0.77, from: 'you', kind: 'text', text: 'Love it! Let’s start a plan.' },
  { at: 0.84, from: 'us', kind: 'video', watermark: false, text: 'Here’s the full version, no watermark. More coming this month.' },
];

// the client's things, floating around the phone (large screens) until they are sent
const FLOAT = [
  { node: 'link', cls: 'right-[calc(100%+2rem)] top-[12%]', speed: 70, to: '10rem, 9rem', r: '-3deg', delay: '0s' },
  { node: 'insta', cls: 'right-[calc(100%+4.5rem)] top-[42%]', speed: 140, to: '12rem, 1rem', r: '2deg', delay: '-2s' },
  { node: 'photos', cls: 'left-[calc(100%+2rem)] top-[8%]', speed: 100, to: '-10rem, 12rem', r: '4deg', delay: '-4s' },
  { node: 'clip', cls: 'left-[calc(100%+3.5rem)] top-[50%]', speed: 50, to: '-11rem, -2rem', r: '-2deg', delay: '-1s' },
];

const BLUE = 'bg-[linear-gradient(150deg,#1c1c1f_0%,#2b2b30_100%)]';

function FloatArt({ node }) {
  if (node === 'link' || node === 'insta') {
    return (
      <span className="glass sheen relative flex items-center gap-2.5 rounded-2xl py-2.5 pl-2.5 pr-4 text-[13px]">
        <span className={`grid h-8 w-8 place-items-center rounded-xl text-[13px] text-white ${BLUE}`}>{node === 'link' ? '↗' : '@'}</span>
        <span className="leading-tight"><span className="block font-medium">{node === 'link' ? 'lumahairstudio.com' : '@lumahairstudio'}</span><span className="text-[11px] text-ink-2">{node === 'link' ? 'Website' : 'Instagram'}</span></span>
      </span>
    );
  }
  if (node === 'photos') {
    return (
      <span className="glass sheen relative block rounded-[1.4rem] p-2">
        <span className="grid grid-cols-2 gap-1.5">
          {['salon-color', 'salon-bowls', 'salon', 'kitchen'].map((s) => <img key={s} src={still(s)} alt="" className="h-16 w-14 rounded-xl object-cover" />)}
        </span>
        <span className="block px-1 pt-1.5 text-[11px] text-ink-2">4 photos</span>
      </span>
    );
  }
  return (
    <span className="glass sheen relative block rounded-[1.4rem] p-2">
      <span className="relative block h-24 w-40 overflow-hidden rounded-xl">
        <img src={still('kitchen-bath')} alt="" className="h-full w-full object-cover" />
        <span className="absolute inset-0 grid place-items-center"><span className="glass grid h-8 w-8 place-items-center rounded-full"><svg viewBox="0 0 24 24" className="h-3 w-3 translate-x-px" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span></span>
      </span>
      <span className="flex justify-between px-1 pt-1.5 text-[11px] text-ink-2"><span>Phone clip</span><span className="font-mono">0:12</span></span>
    </span>
  );
}

function Bubble({ m }) {
  const mine = m.from === 'you';
  const base = `max-w-[82%] rounded-[1.15rem] px-3 py-2 text-[12.5px] leading-snug ${mine ? `self-end rounded-br-md text-white ${BLUE}` : 'self-start rounded-bl-md border border-white bg-white/70 shadow-[0_6px_16px_-10px_rgb(40_30_90/0.4)]'}`;
  if (m.kind === 'typing') {
    return <span className="flex gap-1 self-start rounded-[1.15rem] rounded-bl-md border border-white bg-white/70 px-3 py-3">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" style={{ animationDelay: `${i * 120}ms` }} />)}</span>;
  }
  if (m.kind === 'link') {
    return (
      <span className={`${base} !p-1.5`}>
        <img src={still('salon-bowls')} alt="" className="h-16 w-full rounded-xl object-cover" />
        <span className="block px-1.5 py-1.5"><span className="block font-medium">Luma Hair Studio</span><span className="text-[11px] text-white/75">{m.text}</span></span>
      </span>
    );
  }
  if (m.kind === 'photos') {
    return <span className="grid w-[64%] grid-cols-3 gap-1 self-end">{['salon-color', 'salon-bowls', 'salon'].map((s) => <img key={s} src={still(s)} alt="" className="aspect-square w-full rounded-lg object-cover" />)}</span>;
  }
  if (m.kind === 'clip') {
    return (
      <span className="relative w-[48%] self-end overflow-hidden rounded-xl">
        <img src={still('kitchen-bath')} alt="" className="aspect-[4/3] w-full object-cover" />
        <span className="absolute bottom-1 right-1.5 font-mono text-[10px] text-white">0:12</span>
      </span>
    );
  }
  if (m.kind === 'video') {
    return (
      <span className={`${base} flex flex-col gap-1.5 !p-1.5`}>
        <span className="relative block w-[7.5rem] overflow-hidden rounded-xl">
          <Reel id={m.watermark ? 'salon' : 'cafe'} label="Concept sample video" rounded="rounded-xl" />
          {m.watermark && <span className="absolute inset-0 grid place-items-center"><span className="-rotate-[28deg] text-[11px] font-semibold tracking-wide text-white/85 [text-shadow:0_1px_6px_rgb(0_0_0/0.4)]">PIXELAYERS PREVIEW</span></span>}
        </span>
        <span className="px-1 pb-0.5">{m.text}</span>
      </span>
    );
  }
  return <span className={base}>{m.text}</span>;
}

export default function HowItWorks() {
  const pointer = usePointerVars();
  const sec = useRef(null), profile = useRef(null), pill = useRef(null), badge = useRef(null);
  const msgs = useRef([]), steps = useRef([]), floats = useRef([]), blobs = useRef([]);

  useScrollFrame((vh) => {
    if (!sec.current) return;
    const p = pinProgress(sec.current, vh);
    let step = 0;
    STEP_AT.forEach((a, i) => { if (p >= a) step = i; });
    const still_ = reduced();
    blobs.current.forEach((el, i) => {
      if (!el) return;
      el.style.backgroundColor = AURORA[step][i];
      if (!still_) el.style.translate = `${(Math.sin(p * 6 + i * 2) * 40).toFixed(1)}px ${(p * BLOBS[i].drift).toFixed(1)}px`;
    });
    steps.current.forEach((el, i) => el && (el.dataset.on = i % STEPS.length === step));
    const active = steps.current[step];
    if (pill.current && active && active.offsetParent) {
      pill.current.style.transform = `translateY(${active.offsetTop}px)`;
      pill.current.style.height = `${active.offsetHeight}px`;
    }
    if (badge.current) badge.current.textContent = `Step 0${step + 1} of 0${STEPS.length}`;
    if (profile.current) profile.current.dataset.on = p < 0.17;
    msgs.current.forEach((el, i) => el && (el.dataset.on = p >= MSGS[i].at && (MSGS[i].until === undefined || p < MSGS[i].until)));
    floats.current.forEach((el, i) => {
      if (!el) return;
      el.dataset.sent = p >= MSGS.find((m) => m.fly === i).at;
      if (!still_) el.style.translate = `0 ${(-p * FLOAT[i].speed).toFixed(1)}px`;
    });
  });

  return (
    <section ref={sec} id="how" data-tone="lilac" className="relative h-[480svh]">
      <div className="sticky top-0 h-svh px-2 pb-2 pt-[4.5rem] sm:px-3 sm:pb-3">
        <div ref={pointer} className="room h-full overflow-hidden">
          {/* aurora */}
          <div aria-hidden="true" className="absolute inset-0">
            {BLOBS.map((b, i) => (
              <div key={i} ref={(el) => (blobs.current[i] = el)} className={`absolute rounded-full opacity-75 blur-[90px] transition-[background-color] duration-[1200ms] ${b.cls}`} style={{ backgroundColor: AURORA[0][i] }} />
            ))}
            <div className="absolute inset-0 bg-[radial-gradient(rgb(18_18_18/0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
          </div>

          <div className="gutter relative mx-auto grid h-full max-w-[1320px] items-center gap-5 py-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            {/* words */}
            <div className="flex flex-col items-start gap-5 lg:gap-7">
              <span className="glass inline-flex h-8 items-center gap-2 rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
                <span className="text-ink">01</span><span className="h-3 w-px bg-ink/20" />How it works
              </span>
              <h2 className="h2 !text-[clamp(2rem,4.2vw,3.9rem)]">One chat. <span className="soft">That’s the whole process.</span></h2>

              <ol className="relative hidden w-full max-w-md flex-col gap-1 lg:flex">
                <span ref={pill} aria-hidden="true" className="glass sheen absolute inset-x-0 top-0 rounded-[1.4rem] transition-[transform,height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                {STEPS.map((s, i) => (
                  <li key={s.title} ref={(el) => (steps.current[i] = el)} data-on={i === 0} className="group relative flex gap-4 rounded-[1.4rem] p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10 font-mono text-[12px] text-ink-3 transition-all duration-500 group-data-[on=true]:border-transparent group-data-[on=true]:bg-ink group-data-[on=true]:text-white">0{i + 1}</span>
                    <span className="opacity-45 transition-opacity duration-500 group-data-[on=true]:opacity-100">
                      <span className="block text-lg font-medium tracking-[-0.03em]">{s.title}</span>
                      <span className="mt-0.5 block text-[14.5px] leading-relaxed text-ink-2">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              {/* phones: only the current step, on glass */}
              <ol className="relative h-[5.2rem] w-full lg:hidden">
                {STEPS.map((s, i) => (
                  <li key={s.title} ref={(el) => (steps.current[STEPS.length + i] = el)} data-on={i === 0} className="glass absolute inset-0 flex items-center gap-3 rounded-2xl px-3.5 opacity-0 transition-opacity duration-500 data-[on=true]:opacity-100">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[12px] text-white ${BLUE}`}>0{i + 1}</span>
                    <span><span className="block font-medium tracking-[-0.02em]">{s.title}</span><span className="block text-[13px] leading-snug text-ink-2">{s.text}</span></span>
                  </li>
                ))}
              </ol>
            </div>

            {/* the phone */}
            <div className="relative mx-auto h-[min(54svh,560px)] aspect-[9/18.5] [perspective:1400px] sm:h-[min(62svh,600px)] lg:h-[min(72svh,640px)]">
              {FLOAT.map((f, i) => (
                <div key={f.node} ref={(el) => (floats.current[i] = el)} data-sent="false" aria-hidden="true" className={`group absolute z-10 hidden w-max lg:block ${f.cls}`}>
                  <div className="bob" style={{ '--r': f.r, animationDelay: f.delay }}>
                    <div className="transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.5,0,0.2,1)] group-data-[sent=true]:opacity-0 group-data-[sent=true]:blur-sm group-data-[sent=true]:[transform:translate(var(--to))_scale(0.35)]" style={{ '--to': f.to }}>
                      <FloatArt node={f.node} />
                    </div>
                  </div>
                </div>
              ))}

              <span ref={badge} className="glass absolute -top-3 left-1/2 z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full px-3 py-1 font-mono text-[11px] text-ink-2 max-sm:hidden">Step 01 of 04</span>

              <div className="h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: 'rotateY(calc(var(--px,0) * -8deg)) rotateX(calc(var(--py,0) * 6deg))' }}>
                <div className="glass-strong sheen relative h-full rounded-[2.8rem] p-2.5">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-white/70 backdrop-blur-xl">
                    {/* chat header */}
                    <div className="flex items-center gap-2.5 border-b border-white bg-white/50 px-4 pb-2.5 pt-5">
                      <span className="text-ink-3">‹</span>
                      <img src={asset('pixelayers-icon.svg')} alt="" className="h-7 w-7" />
                      <span className="leading-tight"><span className="block text-[13px] font-medium">pixelayers_com</span><span className="flex items-center gap-1 text-[11px] text-ink-3"><span className="h-1.5 w-1.5 rounded-full bg-[#2fb37a]" />Active now</span></span>
                    </div>
                    {/* messages */}
                    <div className="flex flex-1 flex-col justify-end overflow-hidden bg-[linear-gradient(180deg,rgb(247_246_243/0.7),rgb(238_236_231/0.7))] px-3 pb-2">
                      {MSGS.map((m, i) => (
                        <div key={i} ref={(el) => (msgs.current[i] = el)} data-on="false"
                          className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[on=true]:grid-rows-[1fr] data-[on=true]:opacity-100">
                          <div className="flex min-h-0 flex-col overflow-hidden"><div className="flex flex-col pt-1.5"><Bubble m={m} /></div></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 px-3 pb-3 pt-2">
                      <span className="flex-1 rounded-full border border-white bg-white/80 px-4 py-2 text-[12px] text-ink-3">Message…</span>
                      <span className={`grid h-8 w-8 place-items-center rounded-full text-white ${BLUE}`}><svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
                    </div>

                    {/* step 1: the profile, with a tap on Message */}
                    <div ref={profile} data-on="true" className="absolute inset-0 flex flex-col bg-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[on=false]:-translate-x-full">
                      <div className="h-20 shrink-0 bg-[linear-gradient(120deg,#e9e6df,#d9d5cd)]" />
                      <div className="-mt-9 flex flex-col items-center gap-1.5 px-5 text-center">
                        <img src={asset('pixelayers-icon.svg')} alt="" className="h-[4.5rem] w-[4.5rem] rounded-[1.2rem] ring-4 ring-white" />
                        <p className="mt-1 text-[14px] font-medium">pixelayers_com</p>
                        <p className="text-[11.5px] leading-snug text-ink-2">Animated promo videos for small businesses.</p>
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[10.5px] text-[#1d7a52]"><Check className="h-2.5 w-2.5" />Free 30-second preview</span>
                        <div className="mt-2.5 grid w-full grid-cols-2 gap-1.5 text-[12px] font-medium">
                          <span className="rounded-xl bg-ground-2 py-2">Follow</span>
                          <span className={`relative rounded-xl py-2 text-white ${BLUE}`}>Message
                            <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white/60" />
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 grid flex-1 grid-cols-3 content-start gap-0.5 overflow-hidden">
                        {['salon', 'cafe', 'medspa', 'kitchen', 'giftshop', 'salon-color', 'kitchen-bath', 'salon-bowls', 'cafe', 'medspa', 'salon', 'giftshop'].map((s, i) => (
                          <img key={i} src={still(s)} alt="" className="aspect-[4/5] w-full object-cover" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
