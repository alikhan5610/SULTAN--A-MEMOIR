import React from 'react';
import { Quote, Sparkles, Award } from 'lucide-react';

export default function EditorialQuote() {
  return (
    <section
      id="creator-statement"
      style={{
        position: 'relative',
        padding: '90px 0',
        zIndex: 5
      }}
    >
      <div className="editorial-container">
        <div
          className="glass-card"
          style={{
            position: 'relative',
            padding: '48px 44px',
            border: '1px solid var(--gold-border)',
            background: 'linear-gradient(135deg, rgba(4, 38, 7, 0.85) 0%, rgba(2, 23, 5, 0.98) 100%)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95)',
            borderRadius: '12px'
          }}
        >
          {/* Ambient Quote Mark Watermark */}
          <div
            style={{
              position: 'absolute',
              top: '25px',
              right: '35px',
              opacity: 0.1,
              pointerEvents: 'none'
            }}
          >
            <Quote size={100} color="var(--gold-primary)" />
          </div>

          <div className="creator-editorial-layout">
            {/* Creator Portrait Card — Complete Face & Head Respectfully Framed */}
            <div className="creator-card-frame">
              <div className="creator-photo-wrapper">
                <img
                  src="/assets/ali-khan.jpg"
                  alt="Ali Khan — Creator and Curator of SULTAN: A MEMOIR platform"
                  className="creator-portrait-img"
                  loading="lazy"
                />
                <div className="creator-photo-overlay" />
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--gold-bright)'
                  }}
                >
                  Ali Khan
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                    marginTop: '2px'
                  }}
                >
                  Creator &amp; Curator
                </div>
              </div>
            </div>

            {/* Editorial Opinion Text */}
            <div className="creator-text-block">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-primary)',
                  marginBottom: '16px'
                }}
              >
                <Award size={15} color="var(--gold-primary)" />
                <span>ALI KHAN'S EDITORIAL VERDICT</span>
              </div>

              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)',
                  fontStyle: 'italic',
                  color: 'var(--ivory-white)',
                  lineHeight: 1.48,
                  marginBottom: '22px'
                }}
              >
                "In the words of the website's creator, Ali Khan, Wasim Akram is the greatest cricketer to ever walk the face of the earth."
              </blockquote>

              <p style={{ color: 'var(--ivory-muted)', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '14px' }}>
                This conviction is grounded not merely in statistics, but in the sheer, unrepeatable difficulty of his craft. 
                Fast bowling with an explosive left-arm action requires miraculous anatomical perfection. In an era dominated 
                by legendary batsmen—Viv Richards, Allan Border, Martin Crowe, Brian Lara, and Sachin Tendulkar—Wasim 
                was both unplayable and indestructible.
              </p>

              <p style={{ color: 'var(--text-dim)', fontSize: '0.94rem', lineHeight: 1.7 }}>
                He possessed match-winning versatility unmatched in cricket history: capable of turning a Test match on its head with 
                unplayable reverse swing, rescuing an innings with a fighting test century, and conquering a World Cup final with magical 
                consecutive deliveries. His mastery, longevity, and dual impact with bat and ball cement his legacy as cricket's supreme immortal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
