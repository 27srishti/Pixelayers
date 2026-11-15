import { CHAT, NOT_NEEDED, asset, media } from '../content.js';
import { SectionTitle } from './ui.jsx';

const FEATURES = [
  { title: 'Made from what you have', text: 'Your photos, your website or your social page. No shoot to book.',
    icon: <path d="M4 16l4.5-4.500 3.5 3.5L16 11l4 4M4 5h16v14H4zM9 9.500h.01" /> },
  { title: '10 videos, every month', text: 'A steady pack of ready-to-post videos on one simple plan.',
    icon: <path d="M4 7h16M4 7v12h16V7M8 3v4M16 3v4M10 11.500l4 2.500-4 2.500z" /> },
  { title: 'Sized for every placement', text: 'Vertical for Reels and Stories, with a cover for your feed.',
    icon: <path d="M7 3h10v18H7zM11 18h2" /> },
];

function Chat() {
  return (
    <div className="card flex h-full flex-col gap-3 p-5 sm:p-6">
      <div className="flex items-center gap-3 border-b border-line pb-4">
        <img src={asset('pixelayers-icon.svg')} alt="" className="h-9 w-9" />
        <div>
          <p className="font-semibold leading-tight">Pixelayers</p>
          <p className="text-sm text-muted">Message</p>
        </div>
      </div>
      {CHAT.map((m, i) => (
        <div key={i} className={`reveal flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`} style={{ '--d': `${200 + i * 220}ms` }}>
          <div className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-snug ${m.from === 'you' ? 'rounded-br-md bg-ink text-white' : 'rounded-bl-md bg-sand'}`}>
            {m.video && (
              <div className="relative mb-2 aspect-[9/12] w-32 overflow-hidden rounded-xl">
                <img src={media(`${m.video}.jpg`)} alt="" className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink shadow">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              </div>
            )}
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Bento() {
  return (
    <section id="why" className="gutter py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionTitle eyebrow="Done for you" sub="You tell us what you need. Our team plans, designs and delivers your videos, from start to finish.">
            A service, not software.
          </SectionTitle>
          <ul className="reveal flex flex-wrap gap-2">
            {NOT_NEEDED.map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-muted">{t}</li>
            ))}
          </ul>
          <ul className="flex flex-col">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="reveal flex gap-5 border-t border-line py-6" style={{ '--d': `${i * 90}ms` }}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-tint text-royal">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{f.icon}</svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.01em]">{f.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal lg:pt-4" style={{ '--d': '120ms' }}><Chat /></div>
      </div>
    </section>
  );
}
