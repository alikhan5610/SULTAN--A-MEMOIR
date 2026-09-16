import React, { useEffect, useRef } from 'react';

export default function BackgroundLayer() {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth <= 767;

      // ── Parallax rate ──────────────────────────────────────────────────
      // Desktop: 0.38 scroll-ratio (slower = cinematic depth)
      // Mobile:  0.22 scroll-ratio (gentler for the taller stacked layout)
      const rate = isMobile ? 0.22 : 0.38;
      const translateY = -(scrollY * rate);

      // ── Opacity progression ────────────────────────────────────────────
      // Desktop: unchanged — Wasim fades as user enters Book Showcase
      // Mobile:  thresholds scaled up because content stacks vertically
      //          (page is ~2.5× taller). He stays vivid through Hero →
      //          About → Legacy → Book Showcase heading, then fades.
      let opacity;

      if (isMobile) {
        if (scrollY <= 1200) {
          opacity = 0.84 - (scrollY / 1200) * 0.12;            // 0.84 → 0.72
        } else if (scrollY <= 5000) {
          opacity = 0.72 - ((scrollY - 1200) / 3800) * 0.18;   // 0.72 → 0.54
        } else if (scrollY <= 6800) {
          opacity = 0.54 - ((scrollY - 5000) / 1800) * 0.20;   // 0.54 → 0.34
        } else {
          opacity = Math.max(0, 0.34 - ((scrollY - 6800) / 900) * 0.34); // → 0
        }
      } else {
        // Desktop — original cinematic progression, completely unchanged
        if (scrollY <= 600) {
          opacity = 0.84 - (scrollY / 600) * 0.12;
        } else if (scrollY <= 2200) {
          opacity = 0.72 - ((scrollY - 600) / 1600) * 0.14;
        } else if (scrollY <= 2900) {
          opacity = 0.58 - ((scrollY - 2200) / 700) * 0.16;
        } else {
          opacity = Math.max(0, 0.42 - ((scrollY - 2900) / 600) * 0.42);
        }
      }

      // ── Write directly to the DOM — zero React re-renders, zero jank ──
      // On mobile/tablet (≤1024px) the CSS handles translate3d(-50%, Y, 0)
      // via the --wasim-translate-y custom property. We clear any stale
      // inline transform so the CSS rule always wins on narrow viewports.
      frame.style.setProperty('--wasim-translate-y', `${translateY}px`);
      if (window.innerWidth > 1024) {
        frame.style.transform = `translate3d(0, ${translateY}px, 0)`;
      } else {
        // Let CSS handle centering — only the custom property drives parallax
        frame.style.transform = '';
      }
      frame.style.opacity = opacity;

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Run once on mount so initial state is applied before first paint
    updateParallax();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="cinematic-fixed-bg-root" aria-hidden="true">
      {/*
        MASSIVE PERSISTENT WASIM AKRAM LAYER
        Direct DOM mutation drives all animation — zero React re-renders,
        zero jank. Only GPU-composited transform + opacity are touched.
      */}
      <div ref={frameRef} className="wasim-stationary-frame">
        <img
          src="/assets/hero-wasim-green.jpg"
          alt="Wasim Akram celebrating in Pakistan green uniform"
          className="wasim-stationary-img"
          fetchPriority="high"
        />
        {/* Soft edge feathering and atmospheric rim lighting */}
        <div className="wasim-figure-feather" />
      </div>

      {/* Cinematic Color Grading & Atmosphere Overlays */}
      <div className="cinematic-left-scrim" />
      <div className="cinematic-vignette-global" />
      <div className="cinematic-overlay-top" />
      <div className="cinematic-overlay-bottom" />

      {/* Ambient Star Crest Watermark */}
      <div className="cinematic-crest-watermark" />
    </div>
  );
}
