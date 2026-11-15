import { COMPARE } from '../content.js';
import { Check, SectionTitle } from './ui.jsx';

export default function Compare() {
  return (
    <section className="gutter border-y border-line bg-surface py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <SectionTitle center eyebrow="Why a plan">One video, or a whole pack?</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="reveal rounded-[1.25rem] border border-line bg-ground p-7 sm:p-9">
            <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-muted">{COMPARE.old.title}</h3>
            <ul className="mt-6 flex flex-col">
              {COMPARE.old.rows.map((r) => (
                <li key={r} className="flex items-start gap-3 border-t border-line py-4 text-muted">
                  <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 12h12" /></svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal card border-royal/40 p-7 shadow-[0_24px_50px_-30px_rgba(0,72,245,0.5)] sm:p-9" style={{ '--d': '120ms' }}>
            <h3 className="font-display text-xl font-semibold tracking-[-0.015em]">{COMPARE.ours.title}</h3>
            <ul className="mt-6 flex flex-col">
              {COMPARE.ours.rows.map((r) => (
                <li key={r} className="flex items-start gap-3 border-t border-line py-4 font-medium">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-royal text-white"><Check className="h-3 w-3" /></span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
