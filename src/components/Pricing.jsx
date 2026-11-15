import { useState } from 'react';
import { PRICING } from '../content.js';
import { useCountTo } from '../hooks.js';
import { Check, SectionTitle, SendMessage } from './ui.jsx';

function Plan({ plan, length, delay }) {
  const price = useCountTo(plan.price[length]);
  const per = plan.price[length] / 10;
  return (
    <div className="reveal h-full" style={{ '--d': `${delay}ms` }}>
      <div className={`card card-hover flex h-full flex-col gap-6 p-7 sm:p-9 ${plan.featured ? 'border-royal/40' : ''}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-xl font-semibold tracking-[-0.015em]">{plan.title}</h3>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.featured ? 'bg-tint text-royal' : 'bg-sand text-muted'}`}>{plan.tag}</span>
        </div>
        <p className="flex items-baseline gap-2">
          <span className="font-display text-6xl font-semibold leading-none tracking-[-0.04em] tabular-nums">${price}</span>
          <span className="text-muted">/ month</span>
        </p>
        <p className="text-muted">10 videos, {length} seconds each. ${per % 1 ? per.toFixed(2) : per} a video.</p>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [length, setLength] = useState('30');
  return (
    <section id="pricing" className="gutter py-24 sm:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
        <SectionTitle center eyebrow="Pricing" sub="One plan: 10 ready-to-post promo videos every month.">
          Simple pricing, from $30.
        </SectionTitle>

        <div className="reveal relative grid grid-cols-2 rounded-xl border border-line bg-surface p-1" role="tablist" aria-label="Video length">
          <span aria-hidden="true" className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: length === '60' ? 'translateX(100%)' : 'none' }} />
          {PRICING.lengths.map((l) => (
            <button key={l.id} id={`length-${l.id}`} type="button" role="tab" aria-selected={length === l.id} onClick={() => setLength(l.id)}
              className={`relative z-10 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-6 ${length === l.id ? 'text-white' : 'text-muted hover:text-ink'}`}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="grid w-full gap-5 md:grid-cols-2">
          {PRICING.plans.map((p, i) => <Plan key={p.id} plan={p} length={length} delay={i * 100} />)}
        </div>

        <div className="reveal card w-full p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <h3 className="font-display text-xl font-semibold tracking-[-0.015em]">Every month includes</h3>
            <SendMessage size="sm" label="Get a free sample" />
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {PRICING.included.map((t) => (
              <li key={t} className="flex items-start gap-3 leading-snug"><Check className="mt-0.5 h-4 w-4 shrink-0 text-royal" />{t}</li>
            ))}
          </ul>
        </div>
        <p className="text-center text-sm text-muted">{PRICING.note}</p>
      </div>
    </section>
  );
}
