import { useRef } from 'react';
import { LINKS, NAV, asset } from '../content.js';
import { passProgress, reduced, useScrollFrame } from '../hooks.js';
import { Parallax, Reel, SendMessage } from './ui.jsx';

/* A soft pastel card that grows to full width as it scrolls in, with reels drifting at different depths inside. */
export default function Closing() {
  const card = useRef(null);
  useScrollFrame((vh) => {
    if (!card.current || reduced()) return;
    const p = passProgress(card.current, vh);
    const k = Math.min(1, p / 0.45);
    card.current.style.clipPath = `inset(0 ${((1 - k) * 6).toFixed(2)}% round ${(2.5 + (1 - k) * 1.5).toFixed(2)}rem)`;
  });
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="gutter">
          <div ref={card} className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#ebe6ff_0%,#ffe6d9_45%,#dcf2e7_100%)] px-6 py-24 sm:py-32">
            <Parallax speed={-0.18} aria-hidden="true" className="pointer-events-none absolute -left-6 top-10 hidden w-44 md:block" innerClassName="-rotate-6">
              <Reel id="giftshop" className="float-shadow" />
            </Parallax>
            <Parallax speed={0.12} aria-hidden="true" className="pointer-events-none absolute -right-4 bottom-0 hidden w-40 md:block" innerClassName="rotate-6">
              <Reel id="kitchen" className="float-shadow" />
            </Parallax>
            <Parallax speed={-0.06} aria-hidden="true" className="pointer-events-none absolute right-[16%] top-8 hidden w-28 opacity-80 blur-[1px] lg:block" innerClassName="rotate-3">
              <Reel id="cafe" className="float-shadow" />
            </Parallax>
            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
              <p className="reveal label">One message away</p>
              <h2 className="reveal display mt-6 text-[clamp(2.6rem,6.4vw,5.8rem)]">Your free preview is <em>waiting.</em></h2>
              <p className="lede reveal mt-6 max-w-md">Send us your website. We’ll send back a 30-second promo for your business, in the same chat.</p>
              <div className="reveal mt-10"><SendMessage size="lg" /></div>
              <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="reveal mt-5 text-sm text-ink-2 underline decoration-ink/20 underline-offset-4 hover:text-ink">or find us on Instagram {LINKS.handle}</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="gutter pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] pt-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 border-t border-line pt-8">
          <div className="flex flex-col gap-2">
            <img src={asset('pixelayers-logo-horizontal.svg')} alt="Pixelayers" className="h-7 w-auto self-start" />
            <p className="text-sm text-ink-3">Animated promo videos for small businesses.</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
            {NAV.map((n) => <li key={n.href}><a className="transition-colors hover:text-ink" href={n.href}>{n.label}</a></li>)}
            <li><a className="transition-colors hover:text-ink" href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
        <Parallax speed={0.15} aria-hidden="true" className="mx-auto mt-10 max-w-6xl overflow-hidden"
          innerClassName="select-none text-center font-display text-[17vw] font-light italic leading-[0.9] tracking-[-0.05em] text-ink/[0.06] xl:text-[15rem]">
          pixelayers
        </Parallax>
        <p className="mx-auto mt-4 max-w-6xl text-sm text-ink-3">© {new Date().getFullYear()} Pixelayers</p>
      </footer>
    </>
  );
}
