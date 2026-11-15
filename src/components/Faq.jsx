import { useState } from 'react';
import { FAQ } from '../content.js';
import { SectionTitle } from './ui.jsx';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="gutter border-t border-line bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle eyebrow="Quick answers">What you need to get started.</SectionTitle>
        <ul className="reveal flex flex-col border-b border-line">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="border-t border-line">
                <button type="button" id={`faq-${i}`} aria-expanded={on} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(on ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold tracking-[-0.01em] transition-colors hover:text-royal">
                  {f.q}
                  <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 text-muted transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </button>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-${i}`} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
