import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

export const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Remaps p so it runs 0→1 between a and b. */
export const range = (p, a, b) => clamp((p - a) / (b - a));
export const ease = (t) => 1 - (1 - t) ** 3;
export const lerp = (a, b, t) => a + (b - a) * t;
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/* ---------- one shared scroll loop ----------
   Every scroll-linked effect subscribes here. On scroll or resize a single requestAnimationFrame runs all
   subscribers, which write styles straight to the DOM (no React re-renders while scrolling). */
const subs = new Set();
let queued = false;
let vh = typeof window !== 'undefined' ? window.innerHeight : 800;
let vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
const run = () => {
  queued = false;
  subs.forEach((fn) => fn(vh, vw));
};
export const requestFrame = () => {
  if (!queued) { queued = true; requestAnimationFrame(run); }
};
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', () => { vh = window.innerHeight; vw = window.innerWidth; requestFrame(); });
  window.addEventListener('load', requestFrame);
}

/** Runs `fn(vh, vw)` on every scroll frame (and once on mount). */
export function useScrollFrame(fn) {
  const ref = useRef(fn);
  useLayoutEffect(() => { ref.current = fn; });
  useEffect(() => {
    const f = (h, w) => ref.current(h, w);
    subs.add(f);
    requestFrame();
    return () => { subs.delete(f); };
  }, []);
}

/** 0→1 while a tall section scrolls through its sticky stage. */
export const pinProgress = (el, h) => {
  const r = el.getBoundingClientRect();
  return clamp(-r.top / Math.max(1, r.height - h));
};
/** 0→1 from when the element enters at the bottom of the screen until it leaves at the top. */
export const passProgress = (el, h) => {
  const r = el.getBoundingClientRect();
  return clamp((h - r.top) / (h + r.height));
};

/** Scroll reveal for every `.reveal` element. Anything already on screen stays visible; only what starts
 *  below the fold is hidden, then eased in as it scrolls into view. */
export function useScrollReveal() {
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) { el.classList.add('pre'); io.observe(el); }
    });
    return () => io.disconnect();
  }, []);
}

/** True while the element is on screen. */
export function useInView(options = { threshold: 0.35 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

/** Eases a number toward `target` whenever it changes. */
export function useCountTo(target, ms = 700) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduced()) { setValue(target); from.current = target; return undefined; }
    const start = performance.now(), a = from.current;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / ms), k = 1 - (1 - p) ** 3;
      const v = a + (target - a) * k;
      setValue(v); from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return Math.round(value);
}

/** Pointer position over an element as CSS vars --px / --py (−1…1), for depth parallax. */
export function usePointerVars() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !matchMedia('(pointer: fine)').matches) return undefined;
    let raf = 0, x = 0, y = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 2 - 1;
      y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; el.style.setProperty('--px', x.toFixed(3)); el.style.setProperty('--py', y.toFixed(3)); });
    };
    const leave = () => { el.style.setProperty('--px', 0); el.style.setProperty('--py', 0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

/** Buttery smooth scrolling (skipped when the visitor asks for reduced motion). In-page links glide too. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return undefined;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let raf = requestAnimationFrame(function loop(t) { lenis.raf(t); raf = requestAnimationFrame(loop); });
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      const target = id === '#top' ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: id === '#top' ? 0 : -72, duration: 1.4 });
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);
}
