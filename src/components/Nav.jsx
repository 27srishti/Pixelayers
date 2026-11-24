import { useRef, useState } from 'react';
import { NAV, asset } from '../content.js';
import { useScrollFrame } from '../hooks.js';
import { SendMessage } from './ui.jsx';

/** Full-width bar. Transparent at the top, frosted once you scroll; tucks away while scrolling down. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const bar = useRef(null), last = useRef(0);
  useScrollFrame(() => {
    const y = window.scrollY, el = bar.current;
    if (!el) return;
    if (Math.abs(y - last.current) > 2) el.dataset.hidden = y > 500 && y > last.current && !open;
    el.dataset.top = y < 20;
    last.current = y;
  });
  return (
    <header ref={bar} data-hidden="false" data-top="true"
      className="group fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[hidden=true]:-translate-y-full data-[top=false]:border-b data-[top=false]:border-line data-[top=false]:bg-ground/80 data-[top=false]:backdrop-blur-xl">
      <nav className="gutter wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex shrink-0 items-center" aria-label="Pixelayers, back to top">
          <img src={asset('pixelayers-logo-horizontal.svg')} alt="Pixelayers" className="h-6 w-auto" />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} className="rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors hover:text-ink">{n.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <SendMessage size="sm" />
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path className="origin-center transition-transform duration-300" style={{ transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }} d="M4 8h16" />
              <path className="origin-center transition-transform duration-300" style={{ transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }} d="M4 16h16" />
            </svg>
          </button>
        </div>
      </nav>
      <div className={`overflow-hidden border-line bg-ground/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${open ? 'max-h-96 border-b opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}>
        <ul className="gutter flex flex-col pb-4">
          {NAV.map((n) => (
            <li key={n.href} className="border-t border-line first:border-t-0">
              <a href={n.href} onClick={() => setOpen(false)} className="block py-3.5 text-2xl font-medium tracking-[-0.03em]">{n.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
