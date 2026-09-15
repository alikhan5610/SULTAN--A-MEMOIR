import React, { useState } from 'react';
import { ShieldCheck, Clock, CheckCircle2, XCircle, FileText, ArrowRight, X, Sparkles, Download, ExternalLink, MessageCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function VerificationModal() {
  const { activeOrder, verifyPayment, resetOrder, isAdminOpen, setIsAdminOpen } = useStore();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  if (!activeOrder && !isAdminOpen) return null;

  const handleSimulateApproval = async () => {
    setIsVerifying(true);
    await verifyPayment(activeOrder.orderId, true, true);
    setIsVerifying(false);
  };

  const handleSimulateRejection = async () => {
    setIsVerifying(true);
    await verifyPayment(activeOrder.orderId, false, true);
    setIsVerifying(false);
  };

  const isPaid = activeOrder?.status === 'PAID' && !!activeOrder?.downloadToken;
  const isTestMode = Boolean(activeOrder?.isTestMode);
  const downloadUrl = isPaid
    ? `/api/download?token=${encodeURIComponent(activeOrder.downloadToken)}&orderId=${encodeURIComponent(activeOrder.orderId)}`
    : null;

  const handleDownload = async () => {
    if (!downloadUrl) {
      setDownloadError('Your payment has not been verified yet. Please wait or contact support.');
      setDownloadSuccess(false);
      return;
    }

    setIsDownloading(true);
    setDownloadError('');
    setDownloadSuccess(false);

    try {
      const res = await fetch(downloadUrl);
      if (!res.ok) {
        let msg = 'Download failed. Please try again or contact support.';
        try {
          const errData = await res.json();
          if (errData.message) msg = errData.message;
        } catch {}
        setDownloadError(msg);
        setDownloadSuccess(false);
        setIsDownloading(false);
        return;
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('pdf') && !contentType.includes('octet-stream')) {
        setDownloadError('Download failed. Invalid response received from server.');
        setDownloadSuccess(false);
        setIsDownloading(false);
        return;
      }

      const blob = await res.blob();
      if (blob.size < 100000) {
        setDownloadError('Download failed. File size is incomplete.');
        setDownloadSuccess(false);
        setIsDownloading(false);
        return;
      }

      const objUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objUrl;
      a.download = 'Sultan-A-Memoir-Wasim-Akram.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(objUrl), 30000);

      setDownloadSuccess(true);
    } catch (err) {
      console.error('Modal download error:', err);
      setDownloadError('Download failed. Network or server error. Please try again.');
      setDownloadSuccess(false);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGoToPortal = () => {
    setIsAdminOpen(false);
    const el = document.getElementById('order-success');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 260,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#021404',
          border: '1px solid var(--gold-border)',
          borderRadius: '12px',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.98)',
          padding: '36px',
          position: 'relative'
        }}
      >
        <button
          onClick={() => setIsAdminOpen(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-dim)',
            cursor: 'pointer'
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {activeOrder ? (
          <div>
            {/* Status Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    activeOrder.status === 'PAID'
                      ? 'rgba(5, 93, 9, 0.5)'
                      : activeOrder.status === 'FAILED'
                      ? 'rgba(255, 107, 107, 0.2)'
                      : 'rgba(212, 175, 55, 0.15)',
                  border: `1px solid ${
                    activeOrder.status === 'PAID'
                      ? 'var(--pk-green-glow)'
                      : activeOrder.status === 'FAILED'
                      ? '#FF6B6B'
                      : 'var(--gold-primary)'
                  }`
                }}
              >
                {activeOrder.status === 'PAID' ? (
                  <CheckCircle2 size={32} color="#A2E26E" />
                ) : activeOrder.status === 'FAILED' ? (
                  <XCircle size={32} color="#FF6B6B" />
                ) : (
                  <Clock size={32} color="var(--gold-bright)" />
                )}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:
                    activeOrder.status === 'PAID'
                      ? '#A2E26E'
                      : activeOrder.status === 'FAILED'
                      ? '#FF6B6B'
                      : 'var(--gold-bright)'
                }}
              >
                ORDER STATUS: {activeOrder.status} {isTestMode ? '[TEST MODE]' : ''}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--ivory-white)',
                  marginTop: '6px'
                }}
              >
                {activeOrder.status === 'PAID'
                  ? isTestMode
                    ? 'Payment Verified (Test Mode)'
                    : 'Payment Verified & Unlocked'
                  : activeOrder.status === 'FAILED'
                  ? 'Payment Could Not Be Verified'
                  : 'Awaiting Merchant Verification'}
              </h2>
            </div>

            {/* Order Details Card */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '24px',
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
                <span style={{ color: 'var(--text-dim)' }}>Payment Method:</span>
                <span style={{ textTransform: 'uppercase', color: 'var(--gold-bright)', fontWeight: 700 }}>
                  {activeOrder.paymentMethod}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-dim)' }}>Transaction ID:</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--gold-bright)', fontWeight: 700 }}>
                  {activeOrder.transactionId}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '6px' }}>
                <span style={{ color: 'var(--ivory-white)', fontWeight: 700 }}>Total Amount:</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                  PKR {activeOrder.totalAmount}
                </span>
              </div>
            </div>

            {/* Status-Specific Actions */}
            {activeOrder.status === 'PENDING' && (
              <div>
                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid var(--gold-border)',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    marginBottom: '20px',
                    fontSize: '0.88rem',
                    color: 'var(--ivory-white)',
                    lineHeight: 1.5,
                    textAlign: 'center'
                  }}
                >
                  <strong>Your payment has not been verified yet. Please wait or contact support.</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ivory-muted)', marginTop: '6px' }}>
                    Admin confirmation required for transfer into <strong>03108985387</strong>.
                  </div>
                </div>

                {/* Admin Simulation Tool for live testing */}
                <div
                  style={{
                    background: 'rgba(5, 93, 9, 0.2)',
                    border: '1px dashed var(--gold-border)',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', color: 'var(--gold-bright)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>
                    TEST / DEMO SIMULATION MODE
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ivory-muted)', marginBottom: '12px' }}>
                    For testing purposes only. Approving here tags order as [TEST MODE].
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      disabled={isVerifying}
                      onClick={handleSimulateApproval}
                      className="btn-gold"
                      style={{ flex: 1, padding: '10px', fontSize: '0.8rem' }}
                    >
                      {isVerifying ? 'Verifying...' : '✓ Approve (Test Simulation)'}
                    </button>
                    <button
                      type="button"
                      disabled={isVerifying}
                      onClick={handleSimulateRejection}
                      style={{
                        background: 'rgba(255, 107, 107, 0.15)',
                        border: '1px solid #FF6B6B',
                        color: '#FF6B6B',
                        padding: '10px 14px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleGoToPortal}
                    className="btn-ghost"
                    style={{ width: '100%', padding: '12px', fontSize: '0.85rem' }}
                  >
                    Close & View Order Status on Page
                  </button>
                </div>
              </div>
            )}

            {activeOrder.status === 'PAID' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.92rem', color: 'var(--ivory-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
                  Your payment has been successfully verified! You hold lifetime access to the complete 191-page digital edition of <strong>SULTAN: A MEMOIR</strong>.
                </p>

                {isTestMode && (
                  <div style={{ background: 'rgba(212, 175, 55, 0.12)', border: '1px dashed var(--gold-border)', borderRadius: '6px', padding: '8px 12px', marginBottom: '16px', fontSize: '0.78rem', color: 'var(--gold-bright)' }}>
                    <strong>[TEST MODE]</strong> Verified via manual administrator simulation.
                  </div>
                )}

                {/* Primary Download Button in Modal */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="btn-gold"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    marginBottom: '10px'
                  }}
                >
                  <Download size={20} />
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
                      padding: '10px',
                      fontSize: '0.84rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      marginBottom: '14px'
                    }}
                  >
                    <ExternalLink size={14} />
                    <span>Open / Read in Browser (New Tab)</span>
                  </a>
                )}

                {downloadSuccess && (
                  <p style={{ color: '#A2E26E', fontSize: '0.84rem', marginBottom: '14px', fontWeight: 600 }}>
                    ✓ Complete 191-page PDF downloaded successfully!
                  </p>
                )}

                {downloadError && (
                  <p style={{ color: '#FFBABA', fontSize: '0.84rem', marginBottom: '14px', background: 'rgba(255, 107, 107, 0.15)', padding: '8px', borderRadius: '6px' }}>
                    {downloadError}
                  </p>
                )}

                <button
                  onClick={handleGoToPortal}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-dim)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Close & View Full Receipt on Page
                </button>
              </div>
            )}

            {activeOrder.status === 'FAILED' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.88rem', color: '#FFBABA', marginBottom: '16px' }}>
                  The provided transaction ID could not be matched with incoming receipts on 03108985387.
                </p>
                <button
                  onClick={resetOrder}
                  className="btn-ghost"
                  style={{ width: '100%', padding: '12px' }}
                >
                  Try Again with Correct Details
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <p style={{ color: 'var(--text-dim)' }}>No active orders in session.</p>
          </div>
        )}
      </div>
    </div>
  );
}
