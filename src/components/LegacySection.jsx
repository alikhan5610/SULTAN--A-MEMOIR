import React from 'react';
import { Flame, Wind, Repeat, Trophy, Shield, Activity } from 'lucide-react';

export default function LegacySection() {
  const legacyChapters = [
    {
      icon: Flame,
      title: 'Lethal Pace',
      desc: 'Generating 145+ km/h rockets from an explosive 15-pace burst, leaving batsmen helpless to anticipate the release point.'
    },
    {
      icon: Wind,
      title: 'Two-Way Swing',
      desc: 'The master of aerodynamics. Moving the ball in the air both directions without any tell-tale alteration in grip or action.'
    },
    {
      icon: Repeat,
      title: 'Reverse Swing',
      desc: 'Pioneered the dark art of reverse swing alongside Imran Khan, turning an old scuffed ball into an unplayable missile.'
    },
    {
      icon: Trophy,
      title: '1992 MCG Triumph',
      desc: 'Man of the Match in the 1992 World Cup Final. Produced the two greatest consecutive deliveries in World Cup history.'
    },
    {
      icon: Shield,
      title: 'Clutch All-Rounder',
      desc: 'Not merely a bowler—a fierce lower-order batsman who scored 2,898 Test runs, including a magnificent 257* with 12 sixes.'
    },
    {
      icon: Activity,
      title: 'Unbreakable Resilience',
      desc: 'Diagnosed with Type 1 diabetes at the peak of his career in 1997, he conquered medical adversity to claim over 300 more wickets.'
    }
  ];

  return (
    <section
      id="legacy"
      style={{
        position: 'relative',
        padding: '120px 0',
        zIndex: 5
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-tagline">TWO DECADES OF SUPREMACY</div>
          <h2 className="section-title">
            THE <span className="text-gold">LEGACY</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From street matches in Model Town to the pinnacle of world cricket. A testament to technical mastery, relentless spirit, and national pride.
          </p>
        </div>

        {/* Legacy Presentation: Editorial Spread with Third Wasim Photo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '70px'
          }}
        >
          {/* Legacy Narrative & Features */}
          <div
            style={{
              gridColumn: 'span 7',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px'
            }}
            className="legacy-grid-col"
          >
            {legacyChapters.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <div
                  key={chapter.title}
                  style={{
                    background: 'rgba(2, 23, 5, 0.75)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '8px',
                    padding: '28px',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-primary)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '6px',
                      background: 'rgba(5, 93, 9, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      border: '1px solid rgba(87, 143, 6, 0.3)'
                    }}
                  >
                    <Icon size={20} color="var(--gold-bright)" />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: 'var(--ivory-white)',
                      marginBottom: '8px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {chapter.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                    {chapter.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Supporting Formal Wasim Photo (The Statesman & Legend) */}
          <div
            style={{
              gridColumn: 'span 5'
            }}
            className="legacy-image-col"
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95)',
                border: '1px solid var(--gold-border)'
              }}
            >
              <img
                src="/assets/wasim-legacy.jpg"
                alt="Wasim Akram in formal tailored suit, representing the enduring statesman of world cricket"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'contrast(1.05) brightness(0.95)'
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(1, 14, 3, 0.92) 0%, transparent 45%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-bright)',
                    marginBottom: '4px'
                  }}
                >
                  THE SULTAN / MODERN ICON
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    color: 'var(--ivory-white)',
                    lineHeight: 1.4
                  }}
                >
                  "A life lived under relentless scrutiny, triumphant glory, and unforgettable mastery."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
