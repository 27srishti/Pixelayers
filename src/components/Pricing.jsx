import { useState } from 'react';
import { PRICING } from '../content.js';
import { useCountTo } from '../hooks.js';
import { Check, Label, Parallax, SendMessage } from './ui.jsx';

function Plan({ plan, length }) {
  const price = useCountTo(plan.price[length]);
  const per = plan.price[length] / 10;
  return (
    <div className={`flex h-full flex-col rounded-[2rem] p-7 sm:p-10 ${plan.featured ? 'tone-lilac bg-[var(--tone)]' : 'card'}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-medium">{plan.title}</h3>
        <span className={`rounded-full px-3 py-1 text-[12px] ${plan.featured ? 'bg-white/80 text-ink' : 'bg-shell text-ink-2'}`}>{plan.tag}</span>
      </div>
      <p className="mt-10 flex items-baseline gap-1">
        <span className="font-display text-4xl font-light">$</span>
        <span className="font-display text-[clamp(5rem,10vw,7.5rem)] font-light leading-[0.85] tracking-[-0.04em] tabular-nums">{price}</span>
        <span className="ml-1 text-ink-2">/ month</span>
      </p>
      <p className="mt-auto border-t border-ink/10 pt-6 text-ink-2">
        10 videos, {length} seconds each. <span className="text-ink">${per % 1 ? per.toFixed(2) : per} a video.</span>
      </p>
    </div>
  );
}

export default function Pricing() {
  const [length, setLength] = useState('30');
  return (
    <section id="pricing" className="gutter py-24 sm:py-36">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-xl flex-col gap-5">
            <Label dot="#ffdb73" className="reveal">Pricing</Label>
            <h2 className="h2 reveal">Simple pricing, <em>from $30.</em></h2>
            <p className="lede reveal">One plan: 10 ready-to-post promo videos every month. Start with a free preview.</p>
          </div>
          <div className="reveal relative grid grid-cols-2 rounded-full border border-line bg-white p-1" role="tablist" aria-label="Video length">
            <span aria-hidden="true" className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: length === '60' ? 'translateX(100%)' : 'none' }} />
            {PRICING.lengths.map((l) => (
              <button key={l.id} id={`length-${l.id}`} type="button" role="tab" aria-selected={length === l.id} onClick={() => setLength(l.id)}
                className={`relative z-10 rounded-full px-4 py-2.5 text-sm transition-colors duration-300 sm:px-6 ${length === l.id ? 'text-white' : 'text-ink-2 hover:text-ink'}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid w-full gap-5 md:grid-cols-2">
          {PRICING.plans.map((p, i) => (
            <Parallax key={p.id} speed={i ? -0.04 : 0.04} className="reveal h-full" innerClassName="h-full" style={{ '--d': `${i * 100}ms` }}>
              <Plan plan={p} length={length} />
            </Parallax>
          ))}
        </div>

        <div className="reveal card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col items-start gap-5">
            <h3 className="font-display text-3xl font-light tracking-tight">Every month includes</h3>
            <SendMessage label="Get a free preview" />
          </div>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {PRICING.included.map((t) => (
              <li key={t} className="flex items-start gap-3 leading-snug text-ink-2"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-[#1d7a52]"><Check className="h-3 w-3" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-ink-3">{PRICING.note}</p>
      </div>
    </section>
  );
}
