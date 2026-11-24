import { useState } from 'react';
import { FAQ } from '../content.js';
import { Tag } from './ui.jsx';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" data-tone="stone" className="px-2 py-3 sm:px-3">
      <div className="room gutter py-20 sm:py-28">
      <div className="wrap grid lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6 pb-10 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-line lg:px-10">
          <Tag className="reveal"><span className="text-ink">05</span><span className="h-3 w-px bg-ink/20" />Questions</Tag>
          <h2 className="h2 reveal">Good <span className="soft">to know.</span></h2>
        </div>
        <ul className="reveal border-line lg:border-x lg:px-10">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="border-b border-line first:border-t lg:first:border-t-0">
                <button type="button" id={`faq-${i}`} aria-expanded={on} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(on ? -1 : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="text-lg font-medium tracking-[-0.02em] transition-colors group-hover:text-ink-2 sm:text-xl">{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? 'rotate-45 border-ink bg-ink text-white' : 'border-line'}`}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-${i}`} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden"><p className="lede max-w-lg pb-7">{f.a}</p></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      </div>
    </section>
  );
}
