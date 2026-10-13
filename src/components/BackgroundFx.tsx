"use client";

import { useEffect, useRef } from "react";

interface Streak {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
}

interface Dust {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

/**
 * Atmospheric page background: thin "data rain" streaks, twinkling dust, and
 * a soft spotlight that follows the cursor (drifts on its own on touch
 * devices). One canvas, capped pixel ratio, fewer particles on small screens,
 * paused when the tab is hidden, and reduced to a single static frame when
 * the visitor prefers reduced motion.
 */
export default function BackgroundFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spot = spotRef.current;
    if (!canvas || !spot) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let streaks: Streak[] = [];
    let dust: Dust[] = [];
    const target = { x: 0.5, y: 0.28 };
    const pos = { x: 0.5, y: 0.28 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const seed = () => {
      const density = coarsePointer || w < 700 ? 0.5 : 1;
      const streakCount = reduceMotion ? 0 : Math.round(Math.min(110, w / 14) * density);
      const dustCount = Math.round(Math.min(90, w / 18) * density);
      streaks = Array.from({ length: streakCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        len: rand(14, 46),
        speed: rand(260, 520),
        alpha: rand(0.07, 0.26)
      }));
      dust = Array.from({ length: dustCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.6, 1.5),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.4, 1.2)
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(0, 0);
      paintSpot();
    };

    const draw = (t: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const d of dust) {
        const a = 0.12 + 0.38 * (0.5 + 0.5 * Math.sin(t * d.speed + d.phase));
        ctx.fillStyle = `rgba(186, 230, 253, ${a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 1;
      for (const s of streaks) {
        s.y += s.speed * dt;
        s.x -= s.speed * dt * 0.12;
        if (s.y - s.len > h) {
          s.y = -s.len;
          s.x = rand(0, w + 80);
        }
        if (s.x < -20) s.x = w + 20;
        ctx.strokeStyle = `rgba(34, 211, 238, ${s.alpha})`;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len * 0.12, s.y - s.len);
        ctx.stroke();
      }
    };

    const paintSpot = () => {
      spot.style.background = `radial-gradient(620px circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(34,211,238,0.10), rgba(59,130,246,0.04) 45%, transparent 70%)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX / w;
      target.y = e.clientY / h;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;

      if (coarsePointer) {
        target.x = 0.5 + 0.28 * Math.sin(t * 0.18);
        target.y = 0.3 + 0.12 * Math.cos(t * 0.23);
      }
      pos.x += (target.x - pos.x) * 0.06;
      pos.y += (target.y - pos.y) * 0.06;

      draw(t, dt);
      paintSpot();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || reduceMotion) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!coarsePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(14,116,144,0.18),transparent_55%)]"
      />
      <div ref={spotRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
    </>
  );
}
