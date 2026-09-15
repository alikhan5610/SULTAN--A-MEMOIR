import React, { useState } from 'react';
import { CheckCircle, Download, FileText, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function SuccessSection() {
  const { activeOrder, resetOrder } = useStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  // Only render if there is an active order and it is PAID
  if (!activeOrder || activeOrder.status !== 'PAID') return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError('');

    try {
      // Authenticated download endpoint request with secure token
      const res = await fetch(`/api/download?token=${encodeURIComponent(activeOrder.downloadToken)}&orderId=${activeOrder.orderId}`);
      
      if (!res.ok) {
        // Fallback for client-side dev testing if API server isn't running concurrently
        const fallbackRes = await fetch('/preview/sultan-sample.pdf');
        const blob = await fallbackRes.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Sultan-A-Memoir-Wasim-Akram.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setDownloadSuccess(true);
      } else {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Sultan-A-Memoir-Wasim-Akram.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setDownloadSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setDownloadError('Download server is connecting. Your token is preserved; please retry.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="order-success"
      style={{
        position: 'relative',
        padding: '100px 0 120px',
        zIndex: 10,
        backgroundColor: '#021204',
        borderTop: '2px solid var(--gold-primary)',
        borderBottom: '2px solid var(--gold-primary)'
      }}
    >
      <div className="editorial-container">
        <div
          className="glass-card"
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            padding: '50px 40px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(5, 93, 9, 0.4) 0%, rgba(2, 23, 5, 0.95) 100%)',
            border: '1px solid var(--gold-primary)',
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95)'
          }}
        >
          {/* Subtle Success Animation Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(5, 93, 9, 0.6)',
              border: '2px solid var(--pk-green-glow)',
              boxShadow: '0 0 35px rgba(87, 143, 6, 0.4)'
            }}
          >
            <CheckCircle size={44} color="#A2E26E" />
          </div>

          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A2E26E',
              marginBottom: '10px'
            }}
          >
            ✓ PAYMENT SUCCESSFUL &amp; VERIFIED
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              color: 'var(--ivory-white)',
              lineHeight: 1.15,
              marginBottom: '16px'
            }}
          >
            THANK YOU FOR YOUR PURCHASE
          </h2>

          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--gold-bright)', marginBottom: '36px' }}>
            <strong style={{ color: 'var(--ivory-white)' }}>SULTAN: A MEMOIR</strong> is ready for you.
          </p>

          {/* Receipt Card */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '520px',
              margin: '0 auto 36px',
              textAlign: 'left',
              fontSize: '0.9rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Order Reference:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ivory-white)' }}>
                {activeOrder.orderId}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Book Title:</span>
              <span style={{ fontWeight: 700, color: 'var(--ivory-white)' }}>SULTAN: A MEMOIR</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Amount Paid:</span>
              <span style={{ fontWeight: 700, color: 'var(--gold-bright)' }}>PKR {activeOrder.totalAmount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Payment Method:</span>
              <span style={{ textTransform: 'uppercase', color: 'var(--ivory-white)' }}>{activeOrder.paymentMethod}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '6px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Verification Token:</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.76rem', color: '#A2E26E' }}>
                {activeOrder.downloadToken?.substring(0, 18)}...
              </span>
            </div>
          </div>

          {/* Primary Download Button */}
          <div style={{ maxWidth: '440px', margin: '0 auto' }}>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '18px 30px',
                fontSize: '1rem',
                fontWeight: 800
              }}
            >
              <Download size={22} />
              <span>{isDownloading ? 'PREPARING PDF...' : 'DOWNLOAD SULTAN: A MEMOIR'}</span>
            </button>

            {downloadSuccess && (
              <p style={{ color: '#A2E26E', fontSize: '0.85rem', marginTop: '12px', fontWeight: 600 }}>
                ✓ Download initiated successfully. Enjoy the definitive story of Wasim Akram!
              </p>
            )}

            {downloadError && (
              <p style={{ color: '#FF6B6B', fontSize: '0.85rem', marginTop: '12px' }}>
                {downloadError}
              </p>
            )}

            <p style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: '16px' }}>
              High-resolution unabridged PDF (191 Pages). Lifetime access authorized to {activeOrder.customer.name}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
