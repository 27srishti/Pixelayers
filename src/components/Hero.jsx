import { BUSINESS_TYPES } from '../content.js';
import { Arrow, Check, Reel, SendMessage } from './ui.jsx';

const POINTS = ['Free sample video', 'Nothing to film', '10 videos a month'];

export default function Hero() {
  return (
    <section id="top" className="gutter pt-32 sm:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-royal" />
            Done-for-you promo videos
          </span>
          <h1 className="animate-rise font-display text-[clamp(2.5rem,5.4vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance" style={{ animationDelay: '80ms' }}>
            Promo videos for your business, <span className="text-royal">done for you.</span>
          </h1>
          <p className="animate-rise max-w-lg text-lg leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
            Send us your business name, a link and a few photos. Our team plans, designs and delivers ready-to-post videos.
          </p>
          <div className="animate-rise flex flex-wrap items-center gap-3" style={{ animationDelay: '240ms' }}>
            <SendMessage size="lg" />
            <a href="#samples" className="btn btn-ghost px-6 py-3.5 text-base">See samples</a>
          </div>
          <ul className="animate-rise flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm text-muted" style={{ animationDelay: '320ms' }}>
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2"><Check className="h-4 w-4 text-royal" />{p}</li>
            ))}
          </ul>
        </div>

        {/* three concept samples, the middle one forward */}
        <div className="animate-rise relative mx-auto flex w-full max-w-[30rem] items-center justify-center gap-4" style={{ animationDelay: '200ms' }}>
          <Reel id="cafe" label="Concept sample for a café" tag={false} className="w-[27%] translate-y-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-4" />
          <Reel id="salon" label="Concept sample for a hair salon" className="w-[40%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2" />
          <Reel id="medspa" label="Concept sample for a med spa" tag={false} className="w-[27%] translate-y-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-4" />
          <div className="glass absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm sm:left-auto sm:right-0 sm:translate-x-0">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-tint text-royal"><Check /></span>
            <span><span className="block font-semibold leading-tight">Your sample is ready</span><span className="text-muted">Delivered in chat</span></span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl border-y border-line py-5 sm:mt-28">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-10 text-sm font-medium text-muted">
            {[...BUSINESS_TYPES, ...BUSINESS_TYPES].map((b, i) => (
              <span key={i} aria-hidden={i >= BUSINESS_TYPES.length} className="flex items-center gap-10">{b}<span className="h-1 w-1 rounded-full bg-line" /></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
