import { useEffect, useRef } from 'react';
import { media } from '../content.js';
import { reduced } from '../hooks.js';

/* A stream of the sample videos flowing through 3D space. Frames are born small and faint at a vanishing point,
   travel outward along evenly spaced, gently curving lanes, and grow until they leave the screen. Far frames are
   stills; once a frame comes close it switches to the live video of the same business. Scrolling speeds the
   stream up and flies the camera forward; the pointer nudges the vanishing point. Paused while off screen.

   `fly` (0–1, optional getter) lets the parent push the camera forward, e.g. from scroll progress. */
const IDS = ['salon', 'cafe', 'medspa', 'kitchen', 'giftshop'];
const STILLS = Array.from({ length: 25 }, (_, i) => `${import.meta.env.BASE_URL}media/stream/${String(i).padStart(2, '0')}.jpg`);
const FAR = 7.5, NEAR = 0.3, DEPTH = FAR - NEAR;

export default function Stream({ className = '', dark = false, density = 1, fly }) {
  const canvas = useRef(null);
  const flyRef = useRef(fly);
  useEffect(() => { flyRef.current = fly; });

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const still = reduced();
    const imgs = STILLS.map((src) => { const im = new Image(); im.decoding = 'async'; im.src = src; return im; });
    const vids = IDS.map((id, i) => {
      const v = document.createElement('video');
      Object.assign(v, { muted: true, loop: true, playsInline: true, preload: 'auto' });
      v.setAttribute('playsinline', '');
      v.src = `${media(`${id}.mp4`)}#t=${2 + i * 1.7}`;
      return v;
    });

    let W = 0, H = 0, dpr = 1, lanesN = 0, tiles = [];
    const RATIOS = [16 / 9, 16 / 9, 16 / 9, 9 / 16, 5 / 4]; // height / width: vertical, wide, and 4:5 image posts
    const pick = (t) => { t.vid = (Math.random() * IDS.length) | 0; t.img = t.vid * 5 + ((Math.random() * 5) | 0); t.ar = RATIOS[(Math.random() * RATIOS.length) | 0]; };
    const build = (lanes, perLane) => {
      tiles = [];
      for (let l = 0; l < lanes; l++) {
        const a = (l / lanes) * Math.PI * 2 + 0.15;
        const r = [1.0, 1.32, 1.14][l % 3];
        const off = (l * 0.618) % 1;
        for (let j = 0; j < perLane; j++) {
          const t = { a, r, z: NEAR + ((j + off) / perLane) * DEPTH };
          pick(t);
          tiles.push(t);
        }
      }
    };
    const resize = () => {
      const rect = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width; H = rect.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const n = Math.round((W < 700 ? 9 : 14) * density);
      if (n !== lanesN) { lanesN = n; build(n, W < 700 ? 4 : 6); }
    };
    resize();

    let px = 0, py = 0, tx = 0, ty = 0, boost = 0, lastY = window.scrollY, flyE = 0;
    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('resize', resize);

    const draw = (dt) => {
      const y = window.scrollY;
      boost += (Math.min(5, Math.abs(y - lastY) * 0.018) - boost) * 0.07;
      lastY = y;
      px += (tx - px) * 0.035; py += (ty - py) * 0.035;
      flyE += ((flyRef.current ? flyRef.current() : 0) - flyE) * 0.12;

      const narrow = W < 700;
      const f = Math.min(W, H) * (narrow ? 0.46 : 0.5) * (1 + flyE * 0.9);
      const cx = W / 2 + px * 36, cy = H * (narrow ? 0.5 : 0.47) + py * 24;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (!still) {
        const step = (0.36 + boost + flyE * 1.2) * dt;
        for (const t of tiles) {
          t.z -= step;
          if (t.z < NEAR) { t.z += DEPTH; pick(t); }
        }
      }
      tiles.sort((a, b) => b.z - a.z);
      for (const t of tiles) {
        const ang = t.a + (FAR - t.z) * 0.06;
        const sx = cx + (Math.cos(ang) * t.r * f) / t.z;
        const sy = cy + (Math.sin(ang) * t.r * f * (narrow ? 1.5 : 0.7)) / t.z;
        const size = (0.29 * f) / t.z, w = size / Math.sqrt(t.ar), h = size * Math.sqrt(t.ar);
        if (sx + w < 0 || sx - w > W || sy + h < 0 || sy - h > H) continue;

        const born = Math.min(1, (FAR - t.z) / 2.4);
        const leaving = Math.min(1, (t.z - NEAR) / 0.45);
        const dx = (sx - cx) / (W * (narrow ? 0.9 : 0.33)), dy = (sy - cy) / (H * (narrow ? 0.27 : 0.31));
        const centre = Math.min(1, Math.max(0.03, (Math.hypot(dx, dy) - 0.7) * 1.8));
        const alpha = born * leaving * centre * (dark ? 0.9 : 1);
        if (alpha < 0.02) continue;

        // close frames play the live video of the same business
        const v = vids[t.vid];
        const src = t.z < 2.6 && v.readyState >= 2 ? v : imgs[t.img];
        if (src === imgs[t.img] && (!src.complete || !src.naturalWidth)) continue;

        const x = sx - w / 2, top = sy - h / 2, rad = Math.max(3, w * 0.08);
        ctx.globalAlpha = alpha;
        if (t.z < 1.6) {
          ctx.shadowColor = dark ? 'rgba(0,0,0,0.5)' : 'rgba(18,18,18,0.22)';
          ctx.shadowBlur = w * 0.25;
          ctx.shadowOffsetY = w * 0.1;
          ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.roundRect(x, top, w, h, rad); ctx.fill();
          ctx.shadowColor = 'transparent';
        }
        ctx.save();
        ctx.beginPath(); ctx.roundRect(x, top, w, h, rad); ctx.clip();
        const sw = src.videoWidth || src.naturalWidth, sh = src.videoHeight || src.naturalHeight;
        const k = Math.max(w / sw, h / sh), cw = w / k, ch = h / k; // cover crop, a little below centre
        ctx.drawImage(src, (sw - cw) / 2, Math.min(sh - ch, (sh - ch) * 0.6), cw, ch, x, top, w, h);
        ctx.restore();
        ctx.lineWidth = Math.max(1, w * 0.018);
        ctx.strokeStyle = dark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.95)';
        ctx.beginPath(); ctx.roundRect(x, top, w, h, rad); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, last = performance.now(), visible = false;
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = visible && !still ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      vids.forEach((v) => (visible && !still ? v.play().catch(() => {}) : v.pause()));
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    io.observe(cv);
    imgs.forEach((im) => im.addEventListener('load', () => { if (!raf) draw(0); }, { once: true }));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      vids.forEach((v) => { v.pause(); v.removeAttribute('src'); v.load(); });
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, [dark, density]);

  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
