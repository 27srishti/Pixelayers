import { useRef, useState } from 'react';
import { KEEP_IT, PRICING } from '../content.js';
import { passProgress, reduced, useCountTo, useScrollFrame } from '../hooks.js';
import { Check, Parallax, SendMessage, Tag } from './ui.jsx';

/* "Love it? Get the full version" and the plans, on the one pastel gradient band of the site. The gradient
   slowly slides as the band scrolls through, and the two plan cards drift at slightly different speeds. */
function Plan({ plan, length }) {
  const price = useCountTo(plan.price[length]);
  const per = plan.price[length] / 10;
  return (
    <div className={`flex h-full flex-col rounded-[2rem] p-7 sm:p-9 ${plan.featured ? 'bg-ink text-white' : 'bg-white/75 backdrop-blur'}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-medium">{plan.title}</h3>
        <Tag dark={plan.featured}>{plan.tag}</Tag>
      </div>
      <p className="mt-12 flex items-baseline gap-1">
        <span className="text-[clamp(4.5rem,9vw,6.5rem)] font-medium leading-[0.85] tracking-[-0.06em] tabular-nums">${price}</span>
        <span className={`ml-2 ${plan.featured ? 'text-white/60' : 'text-ink-3'}`}>/ month</span>
      </p>
      <p className={`mt-auto border-t pt-6 ${plan.featured ? 'border-white/15 text-white/70' : 'border-line text-ink-2'}`}>
        10 videos, {length} seconds each. <span className={plan.featured ? 'text-white' : 'text-ink'}>${per % 1 ? per.toFixed(2) : per} a video.</span>
      </p>
    </div>
  );
}

export default function Pricing() {
  const [length, setLength] = useState('30');
  const band = useRef(null);
  useScrollFrame((vh) => {
    if (!band.current || reduced()) return;
    band.current.style.backgroundPosition = `${(passProgress(band.current, vh) * 100).toFixed(1)}% 50%`;
  });
  return (
    <section id="pricing" className="px-2 py-16 sm:px-3 sm:py-24">
      <div ref={band} className="band rounded-[2rem] sm:rounded-[2.5rem]">
        <div className="gutter wrap py-20 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <Tag className="reveal border-ink/15">{KEEP_IT.label}</Tag>
              <h2 className="h2 reveal">Love it? <span className="text-ink/45">Get the full version.</span></h2>
            </div>
            <div className="flex flex-col items-start justify-end gap-6">
              <p className="lede reveal max-w-md !text-ink/75">{KEEP_IT.text} Plans start at $30 for your first month.</p>
              <div className="reveal relative grid grid-cols-2 rounded-full bg-white/70 p-1 backdrop-blur" role="tablist" aria-label="Video length">
                <span aria-hidden="true" className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: length === '60' ? 'translateX(100%)' : 'none' }} />
                {PRICING.lengths.map((l) => (
                  <button key={l.id} id={`length-${l.id}`} type="button" role="tab" aria-selected={length === l.id} onClick={() => setLength(l.id)}
                    className={`relative z-10 rounded-full px-4 py-2.5 text-sm transition-colors duration-300 sm:px-6 ${length === l.id ? 'text-white' : 'text-ink-2 hover:text-ink'}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 sm:mt-16">
            {PRICING.plans.map((p, i) => (
              <Parallax key={p.id} speed={i ? -0.035 : 0.035} className="reveal h-full" innerClassName="h-full" style={{ '--d': `${i * 100}ms` }}>
                <Plan plan={p} length={length} />
              </Parallax>
            ))}
          </div>

          <div className="reveal mt-4 grid gap-8 rounded-[2rem] bg-white/75 p-7 backdrop-blur sm:p-9 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col items-start gap-5">
              <h3 className="h3">Every month includes</h3>
              <SendMessage label="Get a free preview" />
            </div>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {PRICING.included.map((t) => (
                <li key={t} className="flex items-start gap-3 leading-snug text-ink-2"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-white"><Check className="h-3 w-3" /></span>{t}</li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm text-ink/55">{PRICING.note}</p>
        </div>
      </div>
    </section>
  );
}
