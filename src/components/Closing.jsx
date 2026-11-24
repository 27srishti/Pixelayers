import { LINKS, NAV, asset } from '../content.js';
import Stream from './Stream.jsx';
import { SendMessage, Tag } from './ui.jsx';

/* The closing call to action: a dark card with the video stream flowing behind it, bookending the hero. */
export default function Closing() {
  return (
    <>
      <section className="px-2 sm:px-3">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-white sm:rounded-[2.5rem]">
          <Stream dark density={0.8} className="absolute inset-0 h-full w-full opacity-70" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,#121212_0%,rgb(18_18_18/0.85)_50%,rgb(18_18_18/0)_100%)]" />
          <div className="gutter relative flex min-h-[38rem] flex-col items-center justify-center py-24 text-center sm:min-h-[44rem]">
            <Tag dark className="reveal">One message away</Tag>
            <h2 className="display reveal mt-7 max-w-[13ch] text-[clamp(2.8rem,6.6vw,6rem)]">Your free preview <span className="text-white/40">is waiting.</span></h2>
            <p className="reveal mt-7 max-w-md text-[17px] leading-relaxed text-white/65">Send us your website. We’ll send back a 30-second promo for your business, in the same chat.</p>
            <div className="reveal mt-10"><SendMessage size="lg" tone="white" /></div>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="reveal mt-6 text-sm text-white/55 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white">or find us on Instagram {LINKS.handle}</a>
          </div>
        </div>
      </section>

      <footer className="gutter pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] pt-14">
        <div className="wrap flex flex-wrap items-start justify-between gap-10 border-b border-line pb-10">
          <div className="flex flex-col gap-3">
            <img src={asset('pixelayers-logo-horizontal.svg')} alt="Pixelayers" className="h-7 w-auto self-start" />
            <p className="max-w-xs text-sm text-ink-3">Animated promo videos for small businesses, made from your website.</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-14 gap-y-2.5 text-sm text-ink-2 sm:grid-cols-3">
            {NAV.map((n) => <li key={n.href}><a className="transition-colors hover:text-ink" href={n.href}>{n.label}</a></li>)}
            <li><a className="transition-colors hover:text-ink" href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
        <div className="wrap flex items-center justify-between pt-6 text-sm text-ink-3">
          <span>© {new Date().getFullYear()} Pixelayers</span>
          <span>{LINKS.handle}</span>
        </div>
      </footer>
    </>
  );
}
