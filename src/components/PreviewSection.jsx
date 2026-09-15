import React, { useState } from 'react';
import { BookOpen, ShoppingBag, Eye, Lock, Maximize2, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function PreviewSection() {
  const { BOOK_PRODUCT, addToCart, setIsPreviewModalOpen } = useStore();
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <section
      id="preview"
      style={{
        position: 'relative',
        padding: '120px 0',
        zIndex: 5,
        backgroundColor: 'rgba(2, 23, 5, 0.9)'
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tagline">EXCLUSIVE PUBLIC EXCERPT</div>
          <h2 className="section-title">
            READ A <span className="text-gold">PREVIEW</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Inspect the opening title page of <strong style={{ color: 'var(--gold-bright)' }}>SULTAN: A MEMOIR</strong>. Public access is strictly restricted to Page 1 prior to purchase.
          </p>
        </div>

        {/* Document Reader Container */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            background: 'rgba(1, 14, 3, 0.9)',
            border: '1px solid var(--gold-border)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95)'
          }}
        >
          {/* Reader Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              backgroundColor: 'rgba(5, 93, 9, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={18} color="var(--gold-primary)" />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--ivory-white)'
                }}
              >
                SULTAN: A MEMOIR — PAGE 1 OF 191
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold-bright)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}
              >
                <Lock size={12} />
                PUBLIC PREVIEW MODE
              </span>

              <button
                onClick={() => setIsPreviewModalOpen(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
                title="Fullscreen Preview"
                aria-label="Expand Preview"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Document Content Sheet: Strictly Page 1 */}
          <div
            style={{
              padding: '40px 20px',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#071609',
              minHeight: '560px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '460px',
                background: '#FFFFFF',
                color: '#111111',
                borderRadius: '4px',
                padding: '40px 32px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #D5D5D5'
              }}
            >
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'serif', letterSpacing: '0.04em', color: '#1A1A1A' }}>
                  Sultan
                </div>
                <div style={{ fontSize: '1.1rem', fontFamily: 'serif', color: '#333333', marginTop: '4px' }}>
                  Wasim Akram
                </div>
              </div>

              {/* Cover Image in Center of Page 1 */}
              <div style={{ margin: '24px 0', maxWidth: '240px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                <img
                  src="/assets/book-cover.jpg"
                  alt="Sultan: A Memoir cover inside Page 1"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'serif', color: '#1A1A1A' }}>
                  Sultan
                </div>
                <p style={{ fontSize: '0.92rem', color: '#555555', marginTop: '6px', maxWidth: '320px', lineHeight: 1.4 }}>
                  Unveiling the Untold Story of Cricket's Greatest Left-Arm Bowler.
                </p>
                <div style={{ fontSize: '0.75rem', color: '#888888', marginTop: '12px' }}>
                  Official Unabridged Edition • 191 Pages
                </div>
              </div>
            </div>
          </div>

          {/* Under Preview Conversion Banner */}
          <div
            style={{
              padding: '36px 30px',
              background: 'linear-gradient(135deg, rgba(4, 38, 7, 0.95) 0%, rgba(2, 23, 5, 0.98) 100%)',
              borderTop: '1px solid var(--gold-border)',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '8px'
              }}
            >
              WANT THE COMPLETE STORY?
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 900,
                color: 'var(--ivory-white)',
                marginBottom: '6px'
              }}
            >
              SULTAN: <span className="text-gold">A MEMOIR</span>
            </h3>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--gold-bright)',
                marginBottom: '20px'
              }}
            >
              PKR 500
            </div>

            <button
              onClick={() => addToCart(BOOK_PRODUCT)}
              className="btn-gold"
              style={{ padding: '16px 40px', fontSize: '0.95rem' }}
            >
              <ShoppingBag size={20} />
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
