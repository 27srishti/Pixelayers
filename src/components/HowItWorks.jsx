import { useRef } from 'react';
import { STEPS, asset, still } from '../content.js';
import { pinProgress, reduced, useScrollFrame } from '../hooks.js';
import { Reel, Tag } from './ui.jsx';

/* How it works, played out as the real conversation on a phone. The section pins; scrolling taps "Message" on
   the Pixelayers profile, then the client's link, Instagram, photos and a clip fly in from around the phone and
   land as messages, a free preview (with watermark) arrives, and finally the full version. The steps light up on
   the left, and the panel shifts colour with each step. */
const TONE = { lilac: '#e6defd', peach: '#ffe1d2', mint: '#d9f0e4', sky: '#d9e8ff' };
const STEP_AT = [0, 0.18, 0.5, 0.74]; // where each step starts

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

// the client's things, waiting around the phone (large screens), then flying into the chat
const FLOAT = [
  { cls: 'right-[calc(100%+1.5rem)] top-[18%]', speed: 60, to: '9rem, 6rem', node: 'link' },
  { cls: 'right-[calc(100%+3rem)] top-[46%]', speed: 120, to: '11rem, -2rem', node: 'insta' },
  { cls: 'left-[calc(100%+1.5rem)] top-[14%]', speed: 90, to: '-9rem, 8rem', node: 'photos' },
  { cls: 'left-[calc(100%+2.5rem)] top-[52%]', speed: 40, to: '-10rem, -4rem', node: 'clip' },
];

function FloatArt({ node }) {
  if (node === 'link') {
    return <span className="lift flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-[13px]"><span className="grid h-7 w-7 place-items-center rounded-full bg-sky">↗</span>lumahairstudio.com</span>;
  }
  if (node === 'insta') {
    return <span className="lift flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-[13px]"><span className="grid h-7 w-7 place-items-center rounded-full bg-lilac text-[12px] font-semibold">@</span>@lumahairstudio</span>;
  }
  if (node === 'photos') {
    return (
      <span className="relative block h-28 w-24">
        {['salon-color', 'salon-bowls'].map((s, i) => (
          <img key={s} src={still(s)} alt="" className="lift absolute h-24 w-20 rounded-xl border-4 border-white object-cover" style={{ left: i * 16, top: i * 10, rotate: `${i ? 6 : -5}deg` }} />
        ))}
      </span>
    );
  }
  return (
    <span className="lift relative block h-24 w-36 overflow-hidden rounded-xl border-4 border-white">
      <img src={still('kitchen-bath')} alt="" className="h-full w-full object-cover" />
      <span className="absolute inset-0 grid place-items-center bg-black/15"><span className="grid h-7 w-7 place-items-center rounded-full bg-white/90"><svg viewBox="0 0 24 24" className="h-3 w-3 translate-x-px" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span></span>
      <span className="absolute bottom-1 right-1.5 font-mono text-[10px] text-white">0:12</span>
    </span>
  );
}

function Bubble({ m }) {
  const mine = m.from === 'you';
  const base = `max-w-[82%] rounded-[1.1rem] px-3 py-2 text-[12.5px] leading-snug ${mine ? 'self-end rounded-br-md bg-ink text-white' : 'self-start rounded-bl-md bg-ground-2'}`;
  if (m.kind === 'typing') {
    return <span className="flex gap-1 self-start rounded-[1.1rem] rounded-bl-md bg-ground-2 px-3 py-3">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" style={{ animationDelay: `${i * 120}ms` }} />)}</span>;
  }
  if (m.kind === 'link') {
    return (
      <span className={`${base} !p-1.5`}>
        <span className="block overflow-hidden rounded-xl bg-white/10">
          <img src={still('salon-bowls')} alt="" className="h-16 w-full object-cover" />
          <span className="block px-2 py-1.5"><span className="block font-medium">Luma Hair Studio</span><span className="text-[11px] text-white/60">{m.text}</span></span>
        </span>
      </span>
    );
  }
  if (m.kind === 'photos') {
    return <span className="grid w-[62%] grid-cols-3 gap-1 self-end">{['salon-color', 'salon-bowls', 'salon'].map((s) => <img key={s} src={still(s)} alt="" className="aspect-square w-full rounded-lg object-cover" />)}</span>;
  }
  if (m.kind === 'clip') {
    return (
      <span className="relative w-[46%] self-end overflow-hidden rounded-xl">
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
          {m.watermark && <span className="absolute inset-0 grid place-items-center"><span className="-rotate-[28deg] text-[11px] font-semibold tracking-wide text-white/80 [text-shadow:0_1px_6px_rgb(0_0_0/0.4)]">PIXELAYERS PREVIEW</span></span>}
        </span>
        <span className="px-1 pb-0.5">{m.text}</span>
      </span>
    );
  }
  return <span className={base}>{m.text}</span>;
}

export default function HowItWorks() {
  const sec = useRef(null), panel = useRef(null), profile = useRef(null), num = useRef(null);
  const msgs = useRef([]), steps = useRef([]), floats = useRef([]), fill = useRef(null);

  useScrollFrame((vh) => {
    if (!sec.current) return;
    const p = pinProgress(sec.current, vh);
    let step = 0;
    STEP_AT.forEach((a, i) => { if (p >= a) step = i; });
    if (panel.current) panel.current.style.background = TONE[STEPS[step].tone];
    if (num.current) num.current.textContent = `0${step + 1}`;
    steps.current.forEach((el, i) => el && (el.dataset.on = i % STEPS.length === step));
    if (fill.current) fill.current.style.transform = `scaleY(${(step + 1) / STEPS.length})`;
    if (profile.current) profile.current.dataset.on = p < 0.17;
    msgs.current.forEach((el, i) => el && (el.dataset.on = p >= MSGS[i].at && (MSGS[i].until === undefined || p < MSGS[i].until)));
    floats.current.forEach((el, i) => {
      if (!el) return;
      const sent = MSGS.find((m) => m.fly === i);
      el.dataset.sent = p >= sent.at;
      if (!reduced()) el.style.translate = `0 ${(-p * FLOAT[i].speed).toFixed(1)}px`;
    });
  });

  return (
    <section ref={sec} id="how" className="relative h-[480svh]">
      <div className="sticky top-0 h-svh px-2 pb-2 pt-[4.5rem] sm:px-3 sm:pb-3">
        <div ref={panel} className="relative h-full overflow-hidden rounded-[2rem] transition-[background-color] duration-700 sm:rounded-[2.5rem]" style={{ background: TONE.lilac }}>
          <span ref={num} aria-hidden="true" className="pointer-events-none absolute -bottom-[0.18em] right-[2%] select-none text-[34vw] font-medium leading-none tracking-[-0.08em] text-white/45 lg:text-[24vw]">01</span>

          <div className="gutter relative mx-auto grid h-full max-w-[1320px] items-center gap-5 py-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            {/* words */}
            <div className="flex flex-col items-start gap-5 lg:gap-8">
              <Tag className="border-ink/15">How it works</Tag>
              <h2 className="h2 !text-[clamp(2rem,4.2vw,3.9rem)]">One chat. <span className="text-ink/45">That’s the whole process.</span></h2>
              <ol className="relative hidden flex-col gap-5 pl-6 lg:flex">
                <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px bg-ink/15" />
                <span ref={fill} aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px origin-top bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: 'scaleY(0.25)' }} />
                {STEPS.map((s, i) => (
                  <li key={s.title} ref={(el) => (steps.current[i] = el)} data-on={i === 0} className="group opacity-35 transition-opacity duration-500 data-[on=true]:opacity-100">
                    <p className="flex items-baseline gap-3"><span className="font-mono text-[12px] text-ink-3">0{i + 1}</span><span className="text-xl font-medium tracking-[-0.03em]">{s.title}</span></p>
                    <p className="mt-1 max-w-sm pl-8 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
                  </li>
                ))}
              </ol>
              {/* phones: only the current step */}
              <ol className="relative h-[4.5rem] w-full lg:hidden">
                {STEPS.map((s, i) => (
                  <li key={s.title} ref={(el) => (steps.current[STEPS.length + i] = el)} data-on={i === 0} className="absolute inset-0 opacity-0 transition-opacity duration-500 data-[on=true]:opacity-100">
                    <p className="flex items-baseline gap-2"><span className="font-mono text-[12px] text-ink-3">0{i + 1}</span><span className="text-lg font-medium tracking-[-0.03em]">{s.title}</span></p>
                    <p className="mt-0.5 text-[14px] leading-snug text-ink-2">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* the phone */}
            <div className="relative mx-auto h-[min(56svh,560px)] aspect-[9/18.5] sm:h-[min(64svh,600px)] lg:h-[min(72svh,640px)]">
              {FLOAT.map((f, i) => (
                <div key={f.node} ref={(el) => (floats.current[i] = el)} data-sent="false" aria-hidden="true"
                  className={`group absolute hidden lg:block ${f.cls}`}>
                  <div className="transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.5,0,0.2,1)] group-data-[sent=true]:opacity-0" style={{ '--to': f.to }}>
                    <div className="group-data-[sent=true]:[transform:translate(var(--to))_scale(0.4)] transition-transform duration-700 ease-[cubic-bezier(0.5,0,0.2,1)]"><FloatArt node={f.node} /></div>
                  </div>
                </div>
              ))}

              <div className="relative h-full rounded-[2.4rem] bg-white p-2 shadow-[0_0_0_1px_rgb(18_18_18/0.06),0_50px_100px_-40px_rgb(18_18_18/0.45)]">
                <div className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem] bg-white">
                  {/* chat header */}
                  <div className="flex items-center gap-2.5 border-b border-line px-4 pb-2.5 pt-5">
                    <span className="text-ink-3">‹</span>
                    <img src={asset('pixelayers-icon.svg')} alt="" className="h-7 w-7" />
                    <span className="leading-tight"><span className="block text-[13px] font-medium">pixelayers_com</span><span className="text-[11px] text-ink-3">Active now</span></span>
                  </div>
                  {/* messages */}
                  <div className="flex flex-1 flex-col justify-end gap-0 overflow-hidden px-3 pb-2">
                    {MSGS.map((m, i) => (
                      <div key={i} ref={(el) => (msgs.current[i] = el)} data-on="false"
                        className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[on=true]:grid-rows-[1fr] data-[on=true]:opacity-100">
                        <div className="flex min-h-0 flex-col overflow-hidden"><div className="flex flex-col pt-1.5"><Bubble m={m} /></div></div>
                      </div>
                    ))}
                  </div>
                  <div className="mx-3 mb-3 rounded-full border border-line px-4 py-2 text-[12px] text-ink-3">Message…</div>

                  {/* step 1: the profile, with a tap on Message */}
                  <div ref={profile} data-on="true" className="absolute inset-0 flex flex-col bg-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[on=false]:-translate-x-full">
                    <div className="flex flex-col items-center gap-2 px-5 pt-8 text-center">
                      <img src={asset('pixelayers-icon.svg')} alt="" className="h-16 w-16" />
                      <p className="text-[14px] font-medium">pixelayers_com</p>
                      <p className="text-[12px] leading-snug text-ink-2">Animated promo videos for small businesses. Free 30-second preview.</p>
                      <div className="mt-2 grid w-full grid-cols-2 gap-1.5 text-[12px] font-medium">
                        <span className="rounded-lg bg-ground-2 py-2">Follow</span>
                        <span className="relative rounded-lg bg-ink py-2 text-white">Message
                          <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white/50" />
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-0.5">
                      {['salon', 'cafe', 'medspa', 'kitchen', 'giftshop', 'salon-color', 'kitchen-bath', 'salon-bowls', 'cafe'].map((s, i) => (
                        <img key={i} src={still(s)} alt="" className="aspect-square w-full object-cover" />
                      ))}
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
