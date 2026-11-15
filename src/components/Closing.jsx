import { LINKS, NAV, asset } from '../content.js';
import { Arrow } from './ui.jsx';

export default function Closing() {
  return (
    <>
      <section className="gutter py-24 sm:py-28">
        <div className="reveal mx-auto flex max-w-6xl flex-col items-center gap-7 rounded-[1.75rem] bg-ink px-6 py-16 text-center text-white sm:py-20">
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-balance">
            Your free sample video is one message away.
          </h2>
          <p className="max-w-md text-[17px] text-white/70">Send us a message. We’ll take it from there.</p>
          <a href={LINKS.message} target="_blank" rel="noreferrer" className="btn bg-white px-6 py-3.5 text-base text-ink hover:-translate-y-0.5">
            Send message <Arrow />
          </a>
        </div>
      </section>

      <footer className="gutter border-t border-line pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] pt-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <img src={asset('pixelayers-logo-horizontal.svg')} alt="Pixelayers" className="h-7 w-auto self-start" />
            <p className="text-sm text-muted">Done-for-you promo videos for small businesses.</p>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium text-muted">
            {NAV.map((n) => <li key={n.href}><a className="transition-colors hover:text-ink" href={n.href}>{n.label}</a></li>)}
            <li><a className="transition-colors hover:text-ink" href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram {LINKS.handle}</a></li>
          </ul>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-sm text-muted">© {new Date().getFullYear()} Pixelayers</p>
      </footer>
    </>
  );
}
