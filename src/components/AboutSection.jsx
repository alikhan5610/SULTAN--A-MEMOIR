import React from 'react';
import { Zap, ShieldCheck, Compass, Target } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '120px 0',
        zIndex: 5
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div className="section-tagline">THE ARTISAN OF DESTRUCTION</div>
          <h2 className="section-title">
            ABOUT <span className="text-gold">WASIM AKRAM</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A left-arm force of nature who redefined fast bowling through lethal angle, devastating pace, and wizardry with the cricket ball.
          </p>
        </div>

        {/* Editorial Magazine Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Supporting Young Wasim Photo (Editorial Portrait) */}
          <div
            style={{
              gridColumn: 'span 5',
              position: 'relative'
            }}
            className="about-image-col"
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--gold-border)'
              }}
            >
              <img
                src="/assets/wasim-young.jpg"
                alt="Young Wasim Akram during his emergence with Ihsan jacket"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'contrast(1.08) brightness(0.95)'
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(2, 23, 5, 0.9) 0%, transparent 50%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-bright)'
                  }}
                >
                  ARCHIVAL PORTRAIT / CIRCA 1985
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                    color: 'var(--ivory-white)',
                    marginTop: '4px'
                  }}
                >
                  "The young prodigy from Model Town, Lahore, who possessed a whippy arm action unseen in cricket history."
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Text Content */}
          <div
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
            className="about-text-col"
          >
            <div className="glass-card" style={{ padding: '40px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: 'var(--gold-bright)',
                  marginBottom: '16px'
                }}
              >
                The Anatomy of Bowling Mastery
              </h3>
              <p style={{ color: 'var(--ivory-muted)', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '20px' }}>
                Wasim Akram did not merely bowl; he orchestrated events on 22 yards. Operating from a deceptive 15-pace run-up, 
                his explosive, quick-arm whippy delivery created late, sudden deviation that gave batsmen virtually zero reaction time.
                Whether swinging the new red ball in English conditions with Lancashire or generating wicked, high-speed reverse swing on 
                the baking dustbowls of Sharjah, Lahore, and Kolkata, Wasim dismantled the greatest batting lineups in the history of the sport.
              </p>
              <p style={{ color: 'var(--ivory-muted)', fontSize: '1.02rem', lineHeight: 1.75 }}>
                In an era dominated by fearless titans—Sir Viv Richards, Allan Border, Martin Crowe, Brian Lara, and Sachin Tendulkar—Wasim 
                commanded profound respect. Unlike the heavily regulated, batter-friendly conditions of modern franchise cricket, 
                Wasim performed with unforgiving field restrictions, brutal tour schedules, and without modern DRS ball-tracking technology.
              </p>
            </div>

            {/* Tactical Grid: Core Pillars */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}
            >
              <div
                style={{
                  background: 'rgba(5, 93, 9, 0.25)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Zap size={18} color="var(--gold-primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', color: 'var(--ivory-white)' }}>
                    TWO-WAY SWING & REVERSE
                  </span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  Able to swing the ball into the right-hander and shape it away off the same action at 145 km/h.
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(5, 93, 9, 0.25)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Target size={18} color="var(--gold-primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', color: 'var(--ivory-white)' }}>
                    ALL-ROUND MATCH WINNER
                  </span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  A ferocious counter-attacking batsman with 3 Test centuries, including a marathon 257* against Zimbabwe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
