import React from 'react';
import { Quote } from 'lucide-react';

export default function QuotesSection() {
  return (
    <section
      id="quotes"
      style={{
        position: 'relative',
        padding: '100px 0 120px',
        zIndex: 5
      }}
    >
      <div className="editorial-container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tagline">WORDS OF THE MASTERS</div>
          <h2 className="section-title">
            VOICES OF <span className="text-gold">GREATNESS</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >
          {/* Wasim Akram Verified Quote */}
          <div
            className="glass-card"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px',
              border: '1px solid var(--gold-border)'
            }}
          >
            <div>
              <Quote size={36} color="var(--gold-primary)" style={{ opacity: 0.5, marginBottom: '16px' }} />
              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: 'var(--ivory-white)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}
              >
                "The whole point of bowling is to sow doubt in the batsman’s mind. Work builds skill. Most of all, Imran tutored me in reverse swing."
              </blockquote>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                WASIM AKRAM
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Sultan: A Memoir, Chapter 2
              </div>
            </div>
          </div>

          {/* Historical / Cricket Luminary Tribute Quote */}
          <div
            className="glass-card"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px',
              border: '1px solid rgba(87, 143, 6, 0.3)'
            }}
          >
            <div>
              <Quote size={36} color="var(--pk-green-glow)" style={{ opacity: 0.5, marginBottom: '16px' }} />
              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: 'var(--ivory-white)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}
              >
                "I'm often asked, 'What is your all-time greatest team?' I start with Akram and go from there."
              </blockquote>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                DAVID LLOYD
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Lancashire &amp; England Coach
              </div>
            </div>
          </div>

          {/* Philosophy on Mastery Quote */}
          <div
            className="glass-card"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px',
              border: '1px solid var(--gold-border)'
            }}
          >
            <div>
              <Quote size={36} color="var(--gold-primary)" style={{ opacity: 0.5, marginBottom: '16px' }} />
              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: 'var(--ivory-white)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}
              >
                "Excellence is never an accident. It represents the wise choice of many alternatives—choice, not chance, determines your destiny."
              </blockquote>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                ARISTOTLE
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                On Mastery &amp; Perseverance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
