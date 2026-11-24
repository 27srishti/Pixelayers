import { useRef, useState } from 'react';
import { NAV, asset } from '../content.js';
import { useScrollFrame } from '../hooks.js';
import { SendMessage } from './ui.jsx';

/** Frosted pill that tucks away while you scroll down and comes back as soon as you scroll up. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const bar = useRef(null), last = useRef(0);
  useScrollFrame(() => {
    const y = window.scrollY, el = bar.current;
    if (!el) return;
    const hide = y > 400 && y > last.current + 2 && !open;
    if (Math.abs(y - last.current) > 2) el.dataset.hidden = hide;
    el.dataset.top = y < 20;
    last.current = y;
  });
  return (
    <header ref={bar} data-hidden="false" data-top="true"
      className="group fixed inset-x-0 top-0 z-50 pt-[max(12px,env(safe-area-inset-top,0px))] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[hidden=true]:-translate-y-[130%]">
      <div className="gutter">
        <nav className="frosted mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full pl-5 pr-2 transition-shadow duration-500 group-data-[top=true]:shadow-none">
          <a href="#top" className="flex shrink-0 items-center" aria-label="Pixelayers, back to top">
            <img src={asset('pixelayers-logo-horizontal.svg')} alt="Pixelayers" className="h-6 w-auto" />
          </a>
          <ul className="hidden items-center lg:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors duration-200 hover:bg-shell hover:text-ink">{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <SendMessage size="sm" />
            <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-shell lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path className="origin-center transition-transform duration-300" style={{ transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }} d="M4 8h16" />
                <path className="origin-center transition-transform duration-300" style={{ transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }} d="M4 16h16" />
              </svg>
            </button>
          </div>
        </nav>
        <div className={`frosted mx-auto mt-2 max-w-5xl overflow-hidden rounded-[1.75rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${open ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}>
          <ul className="flex flex-col p-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-display text-2xl tracking-tight hover:bg-shell">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
