import React, { useState } from 'react';
import { CheckCircle, Download, FileText, ShieldCheck, Sparkles, AlertTriangle, Lock, RefreshCw, ExternalLink, MessageCircle, Clock, XCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function SuccessSection() {
  const { activeOrder, checkOrderVerification, setIsAdminOpen, resetOrder } = useStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [lookupOrderId, setLookupOrderId] = useState('');
  const [lookupError, setLookupError] = useState('');

  // If no order in session, show the order lookup portal
  if (!activeOrder) {
    const handleLookup = async (e) => {
      e.preventDefault();
      if (!lookupOrderId.trim()) return;
      setIsChecking(true);
      setLookupError('');
      const res = await checkOrderVerification(lookupOrderId.trim());
      setIsChecking(false);
      if (!res || !res.verified) {
        setLookupError('Your payment has not been verified yet. Please wait or contact support at 03108985387.');
      }
    };

    return (
      <section
        id="order-success"
        style={{
          position: 'relative',
          padding: '80px 0 100px',
          zIndex: 10,
          backgroundColor: '#021204',
          borderTop: '1px solid var(--gold-border)',
          borderBottom: '1px solid var(--gold-border)'
        }}
      >
        <div className="editorial-container">
          <div
            className="glass-card"
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              padding: '40px 32px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(5, 93, 9, 0.25) 0%, rgba(2, 23, 5, 0.95) 100%)',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95)'
            }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--gold-primary)' }}>
              <Download size={28} color="var(--gold-bright)" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--ivory-white)', marginBottom: '10px' }}>
              ACCESS YOUR PURCHASED BOOK
            </h3>
            <p style={{ color: 'var(--ivory-muted)', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Already purchased <strong>SULTAN: A MEMOIR</strong>? Enter your Order Reference to download your verified 191-page digital edition.
            </p>
            <form onSubmit={handleLookup} style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="e.g. AK-20260915-12345"
                value={lookupOrderId}
                onChange={(e) => setLookupOrderId(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '220px',
                  padding: '12px 16px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: '6px',
                  color: 'var(--ivory-white)',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}
              />
              <button type="submit" disabled={isChecking} className="btn-gold" style={{ padding: '12px 20px', fontSize: '0.85rem' }}>
                {isChecking ? 'Checking...' : 'Access Book'}
              </button>
            </form>
            {lookupError && (
              <p style={{ color: '#FFBABA', fontSize: '0.85rem', marginTop: '16px', background: 'rgba(255, 107, 107, 0.15)', padding: '10px', borderRadius: '6px' }}>
                {lookupError}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  const isPaid = activeOrder.status === 'PAID' && !!activeOrder.downloadToken;
  const isPending = activeOrder.status === 'PENDING';
  const isFailed = activeOrder.status === 'FAILED';
  const isTestMode = Boolean(activeOrder.isTestMode);

  const downloadUrl = isPaid
    ? `/api/download?token=${encodeURIComponent(activeOrder.downloadToken)}&orderId=${encodeURIComponent(activeOrder.orderId)}`
    : null;

  const handleDownload = async () => {
    if (!isPaid || !downloadUrl) {
      setDownloadError('Your payment has not been verified yet. Please wait or contact support.');
      setDownloadSuccess(false);
      return;
    }

    setIsDownloading(true);
    setDownloadError('');
    setDownloadSuccess(false);

    try {
      // Step 1: Request verified PDF binary from server
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        let errorMessage = 'Download failed. Please try again or contact support at 03108985387.';
        try {
          const errData = await response.json();
          if (errData.message) errorMessage = errData.message;
        } catch {}
        setDownloadError(errorMessage);
        setDownloadSuccess(false);
        setIsDownloading(false);
        return;
      }

      // Step 2: Validate content type
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('pdf') && !contentType.includes('octet-stream')) {
        setDownloadError('Download failed. Server returned an invalid response format.');
        setDownloadSuccess(false);
        setIsDownloading(false);
        return;
      }

      // Step 3: Receive full binary blob
      const blob = await response.blob();
      if (blob.size < 100000) {
        setDownloadError('Download failed. Incomplete file received. Please contact support.');
        setDownloadSuccess(false);
        setIsDownloading(false);
        return;
      }

      // Step 4: Trigger native browser file save from the verified blob
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = 'Sultan-A-Memoir-Wasim-Akram.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(objectUrl), 30000);

      // Step 5: Mark success only after successful file transfer
      setDownloadSuccess(true);
    } catch (err) {
      console.error('Download fetch error:', err);
      setDownloadError('Download failed. Please check your network connection or contact support at 03108985387.');
      setDownloadSuccess(false);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRefreshVerification = async () => {
    setIsChecking(true);
    setDownloadError('');
    const res = await checkOrderVerification(activeOrder.orderId);
    setIsChecking(false);
    if (res && res.verified) {
      setDownloadSuccess(false);
    } else {
      setDownloadError('Your payment has not been verified yet. Please wait or contact support.');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Ali Khan, I have made payment for SULTAN: A MEMOIR.\nOrder Reference: ${activeOrder.orderId}\nTID: ${activeOrder.transactionId}\nCustomer: ${activeOrder.customer?.name} (${activeOrder.customer?.phone})\nPlease verify my order.`
  );

  return (
    <section
      id="order-success"
      style={{
        position: 'relative',
        padding: '90px 0 110px',
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
            padding: '50px 36px',
            textAlign: 'center',
            position: 'relative',
            background: isPaid
              ? 'linear-gradient(135deg, rgba(5, 93, 9, 0.45) 0%, rgba(2, 23, 5, 0.98) 100%)'
              : isFailed
              ? 'linear-gradient(135deg, rgba(80, 10, 10, 0.4) 0%, rgba(2, 23, 5, 0.98) 100%)'
              : 'linear-gradient(135deg, rgba(20, 45, 15, 0.5) 0%, rgba(2, 23, 5, 0.98) 100%)',
            border: `1px solid ${isPaid ? 'var(--gold-primary)' : isFailed ? '#FF6B6B' : 'var(--gold-border)'}`,
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95)'
          }}
        >
          {/* Close / X Button — always visible */}
          <button
            type="button"
            onClick={resetOrder}
            aria-label="Close and return to home"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-dim)',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--ivory-white)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--text-dim)'; }}
          >
            <X size={18} />
          </button>
          {/* Status Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              margin: '0 auto 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isPaid
                ? 'rgba(5, 93, 9, 0.6)'
                : isFailed
                ? 'rgba(255, 107, 107, 0.2)'
                : 'rgba(212, 175, 55, 0.15)',
              border: `2px solid ${isPaid ? 'var(--pk-green-glow)' : isFailed ? '#FF6B6B' : 'var(--gold-primary)'}`,
              boxShadow: isPaid ? '0 0 35px rgba(87, 143, 6, 0.4)' : 'none'
            }}
          >
            {isPaid ? (
              <CheckCircle size={44} color="#A2E26E" />
            ) : isFailed ? (
              <XCircle size={44} color="#FF6B6B" />
            ) : (
              <Clock size={44} color="var(--gold-bright)" />
            )}
          </div>

          {/* Status Label with Test Mode Notice if applicable */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: isPaid ? '#A2E26E' : isFailed ? '#FF6B6B' : 'var(--gold-bright)',
              marginBottom: '10px'
            }}
          >
            {isPaid
              ? isTestMode
                ? '✓ PAYMENT VERIFIED [TEST MODE — SIMULATED]'
                : '✓ PAYMENT VERIFIED & UNLOCKED'
              : isFailed
              ? '✕ PAYMENT VERIFICATION FAILED'
              : '⏳ PAYMENT PENDING VERIFICATION'}
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
              fontWeight: 900,
              color: 'var(--ivory-white)',
              lineHeight: 1.15,
              marginBottom: '16px'
            }}
          >
            {isPaid
              ? 'THANK YOU FOR YOUR PURCHASE'
              : isFailed
              ? 'PAYMENT NOT VERIFIED'
              : 'ORDER AWAITING CONFIRMATION'}
          </h2>

          {/* Subheading / Message */}
          {isPaid ? (
            <div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--gold-bright)', marginBottom: '16px' }}>
                <strong style={{ color: 'var(--ivory-white)' }}>SULTAN: A MEMOIR</strong> (Complete 191 Pages) is unlocked and ready for download.
              </p>
              {isTestMode && (
                <div style={{ background: 'rgba(212, 175, 55, 0.12)', border: '1px dashed var(--gold-border)', borderRadius: '6px', padding: '10px 14px', maxWidth: '560px', margin: '0 auto 24px', fontSize: '0.8rem', color: 'var(--gold-bright)' }}>
                  <strong>[TEST MODE]</strong> Verified via manual administrator simulation. For real customer payments, JazzCash / EasyPaisa transfers into <strong>03108985387</strong> are confirmed against incoming receipts.
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                background: isFailed ? 'rgba(255, 107, 107, 0.15)' : 'rgba(212, 175, 55, 0.12)',
                border: `1px solid ${isFailed ? 'rgba(255, 107, 107, 0.3)' : 'var(--gold-border)'}`,
                borderRadius: '8px',
                padding: '16px 20px',
                maxWidth: '600px',
                margin: '0 auto 28px',
                color: isFailed ? '#FFBABA' : 'var(--ivory-white)',
                fontSize: '0.95rem',
                lineHeight: 1.6
              }}
            >
              <strong>Your payment has not been verified yet. Please wait or contact support.</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--ivory-muted)', marginTop: '6px' }}>
                Manual transfers into JazzCash / EasyPaisa (<strong>03108985387</strong>) are verified by the administrator. Once confirmed, your download unlocks instantly.
              </p>
            </div>
          )}

          {/* Order Details Receipt Card */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.55)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '8px',
              padding: '22px 24px',
              maxWidth: '540px',
              margin: '0 auto 32px',
              textAlign: 'left',
              fontSize: '0.88rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Order Reference:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--ivory-white)' }}>
                {activeOrder.orderId}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Customer:</span>
              <span style={{ color: 'var(--ivory-white)' }}>{activeOrder.customer?.name} ({activeOrder.customer?.phone})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Book Title:</span>
              <span style={{ fontWeight: 700, color: 'var(--ivory-white)' }}>SULTAN: A MEMOIR (191 Pages)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Amount Paid:</span>
              <span style={{ fontWeight: 700, color: 'var(--gold-bright)' }}>PKR {activeOrder.totalAmount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Payment Method:</span>
              <span style={{ textTransform: 'uppercase', color: 'var(--ivory-white)' }}>{activeOrder.paymentMethod}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Transaction ID:</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--gold-bright)', fontWeight: 700 }}>
                {activeOrder.transactionId}
              </span>
            </div>
            {isPaid && (
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '6px' }}>
                <span style={{ color: 'var(--text-dim)' }}>Verification Token:</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.76rem', color: '#A2E26E' }}>
                  {activeOrder.downloadToken?.substring(0, 22)}...
                </span>
              </div>
            )}
          </div>

          {/* Action Area */}
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            {isPaid ? (
              <div>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="btn-gold"
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    marginBottom: '12px'
                  }}
                >
                  <Download size={22} />
                  <span>{isDownloading ? 'DOWNLOADING COMPLETE PDF...' : 'DOWNLOAD SULTAN: A MEMOIR (191 PAGES)'}</span>
                </button>

                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      fontSize: '0.88rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '16px'
                    }}
                  >
                    <ExternalLink size={16} />
                    <span>Open / Read in New Tab</span>
                  </a>
                )}

                {downloadSuccess && (
                  <p style={{ color: '#A2E26E', fontSize: '0.88rem', marginTop: '8px', fontWeight: 600 }}>
                    ✓ Download completed successfully! Enjoy the definitive story of Wasim Akram.
                  </p>
                )}
              </div>
            ) : (
              <div>
                {/* Locked Download Button */}
                <button
                  type="button"
                  disabled={true}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'var(--text-dim)',
                    borderRadius: '6px',
                    cursor: 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '14px'
                  }}
                >
                  <Lock size={20} />
                  <span>DOWNLOAD BOOK (LOCKED — AWAITING VERIFICATION)</span>
                </button>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <button
                    type="button"
                    onClick={handleRefreshVerification}
                    disabled={isChecking}
                    className="btn-ghost"
                    style={{ flex: 1, padding: '12px', fontSize: '0.85rem', minWidth: '180px' }}
                  >
                    <RefreshCw size={16} className={isChecking ? 'spin' : ''} />
                    <span>{isChecking ? 'Checking...' : 'Check Status'}</span>
                  </button>

                  <a
                    href={`https://wa.me/923108985387?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                    style={{
                      flex: 1,
                      padding: '12px',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      minWidth: '180px'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Support</span>
                  </a>
                </div>

                {/* Developer / Admin Verification Modal Launcher */}
                <div style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setIsAdminOpen(true)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--gold-muted)',
                      fontSize: '0.78rem',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    Open Merchant / Admin Verification Simulator
                  </button>
                </div>
              </div>
            )}

            {downloadError && (
              <p style={{ color: '#FFBABA', fontSize: '0.88rem', marginTop: '12px', background: 'rgba(255, 107, 107, 0.15)', padding: '10px', borderRadius: '6px' }}>
                {downloadError}
              </p>
            )}

            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '16px', lineHeight: 1.5 }}>
              High-resolution unabridged PDF (191 Pages, 2.7 MB). Author: Wasim Akram with Gideon Haigh.
            </p>

            {/* Return to Main Site */}
            <button
              type="button"
              onClick={resetOrder}
              style={{
                marginTop: '24px',
                background: 'transparent',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '6px',
                color: 'var(--gold-muted)',
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '10px 20px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-primary)'; e.currentTarget.style.color = 'var(--gold-bright)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; e.currentTarget.style.color = 'var(--gold-muted)'; }}
            >
              ← Return to Main Site
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
