import { useState } from 'react';
import { NAV, asset } from '../content.js';
import { useScrolled } from '../hooks.js';
import { SendMessage } from './ui.jsx';

export default function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ${scrolled || open ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'}`}>
      <nav className="gutter mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
        <a href="#top" className="flex shrink-0 items-center" aria-label="Pixelayers, back to top">
          <img src={asset('pixelayers-logo-horizontal.svg')} alt="Pixelayers" className="h-7 w-auto" />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <SendMessage size="sm" />
          <button type="button" className="btn btn-ghost h-9 w-9 md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path className="origin-center transition-transform duration-300" style={{ transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }} d="M4 8h16" />
              <path className="origin-center transition-transform duration-300" style={{ transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }} d="M4 16h16" />
            </svg>
          </button>
        </div>
      </nav>
      <div className={`grid transition-[grid-template-rows] duration-400 ease-out md:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <ul className="gutter flex flex-col pb-4">
            {NAV.map((n) => (
              <li key={n.href} className="border-t border-line">
                <a href={n.href} onClick={() => setOpen(false)} className="block py-3.5 font-medium">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
