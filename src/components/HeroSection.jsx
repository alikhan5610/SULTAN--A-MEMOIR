import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function HeroSection() {
  const { setIsPreviewModalOpen } = useStore();

  const heroStats = [
    { value: '916', label: 'International Wickets', sub: 'Combined Test & ODI' },
    { value: '1992', label: 'World Cup Champion', sub: 'Man of the Match, MCG' },
    { value: '502', label: 'ODI Wickets', sub: 'First Bowler to 500' },
    { value: '414', label: 'Test Wickets', sub: 'Left-arm World Record' }
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '130px',
        paddingBottom: '50px',
        zIndex: 5
      }}
    >
      <div className="editorial-container" style={{ width: '100%' }}>
        {/* Editorial Content Container on the Left */}
        <div className="hero-content-wrapper">
          {/* Small Label */}
          <div
            className="hero-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 18px',
              background: 'rgba(5, 93, 9, 0.45)',
              border: '1px solid var(--gold-border)',
              borderRadius: '20px',
              marginBottom: '22px',
              backdropFilter: 'blur(8px)'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--gold-primary)',
                boxShadow: '0 0 10px var(--gold-primary)'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold-bright)'
              }}
            >
              THE LEGACY OF A CRICKET LEGEND
            </span>
          </div>

          {/* Main Title: WASIM AKRAM */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.4rem, 7.5vw, 6.2rem)',
              fontWeight: 900,
              letterSpacing: '0.04em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              color: 'var(--ivory-white)',
              marginBottom: '24px',
              textShadow: '0 15px 50px rgba(0, 0, 0, 0.95)'
            }}
          >
            WASIM <span className="text-gold">AKRAM</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.08rem, 2vw, 1.35rem)',
              fontWeight: 400,
              color: 'var(--ivory-muted)',
              lineHeight: 1.65,
              maxWidth: '580px',
              marginBottom: '38px',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
            }}
          >
            A cinematic journey through the life, career, and legacy of one of Pakistan's greatest cricketers.
          </p>

          {/* Action Buttons */}
          <div
            className="hero-action-buttons"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '56px'
            }}
          >
            <a href="#the-book" className="btn-gold">
              <span>EXPLORE SULTAN: A MEMOIR</span>
              <ArrowRight size={16} />
            </a>

            <button
              onClick={() => setIsPreviewModalOpen(true)}
              className="btn-ghost"
              aria-label="Read a public preview of Page 1"
            >
              <BookOpen size={16} color="var(--gold-primary)" />
              <span>READ PREVIEW</span>
            </button>
          </div>
        </div>

        {/* Cinematic Stats Ribbon */}
        <div
          style={{
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            paddingTop: '32px',
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            position: 'relative',
            zIndex: 10
          }}
        >
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  color: 'var(--gold-bright)',
                  lineHeight: 1
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--ivory-white)',
                  marginTop: '6px'
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  marginTop: '2px'
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
