import { STEPS } from '../content.js';
import { SectionTitle } from './ui.jsx';

export default function HowItWorks() {
  return (
    <section id="how" className="gutter border-y border-line bg-surface py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <SectionTitle eyebrow="How it works" sub="Four steps, and only the first one is yours.">
          From one message to a month of videos.
        </SectionTitle>
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="reveal group flex flex-col gap-3 border-t border-line pt-6 transition-colors duration-500 hover:border-royal" style={{ '--d': `${i * 100}ms` }}>
              <span className="text-sm font-semibold tabular-nums text-royal">0{i + 1}</span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.015em]">{s.title}</h3>
              <p className="leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
