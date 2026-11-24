import { useRef } from 'react';
import { PIPELINE, STEPS, asset, still } from '../content.js';
import { useScrollFrame } from '../hooks.js';
import { SectionHead } from './ui.jsx';

/* The free preview in three steps. On large screens the steps scroll past on the left while a pinned panel on the
   right switches to the matching picture (and colour). On phones each step carries its own picture. */
const TONE = { lilac: '#e6defd', peach: '#ffe1d2', mint: '#d9f0e4' };

function StepArt({ i }) {
  if (i === 0) {
    return (
      <div className="lift w-full max-w-[19rem] rounded-[1.5rem] bg-white p-4">
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <img src={asset('pixelayers-icon.svg')} alt="" className="h-9 w-9" />
          <div className="text-sm leading-tight"><p className="font-medium">pixelayers_com</p><p className="text-ink-3">Instagram</p></div>
        </div>
        <p className="my-4 w-fit rounded-2xl rounded-bl-md bg-ground-2 px-3 py-2 text-[13px]">Hi! Send us your website and we’ll make your free preview.</p>
        <span className="flex h-10 items-center justify-center rounded-full bg-ink text-sm text-white">Send message</span>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="lift w-full max-w-[19rem] rounded-[1.5rem] bg-white p-4">
        <span className="flex items-center gap-2 rounded-full bg-ground-2 px-3 py-2 font-mono text-[12px]"><span className="text-ink-3">↗</span>{PIPELINE.site.url}</span>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['salon-bowls', 'salon', 'salon-color'].map((s) => <img key={s} src={still(s)} alt="" className="aspect-square w-full rounded-xl object-cover object-[50%_70%]" />)}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-ground-2 px-3 py-2.5 text-[13px]">
          <span className="font-semibold tracking-[-0.03em]">Luma</span>
          <span className="flex gap-1">{['#e8b4b0', '#3a3433', '#f3ece4'].map((c) => <span key={c} className="h-4 w-4 rounded-full ring-2 ring-white" style={{ background: c }} />)}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="w-[11.5rem] sm:w-[13rem]">
      <div className="phone !rounded-[2rem] !p-1.5">
        <div className="phone-screen !rounded-[1.6rem]">
          <img src={still('salon')} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="-rotate-[28deg] whitespace-nowrap text-xl font-semibold tracking-[-0.03em] text-white/75 [text-shadow:0_1px_10px_rgb(0_0_0/0.3)]">PIXELAYERS PREVIEW</span>
          </div>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[10px]">0:30</span>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const items = useRef([]), panel = useRef(null), arts = useRef([]), fill = useRef(null);
  useScrollFrame((vh) => {
    let best = 0, dist = Infinity;
    items.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - vh / 2);
      if (d < dist) { dist = d; best = i; }
    });
    items.current.forEach((el, i) => el && (el.dataset.on = i === best));
    arts.current.forEach((el, i) => el && (el.dataset.on = i === best));
    if (panel.current) panel.current.style.background = TONE[STEPS[best].tone];
    if (fill.current) fill.current.style.transform = `scaleY(${(best + 1) / STEPS.length})`;
  });

  return (
    <section id="how" className="py-28 sm:py-36">
      <SectionHead className="gutter" tag="How it works" title={<>Your free preview <span className="soft">in 3 steps.</span></>}
        note="See a 30-second promo of your business before you decide. No filming needed." />

      <div className="gutter wrap mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-0">
        <ol className="relative flex flex-col lg:border-l lg:border-line lg:pl-10">
          <span ref={fill} aria-hidden="true" className="absolute -left-px top-0 hidden h-full w-0.5 origin-top bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block" style={{ transform: 'scaleY(0.33)' }} />
          {STEPS.map((s, i) => (
            <li key={s.title} ref={(el) => (items.current[i] = el)} data-on={i === 0}
              className="group flex flex-col justify-center gap-5 border-t border-line py-10 first:border-t-0 lg:min-h-[72svh] lg:border-t-0 lg:py-0">
              <span className="font-mono text-[13px] text-ink-3">0{i + 1} / 03</span>
              <h3 className="text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.05em] transition-opacity duration-500 lg:opacity-30 lg:group-data-[on=true]:opacity-100">{s.title}</h3>
              <p className="lede max-w-sm transition-opacity duration-500 lg:opacity-30 lg:group-data-[on=true]:opacity-100">{s.text}</p>
              <div className="mt-2 grid place-items-center rounded-[1.75rem] py-10 lg:hidden" style={{ background: TONE[s.tone] }}><StepArt i={i} /></div>
            </li>
          ))}
        </ol>

        <div className="hidden lg:block lg:border-x lg:border-line lg:px-10">
          <div ref={panel} className="sticky top-24 grid h-[calc(100svh-8rem)] max-h-[44rem] place-items-center overflow-hidden rounded-[2rem] transition-[background-color] duration-700" style={{ background: TONE.lilac }}>
            {STEPS.map((s, i) => (
              <div key={s.title} ref={(el) => (arts.current[i] = el)} data-on={i === 0}
                className="col-start-1 row-start-1 flex w-full justify-center px-10 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-6 scale-[0.97] data-[on=true]:translate-y-0 data-[on=true]:scale-100 data-[on=true]:opacity-100">
                <StepArt i={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
