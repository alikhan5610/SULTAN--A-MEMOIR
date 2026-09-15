import React from 'react';
import { ShoppingBag, BookOpen, Check, Star, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function BookShowcase() {
  const { BOOK_PRODUCT, addToCart, setIsPreviewModalOpen } = useStore();

  const chapterHighlights = [
    'The Boy from the British Government — Lahore Street Roots',
    'The Guru — Mentorship under Imran Khan & Melbourne Glory',
    'Imran, Viv & Me — Confronting Legends on the World Stage',
    'Wasim for England — Lancashire & Reversing the Dukes Ball',
    '1992 and All That — The Historic MCG World Cup Triumph',
    'A Reluctant Captain — Pressure, Turmoil & Glory',
    'Battling My Demons & A New Beginning — Truth, Family & Healing'
  ];

  return (
    <section
      id="the-book"
      style={{
        position: 'relative',
        padding: '100px 0 120px',
        zIndex: 5,
        backgroundColor: 'rgba(1, 14, 3, 0.75)'
      }}
    >
      <div className="editorial-container">
        {/* Dominant Book Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div className="section-tagline">OFFICIAL DEFINITIVE BIOGRAPHY</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ivory-white)',
              lineHeight: 1.05,
              marginBottom: '16px'
            }}
          >
            SULTAN: <span className="text-gold">A MEMOIR</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            By Wasim Akram with Gideon Haigh. The raw, intimate, and definitive story of cricket's supreme left-arm maestro.
          </p>
        </div>

        {/* Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '50px',
            alignItems: 'center'
          }}
          className="book-showcase-grid"
        >
          {/* Left Column: 3D Floating Book Cover Presentation */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              justifyContent: 'center',
              perspective: '1200px'
            }}
            className="book-cover-col"
          >
            <div
              className="book-3d-wrapper"
              style={{
                position: 'relative',
                width: '320px',
                maxWidth: '90%',
                borderRadius: '8px',
                transform: 'rotateY(-12deg) rotateX(4deg)',
                transformStyle: 'preserve-3d',
                boxShadow: '-20px 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.15)',
                transition: 'transform 0.5s var(--ease-smooth)',
                border: '1px solid rgba(212, 175, 55, 0.35)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotateY(-4deg) rotateX(0deg) scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotateY(-12deg) rotateX(4deg)';
              }}
            >
              <img
                src="/assets/book-cover.jpg"
                alt="SULTAN: A MEMOIR by Wasim Akram with Gideon Haigh book cover"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '7px'
                }}
              />
              {/* Spine Highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: '16px',
                  background: 'linear-gradient(to right, rgba(255,255,255,0.2) 0%, transparent 100%)',
                  borderRadius: '7px 0 0 7px'
                }}
              />
            </div>
          </div>

          {/* Right Column: Book Specifications & Purchasing Details */}
          <div
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
            className="book-details-col"
          >
            <div className="glass-card" style={{ padding: '40px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                  paddingBottom: '20px',
                  marginBottom: '20px'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: 'var(--ivory-white)',
                      marginBottom: '4px'
                    }}
                  >
                    SULTAN: A MEMOIR
                  </h3>
                  <p style={{ color: 'var(--gold-bright)', fontSize: '0.95rem', fontWeight: 600 }}>
                    Wasim Akram with Gideon Haigh
                  </p>
                </div>

                {/* Price Display */}
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: 'var(--gold-bright)',
                      lineHeight: 1
                    }}
                  >
                    PKR 500
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)'
                    }}
                  >
                    Complete Unabridged PDF
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--ivory-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
                For two decades, Wasim Akram was the most feared bowler on the planet. Now, for the first time, he shares 
                the untold stories behind his meteoric rise from the streets of Lahore to World Cup supremacy, addressing 
                historic rivalries, locker-room controversies, personal tragedy, and his journey toward redemption.
              </p>

              {/* Chapters Checklist */}
              <div style={{ marginBottom: '32px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-primary)',
                    marginBottom: '12px'
                  }}
                >
                  WHAT YOU WILL DISCOVER INSIDE:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {chapterHighlights.map((chap, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--ivory-muted)' }}>
                      <Check size={14} color="var(--gold-bright)" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{chap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase & Preview Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  alignItems: 'center'
                }}
              >
                <button
                  onClick={() => addToCart(BOOK_PRODUCT)}
                  className="btn-gold"
                  style={{ flex: '1 1 240px' }}
                >
                  <ShoppingBag size={18} />
                  <span>ADD TO CART — PKR 500</span>
                </button>

                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="btn-ghost"
                  style={{ flex: '1 1 180px' }}
                >
                  <BookOpen size={18} color="var(--gold-primary)" />
                  <span>READ PREVIEW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
