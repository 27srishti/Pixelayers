import { useState } from 'react';
import { FAQ } from '../content.js';
import { Label } from './ui.jsx';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="gutter py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <Label dot="#9cc6ff" className="reveal">Questions</Label>
          <h2 className="h2 reveal">Good to <em>know.</em></h2>
        </div>
        <ul className="reveal flex flex-col gap-3">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className={`rounded-[1.5rem] border transition-colors duration-500 ${on ? 'border-transparent bg-white shadow-[0_20px_50px_-30px_rgb(27_24_36/0.3)]' : 'border-line bg-white/40'}`}>
                <button type="button" id={`faq-${i}`} aria-expanded={on} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(on ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left">
                  <span className="text-[17px] font-medium sm:text-lg">{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? 'rotate-45 bg-ink text-white' : 'bg-shell'}`}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-${i}`} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-xl px-6 pb-6 leading-relaxed text-ink-2">{f.a}</p>
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
