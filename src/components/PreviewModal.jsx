import React from 'react';
import { X, BookOpen, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function PreviewModal() {
  const { isPreviewModalOpen, setIsPreviewModalOpen, addToCart, BOOK_PRODUCT } = useStore();

  if (!isPreviewModalOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 280,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsPreviewModalOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '94vh',
          backgroundColor: '#021204',
          border: '1px solid var(--gold-border)',
          borderRadius: '12px',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.98)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
            backgroundColor: 'rgba(5, 93, 9, 0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={20} color="var(--gold-primary)" />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--ivory-white)' }}>
              SULTAN: A MEMOIR — PUBLIC PREVIEW (PAGE 1)
            </span>
          </div>

          <button
            onClick={() => setIsPreviewModalOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer'
            }}
            aria-label="Close Preview"
          >
            <X size={22} />
          </button>
        </div>

        {/* Page 1 Document Sheet */}
        <div
          style={{
            padding: '36px 24px',
            backgroundColor: '#061608',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#FFFFFF',
              color: '#111111',
              borderRadius: '6px',
              padding: '36px 28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontFamily: 'serif', fontSize: '1.45rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                Sultan
              </div>
              <div style={{ fontFamily: 'serif', fontSize: '1.1rem', color: '#333333', marginTop: '2px' }}>
                Wasim Akram
              </div>
            </div>

            <div style={{ margin: '20px 0', maxWidth: '230px', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}>
              <img
                src="/assets/book-cover.jpg"
                alt="Sultan: A Memoir book cover"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div>
              <div style={{ fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 800 }}>
                Sultan
              </div>
              <p style={{ fontSize: '0.88rem', color: '#555555', marginTop: '6px', lineHeight: 1.4 }}>
                Unveiling the Untold Story of Cricket's Greatest Left-Arm Bowler.
              </p>
              <div style={{ fontSize: '0.74rem', color: '#888888', marginTop: '10px' }}>
                Written by Wasim Akram with Gideon Haigh • Official Edition
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            padding: '24px 30px',
            borderTop: '1px solid var(--gold-border)',
            backgroundColor: '#031705',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              WANT THE FULL 191 PAGES?
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
              PKR 500
            </div>
          </div>

          <button
            onClick={() => {
              setIsPreviewModalOpen(false);
              addToCart(BOOK_PRODUCT);
            }}
            className="btn-gold"
            style={{ padding: '12px 28px', fontSize: '0.85rem' }}
          >
            <ShoppingBag size={16} />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
}
