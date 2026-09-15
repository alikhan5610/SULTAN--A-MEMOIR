import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function BookTransition() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '100px 0 60px',
        textAlign: 'center',
        zIndex: 5,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(1, 14, 3, 0.95) 100%)'
      }}
    >
      <div className="editorial-container">
        {/* Progression Chain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
            marginBottom: '32px'
          }}
        >
          <span>THE LEGEND</span>
          <span style={{ color: 'var(--gold-primary)' }}>→</span>
          <span>THE LIFE</span>
          <span style={{ color: 'var(--gold-primary)' }}>→</span>
          <span>THE STORY</span>
          <span style={{ color: 'var(--gold-primary)' }}>→</span>
          <span style={{ color: 'var(--gold-bright)' }}>THE MEMOIR</span>
        </div>

        {/* Transition Culmination Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ivory-white)',
            lineHeight: 1.1,
            marginBottom: '20px'
          }}
        >
          SULTAN: <span className="text-gold">A MEMOIR</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            color: 'var(--ivory-muted)',
            maxWidth: '650px',
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}
        >
          "The unfiltered truth behind the glory, the shadows, and the triumph of the Sultan of Swing."
        </p>

        <a
          href="#the-book"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(5, 93, 9, 0.35)',
            border: '1px solid var(--gold-border)',
            color: 'var(--gold-primary)',
            transition: 'all 0.3s ease'
          }}
          aria-label="Scroll to Book Showcase"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(4px)';
            e.currentTarget.style.borderColor = 'var(--gold-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.borderColor = 'var(--gold-border)';
          }}
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
