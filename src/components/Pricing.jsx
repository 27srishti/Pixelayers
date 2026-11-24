import { useRef } from 'react';
import { PRICING } from '../content.js';
import { passProgress, reduced, useInView, useScrollFrame } from '../hooks.js';
import { Check, Parallax, SendMessage, Tag } from './ui.jsx';

/* Pricing on a soft, lit grey band with frosted glass cards. Two plans whose "makes up
   to" bars fill when they come into view, a top-up, what every plan includes, then how credits work: the rates
   and a small chart of what common videos cost, drawn in seconds with the AI seconds in a darker shade. */
const BLUE = 'bg-[linear-gradient(150deg,#1c1c1f_0%,#2b2b30_100%)]';

function Bar({ share, dashed, dark, on, delay }) {
  const track = dark ? 'bg-white/25' : 'bg-ink/10';
  const fill = dark ? 'bg-white' : 'bg-ink';
  return (
    <span className={`relative block h-1.5 overflow-hidden rounded-full ${dashed ? '' : track}`}>
      <span className={`absolute inset-y-0 left-0 origin-left rounded-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${dashed ? '' : fill}`}
        style={{
          width: `${share * 100}%`,
          transform: on ? 'scaleX(1)' : 'scaleX(0)',
          transitionDelay: `${delay}ms`,
          backgroundImage: dashed ? `repeating-linear-gradient(90deg, ${dark ? '#fff' : '#121212'} 0 8px, transparent 8px 12px)` : undefined,
        }} />
    </span>
  );
}

function Plan({ plan }) {
  const [ref, on] = useInView({ threshold: 0.35 });
  const dark = plan.featured;
  const soft = dark ? 'text-white/70' : 'text-ink-2';
  return (
    <div ref={ref} className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9 ${dark ? `${BLUE} text-white shadow-[0_40px_80px_-40px_rgb(18_18_18/0.6)]` : 'glass'}`}>
      {dark && <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />}
      <div className="relative flex items-center justify-between gap-3">
        <h3 className="text-xl font-medium tracking-[-0.03em]">{plan.name}</h3>
        {plan.badge && <span className="rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white ring-1 ring-white/25">{plan.badge}</span>}
      </div>
      <div className="relative mt-6 flex items-end gap-3">
        <span className="text-[clamp(4rem,7vw,5.4rem)] font-medium leading-[0.85] tracking-[-0.06em]">${plan.price}</span>
        <span className={`pb-1.5 text-[15px] leading-tight ${soft}`}>
          {plan.then ? <>{plan.priceNote}<br />then <span className={dark ? 'text-white' : 'font-medium text-ink'}>${plan.then}</span> / mo</> : '/ mo'}
        </span>
      </div>

      <div className={`relative mt-7 border-t pt-6 ${dark ? 'border-white/20' : 'border-ink/10'}`}>
        <div className="flex items-baseline justify-between">
          <p><span className="text-2xl font-medium tracking-[-0.03em]">{plan.credits}</span> <span className={`text-[15px] ${soft}`}>credits / month</span></p>
          <span className={`font-mono text-[10.5px] uppercase tracking-[0.1em] ${soft}`}>Makes up to</span>
        </div>
        <ul className="mt-5 flex flex-col gap-4">
          {plan.makes.map((m, i) => (
            <li key={m.label} className="flex flex-col gap-2">
              <span className="flex items-baseline justify-between text-[15px]"><span>{m.label}</span><span className="font-medium tracking-[-0.01em]">{m.value}</span></span>
              <Bar share={m.share} dashed={m.dashed} dark={dark} on={on} delay={i * 120} />
            </li>
          ))}
        </ul>
      </div>

      <ul className={`relative mt-7 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t pt-6 text-[14px] ${dark ? 'border-white/20' : 'border-ink/10'}`}>
        {plan.perks.map((t) => (
          <li key={t} className="flex items-center gap-2"><Check className={`h-3.5 w-3.5 shrink-0 ${dark ? 'text-white' : 'text-ink'}`} />{t}</li>
        ))}
      </ul>
    </div>
  );
}

function CostChart() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const max = Math.max(...PRICING.costs.map((c) => c.std + c.ai));
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2">What it costs</p>
        <p className="flex items-center gap-4 text-[12px] text-ink-2">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-ink/20" />Standard</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-ink" />AI</span>
        </p>
      </div>
      <ul className="mt-3">
        {PRICING.costs.map((c, i) => (
          <li key={c.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-ink/10 py-4 sm:grid-cols-[13rem_1fr_6rem]">
            <span className="text-[15px]">{c.label}</span>
            <span className="col-span-2 flex h-3 gap-0.5 sm:col-span-1 sm:row-start-1 sm:col-start-2">
              {[['std', 'bg-ink/20'], ['ai', 'bg-ink']].map(([k, cls], j) => c[k] > 0 && (
                <span key={k} className={`h-full origin-left rounded-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${cls}`}
                  style={{ width: `${(c[k] / max) * 100}%`, transform: on ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: `${i * 110 + j * 250}ms` }} />
              ))}
            </span>
            <span className="row-start-1 text-right sm:col-start-3"><span className="text-2xl font-medium tracking-[-0.04em]">{c.credits}</span> <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">credits</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Pricing() {
  const band = useRef(null);
  useScrollFrame((vh) => {
    if (!band.current || reduced()) return;
    band.current.style.backgroundPosition = `0 ${(passProgress(band.current, vh) * -80).toFixed(1)}px`;
  });
  const { topUp } = PRICING;
  return (
    <section id="pricing" data-tone="stone" className="px-2 py-3 sm:px-3">
      <div ref={band} className="room">
        <div className="gutter wrap py-20 sm:py-28">
          {/* head */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <Tag className="reveal"><span className="text-ink">04</span><span className="h-3 w-px bg-ink/20" />Pricing</Tag>
              <h2 className="h2 reveal">Simple pricing, <span className="soft">from $30.</span></h2>
            </div>
            <p className="lede reveal max-w-md self-end !text-ink/75">{PRICING.intro} Start with a free preview, then pick a plan in the chat.</p>
          </div>

          {/* plans */}
          <div className="mt-14 grid gap-4 md:grid-cols-2 sm:mt-16">
            {PRICING.plans.map((p, i) => (
              <Parallax key={p.id} speed={i ? -0.03 : 0.03} className="reveal h-full" innerClassName="h-full" style={{ '--d': `${i * 100}ms` }}>
                <Plan plan={p} />
              </Parallax>
            ))}
          </div>

          {/* top-up */}
          <div className="glass reveal mt-8 flex flex-wrap items-center justify-between gap-5 rounded-[1.75rem] px-7 py-5 sm:px-9">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-2">
              <p><span className="block font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink">Top-up</span><span className="text-2xl font-medium tracking-[-0.03em]">+{topUp.credits} credits</span></p>
              <p className="text-[14px] text-ink-2">{topUp.text} <span className="font-medium text-ink">{topUp.strong}</span><br />{topUp.note}</p>
            </div>
            <span className="text-4xl font-medium tracking-[-0.05em] text-ink">${topUp.price}</span>
          </div>

          {/* on every plan */}
          <p className="reveal mt-12 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2">On every plan</p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {PRICING.everyPlan.map((f, i) => (
              <li key={f.title} className="glass reveal rounded-2xl px-5 py-4" style={{ '--d': `${i * 60}ms` }}>
                <p className="font-medium tracking-[-0.02em]">{f.title}</p>
                <p className="mt-0.5 text-[14px] text-ink-2">{f.text}</p>
              </li>
            ))}
          </ul>

          {/* how credits work */}
          <div className="glass mt-20 rounded-[2rem] p-7 sm:mt-24 sm:p-10">
            <h3 className="reveal text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1] tracking-[-0.05em]">1 credit = 1 second <span className="soft">of standard video.</span></h3>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PRICING.rates.map((r, i) => (
                <li key={r.title} className="reveal glass rounded-[1.5rem] p-6" style={{ '--d': `${i * 80}ms` }}>
                  <p className="flex items-baseline gap-2"><span className="text-6xl font-medium leading-none tracking-[-0.05em]">{r.n}</span><span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">/ {r.unit}</span></p>
                  <p className="mt-6 font-medium tracking-[-0.02em]">{r.title}</p>
                  <p className="mt-1 text-[14px] leading-snug text-ink-2">{r.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-ink-2"><span className="font-medium text-ink">Mix them in one video.</span> Only the AI seconds count at the higher rate.</p>

            <div className="mt-12"><CostChart /></div>

            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2">Good to know</p>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PRICING.goodToKnow.map((g) => (
                <li key={g.title}><p className="font-medium tracking-[-0.02em]">{g.title}</p><p className="mt-1 text-[14px] leading-snug text-ink-2">{g.text}</p></li>
              ))}
            </ul>
          </div>

          {/* start */}
          <div className={`reveal relative mt-4 flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[2rem] px-7 py-8 text-white sm:px-10 ${BLUE}`}>
            <span aria-hidden="true" className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
            <div className="relative">
              <p className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.05em]">Start for $30.</p>
              <p className="mt-2 text-[15px] text-white/75">First month on Starter. 450 credits, about 15 Reels.</p>
            </div>
            <SendMessage size="lg" tone="white" label="Get a free preview" className="relative" />
          </div>
          <p className="mt-6 text-sm text-ink/55">Prices are in US dollars.</p>
        </div>
      </div>
    </section>
  );
}
