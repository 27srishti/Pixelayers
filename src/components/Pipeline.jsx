import { PIPELINE, still } from '../content.js';
import { Tag } from './ui.jsx';

/* "Send us whatever you have". Minimal and informative: a clear head, then one row per thing a business can send,
   saying what we take from it and an example. A short strip underneath answers the obvious follow-ups. */
const { sources: SOURCES, formats: FORMATS } = PIPELINE;

const USE = {
  web: { use: 'Your name, services, prices, colours and photos.', img: 'salon' },
  insta: { use: 'Your best posts, your look and your tone of voice.', img: 'salon-color' },
  fb: { use: 'Reviews, opening hours and the photos you already posted.', img: 'salon-bowls' },
  photos: { use: 'Your products, your space, your team. Phone shots are fine.', img: 'cafe' },
  clips: { use: 'We pick the best moments and build around them.', img: 'kitchen' },
};

function Glyph({ id }) {
  const s = { className: 'h-[18px] w-[18px]', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (id === 'web') return <svg {...s}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>;
  if (id === 'insta') return <svg {...s}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>;
  if (id === 'fb') return <svg {...s}><circle cx="12" cy="12" r="9" /><path d="M13.5 21v-7h2.5l.4-3h-2.9V9.3c0-.9.3-1.5 1.6-1.5h1.4V5.2a17 17 0 0 0-2.1-.1c-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.4v7" /></svg>;
  if (id === 'photos') return <svg {...s}><rect x="3.5" y="4.5" width="17" height="15" rx="3" /><circle cx="9" cy="10" r="1.6" /><path d="m4 17 5-4.5 4 3.5 2.5-2 4.5 3.5" /></svg>;
  return <svg {...s}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="m11 9.5 3 2.5-3 2.5z" fill="currentColor" /></svg>;
}

const FACTS = [
  ['Any one is enough', 'One link or a few photos will do.'],
  ['Nothing to film', 'No shoot, no editing on your side.'],
  ['Free preview first', '30 seconds, watermarked, in the chat.'],
  ['Vertical or wide', `${FORMATS.map((f) => f.id).join(' and ')} for Reels, YouTube or your site.`],
];

export default function Pipeline() {
  return (
    <section id="send" data-tone="stone" className="px-2 py-3 sm:px-3">
      <div className="room gutter pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div className="wrap">
          {/* head */}
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <Tag className="reveal"><span className="text-ink">02</span><span className="h-3 w-px bg-ink/20" />What to send</Tag>
              <h2 className="h2 reveal text-ink">Send us <span className="soft">whatever you have.</span></h2>
            </div>
            <p className="reveal max-w-md text-[17px] leading-relaxed text-ink/85 lg:justify-self-end">
              We turn what your business already has online and on your phone into the promo. Here is what we take from each.
            </p>
          </div>

          {/* the list */}
          <ul className="mt-12 border-t border-ink/10 sm:mt-16">
            {SOURCES.map((s, i) => (
              <li key={s.id} className="reveal group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-ink/10 py-5 sm:gap-x-6 sm:py-6 lg:grid-cols-[3rem_15rem_1fr_14rem_4.5rem]" style={{ '--d': `${i * 60}ms` }}>
                <span className="hidden font-mono text-[12px] text-ink-3 lg:block">{String(i + 1).padStart(2, '0')}</span>
                <span className="col-start-1 row-span-2 grid h-11 w-11 place-items-center rounded-xl bg-white text-[#0b0d12] shadow-[0_0_0_1px_rgb(18_18_18/0.06)] lg:hidden"><Glyph id={s.id} /></span>
                <span className="flex items-center gap-3 text-[19px] font-medium tracking-[-0.02em] text-ink sm:text-[22px]">
                  <span className="hidden h-9 w-9 place-items-center rounded-lg bg-white text-[#0b0d12] shadow-[0_0_0_1px_rgb(18_18_18/0.06)] lg:grid"><Glyph id={s.id} /></span>
                  {s.label}
                </span>
                <span className="col-start-2 text-[15px] leading-snug text-ink/75 sm:text-[16px] lg:col-start-auto">{USE[s.id].use}</span>
                <span className="hidden truncate font-mono text-[12.5px] text-ink-2 lg:block">{s.detail}</span>
                <img src={still(USE[s.id].img)} alt="" loading="lazy"
                  className="col-start-3 row-span-2 row-start-1 h-14 w-14 rounded-xl object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 lg:col-start-auto lg:row-span-1 lg:h-[4.5rem] lg:w-[4.5rem] lg:justify-self-end" />
              </li>
            ))}
          </ul>

          {/* follow-ups */}
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {FACTS.map(([t, d], i) => (
              <div key={t} className="reveal border-l border-ink/15 pl-5" style={{ '--d': `${i * 70}ms` }}>
                <dt className="font-medium tracking-[-0.01em] text-ink">{t}</dt>
                <dd className="mt-1 text-[14.5px] leading-snug text-ink/70">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
