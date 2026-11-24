import { useEffect, useRef } from 'react';
import { reduced } from '../hooks.js';

/* A stream of frames from the sample videos flowing through 3D space. Frames are born small and faint at a
   vanishing point behind the headline, then sweep outward toward the viewer along gently curving lanes, getting
   larger and sharper until they leave the screen. Scrolling speeds the stream up; the pointer nudges the
   vanishing point. Drawn on a canvas, paused while off screen. */
const FRAMES = Array.from({ length: 25 }, (_, i) => `${import.meta.env.BASE_URL}media/stream/${String(i).padStart(2, '0')}.jpg`);
const FAR = 7, NEAR = 0.32;

export default function Stream({ className = '' }) {
  const canvas = useRef(null);

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const imgs = FRAMES.map((src) => { const im = new Image(); im.src = src; return im; });
    const still = reduced();

    let W = 0, H = 0, dpr = 1, count = 0;
    // frames travel in evenly spaced lanes, evenly spaced along each lane
    let tiles = [];
    const DEPTH = FAR - NEAR;
    const build = (lanes, perLane) => {
      tiles = [];
      for (let l = 0; l < lanes; l++) {
        const a = (l / lanes) * Math.PI * 2 + 0.2;
        const r = l % 2 ? 1.05 : 1.3;
        const off = (l * 0.37) % 1;
        for (let j = 0; j < perLane; j++) {
          tiles.push({ a, r, z: NEAR + ((j + off) / perLane) * DEPTH, img: (Math.random() * imgs.length) | 0 });
        }
      }
    };
    const resize = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      const n = W < 700 ? 8 : 12;
      if (n !== count) { count = n; build(n, W < 700 ? 4 : 6); }
    };
    resize();

    // pointer and scroll inputs, eased
    let px = 0, py = 0, tx = 0, ty = 0, boost = 0, lastY = window.scrollY;
    const onMove = (e) => { tx = (e.clientX / window.innerWidth) * 2 - 1; ty = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('resize', resize);

    const draw = (dt) => {
      const y = window.scrollY;
      boost += (Math.min(6, Math.abs(y - lastY) * 0.02) - boost) * 0.08;
      lastY = y;
      px += (tx - px) * 0.04; py += (ty - py) * 0.04;
      const speed = 0.38 + boost;

      const f = Math.min(W, H) * (W < 700 ? 0.42 : 0.5);
      const cx = W / 2 + px * 40, cy = H * 0.46 + py * 26 - Math.min(y, H) * 0.25;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      for (const t of tiles) {
        if (!still) {
          t.z -= speed * dt;
          if (t.z < NEAR) { t.z += DEPTH; t.img = (Math.random() * imgs.length) | 0; }
        }
      }
      tiles.sort((a, b) => b.z - a.z); // far first
      for (const t of tiles) {
        const im = imgs[t.img];
        if (!im.complete || !im.naturalWidth) continue;
        const ang = t.a + (FAR - t.z) * 0.07; // lanes curve gently as frames approach
        const sx = cx + (Math.cos(ang) * t.r * f) / t.z;
        const sy = cy + (Math.sin(ang) * t.r * f * 0.72) / t.z;
        const w = (0.24 * f) / t.z, h = w * 16 / 9;
        if (sx + w < 0 || sx - w > W || sy + h < 0 || sy - h > H) continue;
        // fade in from the distance, fade out right before passing the viewer, and stay quiet behind the words
        const born = Math.min(1, (FAR - t.z) / 2.2);
        const leaving = Math.min(1, (t.z - NEAR) / 0.5);
        const narrow = W < 700;
        const dx = (sx - cx) / (W * (narrow ? 0.55 : 0.34)), dy = (sy - cy) / (H * (narrow ? 0.3 : 0.32));
        const centre = Math.min(1, Math.max(0.06, (Math.hypot(dx, dy) - 0.55) * 1.6));
        const alpha = born * leaving * centre;
        if (alpha < 0.02) continue;
        ctx.globalAlpha = alpha;
        const x = sx - w / 2, yy = sy - h / 2, rad = Math.max(3, w * 0.09);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, yy, w, h, rad);
        ctx.clip();
        ctx.drawImage(im, x, yy, w, h);
        ctx.restore();
        ctx.lineWidth = Math.max(1, w * 0.02);
        ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.roundRect(x, yy, w, h, rad);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, last = performance.now(), visible = true;
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = visible && !still ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    io.observe(cv);
    // draw once images arrive (also the only draw when motion is reduced)
    imgs.forEach((im) => im.addEventListener('load', () => { if (!raf) draw(0); }, { once: true }));
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
