import { useRef } from 'react';
import { KEEP_IT, LINKS, PIPELINE, STEPS, asset, still } from '../content.js';
import { clamp, reduced, useScrollFrame } from '../hooks.js';
import { Check, Label, SendMessage } from './ui.jsx';

/* The free preview in three steps, as a stack of cards. Each card pins near the top; the next one slides up over
   it, and the one underneath settles back (smaller, dimmer), like a deck being dealt. */

function StepArt({ i }) {
  if (i === 0) {
    return (
      <div className="card float-shadow w-full max-w-[18rem] p-4">
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <img src={asset('pixelayers-icon.svg')} alt="" className="h-9 w-9" />
          <div className="text-sm leading-tight"><p className="font-medium">pixelayers_com</p><p className="text-ink-3">Instagram</p></div>
        </div>
        <div className="flex flex-col gap-2 py-4 text-[13px]">
          <span className="w-fit rounded-2xl rounded-bl-md bg-shell px-3 py-2">Hi! Send us your website and we’ll make your free preview.</span>
        </div>
        <span className="flex h-10 items-center justify-center gap-2 rounded-full bg-ink text-sm text-white">Send message →</span>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="card float-shadow w-full max-w-[18rem] p-4">
        <span className="flex items-center gap-2 rounded-full bg-shell px-3 py-2 font-mono text-[12px]"><span className="text-ink-3">↗</span>{PIPELINE.site.url}</span>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['salon-bowls', 'salon', 'salon-color'].map((s) => <img key={s} src={still(s)} alt="" className="aspect-square w-full rounded-xl object-cover object-[50%_70%]" />)}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-shell/70 px-3 py-2.5 text-[12px]">
          <span className="font-display text-base italic">Luma</span>
          <span className="flex gap-1">{['#e8b4b0', '#3a3433', '#f3ece4'].map((c) => <span key={c} className="h-4 w-4 rounded-full ring-2 ring-white" style={{ background: c }} />)}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-[11rem] sm:w-[12.5rem]">
      <div className="phone !rounded-[2rem] !p-1.5">
        <div className="phone-screen !rounded-[1.6rem]">
          <img src={still('salon')} alt="" className="absolute inset-0 h-full w-full object-cover" />
          {/* preview watermark */}
          <div className="absolute inset-0 grid place-items-center">
            <span className="-rotate-[28deg] whitespace-nowrap font-display text-2xl italic text-white/70 [text-shadow:0_1px_10px_rgb(0_0_0/0.3)]">Pixelayers preview</span>
          </div>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[10px]">0:30</span>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const cards = useRef([]);
  useScrollFrame((vh) => {
    if (reduced()) return;
    cards.current.forEach((el, i) => {
      const next = cards.current[i + 1];
      if (!el || !next) return;
      const top = el.getBoundingClientRect().top;
      const nTop = next.getBoundingClientRect().top;
      // 0 while the next card is still below, 1 once it has fully covered this one
      const k = clamp((vh - nTop) / Math.max(1, vh - top));
      el.firstElementChild.style.transform = `scale(${1 - k * 0.06})`;
      el.firstElementChild.style.filter = `brightness(${1 - k * 0.08})`;
    });
  });

  return (
    <section id="how" className="gutter relative pt-16 pb-12 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Label dot="#c9bfff" className="reveal">How it works</Label>
          <h2 className="h2 reveal">Your <em className="mark [--mark:var(--color-lilac)]">free preview</em> in 3 steps.</h2>
          <p className="lede reveal">See a 30-second promo of your business before you decide. No filming needed.</p>
        </div>

        <ol className="mt-16 flex flex-col gap-8 sm:mt-20">
          {STEPS.map((s, i) => (
            <li key={s.title} ref={(el) => (cards.current[i] = el)} className="sticky" style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}>
              <div className={`tone-${s.tone} grid min-h-[30rem] origin-top items-center gap-8 overflow-hidden rounded-[2rem] bg-[var(--tone)] p-7 will-change-transform sm:min-h-[26rem] sm:grid-cols-[1.1fr_0.9fr] sm:rounded-[2.5rem] sm:p-12`}>
                <div className="flex flex-col gap-5">
                  <span className="font-display text-[5rem] font-light italic leading-none text-ink/80 sm:text-[7rem]">{i + 1}</span>
                  <h3 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-tight">{s.title}</h3>
                  <p className="max-w-sm text-lg text-ink-2">{s.text}</p>
                </div>
                <div className="flex justify-center sm:justify-end"><StepArt i={i} /></div>
              </div>
            </li>
          ))}
          {/* like it? keep it */}
          <li ref={(el) => (cards.current[STEPS.length] = el)} className="sticky" style={{ top: `calc(5.5rem + ${STEPS.length * 1.25}rem)` }}>
            <div className="relative grid min-h-[26rem] origin-top items-center gap-8 overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:rounded-[2.5rem] sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,#9cc6ff,transparent)] opacity-50" />
              <div aria-hidden="true" className="absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,#c9bfff,transparent)] opacity-40" />
              <div className="relative flex flex-col gap-5">
                <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/60">{KEEP_IT.label}</p>
                <h3 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.03] tracking-tight">Love it? <em className="text-sky-2">Get the full version.</em></h3>
                <p className="max-w-md text-lg text-white/70">{KEEP_IT.text}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <SendMessage size="lg" tone="soft" className="!bg-white" />
                  <a href="#pricing" className="text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">See plans</a>
                </div>
              </div>
              <ul className="relative flex flex-col gap-3 text-white/85">
                {['No watermark', '10 ready-to-post videos a month', 'Delivered in the same chat'].map((t) => (
                  <li key={t} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-sky-2"><Check className="h-3.5 w-3.5" /></span>{t}</li>
                ))}
                <li className="mt-2 text-sm text-white/45">or find us on Instagram <a className="underline underline-offset-4" href={LINKS.instagram} target="_blank" rel="noreferrer">{LINKS.handle}</a></li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
