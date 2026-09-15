import React, { useEffect, useState } from 'react';

export default function BackgroundLayer() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax traversal: Wasim remains visually anchored and massive,
  // slowly revealing his figure from head/fists -> chest/star -> waist -> lower body.
  // 3000px of page scroll maps to ~1140px of vertical travel through his massive body.
  const translateY = Math.round(-(scrollY * 0.38));

  // Opacity progression:
  // Hero (0-600px): Bold, vibrant, clear 1992 green jersey and roaring face (0.84 -> 0.72)
  // About & Statement (600-2200px): Strong, clearly visible chest, Pepsi logo & Pakistan star (0.72 -> 0.58)
  // Legacy (2200-2900px): Lower torso, trousers & legs on turf (0.58 -> 0.42)
  // Transition to Book (2900px+): Smoothly fades out as user reaches the exclusive book purchase section
  let opacity = 0.84;
  if (scrollY <= 600) {
    opacity = 0.84 - (scrollY / 600) * 0.12;
  } else if (scrollY <= 2200) {
    opacity = 0.72 - ((scrollY - 600) / 1600) * 0.14;
  } else if (scrollY <= 2900) {
    opacity = 0.58 - ((scrollY - 2200) / 700) * 0.16;
  } else {
    opacity = Math.max(0, 0.42 - ((scrollY - 2900) / 600) * 0.42);
  }

  return (
    <div className="cinematic-fixed-bg-root" aria-hidden="true">
      {/* 
        MASSIVE PERSISTENT WASIM AKRAM LAYER
        Scales far beyond viewport so user scrolls through head -> chest -> waist -> legs.
        Visually anchored with GPU-accelerated translate3d.
      */}
      <div
        className="wasim-stationary-frame"
        style={{
          transform: `translate3d(0, ${translateY}px, 0)`,
          opacity: opacity,
          '--wasim-translate-y': `${translateY}px`
        }}
      >
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
