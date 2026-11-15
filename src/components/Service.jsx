import { CHAT, NOT_NEEDED, media } from '../content.js';
import { SectionTitle, SendMessage } from './ui.jsx';

export default function Service() {
  return (
    <section className="gutter py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-8">
          <SectionTitle eyebrow="Done for you" sub="You tell us what you need. Our team plans, designs and delivers your videos, from start to finish.">
            A service, <span className="font-bold">not <span className="text-cyan">software</span></span>
          </SectionTitle>
          <ul className="grid w-full gap-3 sm:grid-cols-2">
            {NOT_NEEDED.map((t, i) => (
              <li key={t} className="reveal glass flex items-center gap-3 rounded-2xl px-4 py-3.5 font-medium" style={{ '--d': `${i * 80}ms` }}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/25 bg-white/10">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="reveal"><SendMessage /></div>
        </div>

        {/* a generic chat: this is the whole "interface" a customer ever uses */}
        <div className="reveal glass mx-auto w-full max-w-md rounded-[2rem] p-5 sm:p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="layer-grad shape h-10 w-10" />
            <div>
              <p className="font-display font-semibold leading-tight">Pixelayers</p>
              <p className="text-sm text-haze">Usually replies within a day</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-5">
            {CHAT.map((m, i) => (
              <div key={i} className={`reveal flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`} style={{ '--d': `${200 + i * 260}ms` }}>
                <div className={`max-w-[82%] rounded-2xl px-4 py-3 leading-snug ${m.from === 'you' ? 'rounded-br-md bg-royal text-white shadow-[0_10px_28px_rgba(0,72,245,0.45)]' : 'rounded-bl-md border border-white/15 bg-white/10'}`}>
                  {m.video && (
                    <div className="relative mb-2.5 aspect-[9/12] w-40 overflow-hidden rounded-xl">
                      <img src={media(`${m.video}.jpg`)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      <span className="absolute inset-0 grid place-items-center bg-night/25">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-royal">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-px" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                      </span>
                    </div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
