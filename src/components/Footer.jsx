import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';

function InstagramIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#010A02',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        padding: '80px 0 40px',
        zIndex: 10
      }}
    >
      <div className="editorial-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            marginBottom: '60px'
          }}
          className="footer-grid"
        >
          {/* Brand & Mission */}
          <div style={{ gridColumn: 'span 5' }} className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--gold-primary)',
                  textTransform: 'lowercase',
                  lineHeight: 1
                }}
              >
                ak
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--ivory-white)'
                }}
              >
                Ali Khan
              </span>
            </div>

            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '380px', marginBottom: '24px' }}>
              A cinematic tribute and publication platform dedicated to Wasim Akram and the enduring legacy of Pakistan cricket.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(5, 93, 9, 0.3)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: 'var(--ivory-white)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold-primary)';
                  e.currentTarget.style.color = 'var(--gold-bright)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                  e.currentTarget.style.color = 'var(--ivory-white)';
                }}
              >
                <InstagramIcon size={16} color="var(--gold-primary)" />
                <span>Instagram (Connecting Soon)</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ gridColumn: 'span 4' }} className="footer-links-col">
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold-bright)',
                marginBottom: '20px'
              }}
            >
              EXPLORE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['About', 'Legacy', 'The Book', 'Preview', 'Purchase'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      color: 'var(--ivory-muted)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-bright)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-muted)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Assurance */}
          <div style={{ gridColumn: 'span 3' }} className="footer-support-col">
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold-bright)',
                marginBottom: '20px'
              }}
            >
              PAYMENT METHODS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--ivory-muted)' }}>
                <span style={{ color: '#E30613', fontWeight: 800 }}>•</span> JazzCash: 03108985387
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--ivory-muted)' }}>
                <span style={{ color: '#00A859', fontWeight: 800 }}>•</span> EasyPaisa: 03108985387
              </div>
            </div>

            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: 'var(--gold-bright)',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer'
              }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.76rem',
            color: 'var(--text-dim)'
          }}
        >
          <div style={{ maxWidth: '720px', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--ivory-muted)' }}>DISCLAIMER:</strong> This website is an independently curated publication and book sales platform created by Ali Khan. It is not officially affiliated with, authorized by, or endorsed by the Pakistan Cricket Board (PCB) or Wasim Akram unless verified authorization is registered. All sports photography and historical accounts are utilized for biographical and documentary presentation of the book <em>SULTAN: A MEMOIR</em>.
          </div>
          <div>
            &copy; {new Date().getFullYear()} Ali Khan. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
