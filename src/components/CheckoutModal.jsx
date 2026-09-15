import React, { useState } from 'react';
import { X, Check, Copy, ShieldCheck, ArrowRight, Upload, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CheckoutModal() {
  const {
    cartTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder
  } = useStore();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('jazzcash'); // 'jazzcash' | 'easypaisa' ONLY
  const [transactionId, setTransactionId] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('03108985387');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshotName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim()) {
      setErrorMsg('Please enter your Name and WhatsApp phone number.');
      return;
    }

    if (!transactionId.trim()) {
      setErrorMsg('Please enter the Transaction ID (TID) from your JazzCash or EasyPaisa confirmation.');
      return;
    }

    setErrorMsg('');
    placeOrder({
      customer,
      paymentMethod,
      transactionId: transactionId.trim(),
      screenshot: screenshotName
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '92vh',
          backgroundColor: '#021404',
          border: '1px solid var(--gold-border)',
          borderRadius: '12px',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.98)',
          overflowY: 'auto',
          padding: '36px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            paddingBottom: '18px',
            marginBottom: '24px'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold-primary)'
              }}
            >
              SECURE CHECKOUT
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--ivory-white)',
                marginTop: '4px'
              }}
            >
              YOUR ORDER
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              padding: '4px'
            }}
            aria-label="Close Checkout"
          >
            <X size={22} />
          </button>
        </div>

        {/* Order Item Summary */}
        <div
          style={{
            background: 'rgba(5, 93, 9, 0.25)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '8px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '26px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/assets/book-cover.jpg"
              alt="SULTAN: A MEMOIR"
              style={{
                width: '45px',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '4px',
                border: '1px solid var(--gold-border)'
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--ivory-white)'
                }}
              >
                SULTAN: A MEMOIR
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Full Unabridged 191-Page Digital Edition
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--gold-bright)'
              }}
            >
              PKR {cartTotal > 0 ? cartTotal : 500}
            </div>
          </div>
        </div>

        {errorMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: 'rgba(255, 107, 107, 0.15)',
              border: '1px solid #FF6B6B',
              borderRadius: '6px',
              color: '#FFBABA',
              fontSize: '0.85rem',
              marginBottom: '20px'
            }}
          >
            <AlertCircle size={18} color="#FF6B6B" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* 1. Contact Information */}
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold-primary)',
                marginBottom: '12px'
              }}
            >
              1. CUSTOMER &amp; CONTACT DETAILS
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '6px',
                    color: 'var(--ivory-white)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number *"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '6px',
                    color: 'var(--ivory-white)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '6px',
                    color: 'var(--ivory-white)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 2. Select Payment Method: JazzCash & EasyPaisa ONLY */}
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold-primary)',
                marginBottom: '12px'
              }}
            >
              2. SELECT PAYMENT METHOD
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* JazzCash Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                style={{
                  padding: '16px 14px',
                  background: paymentMethod === 'jazzcash' ? 'rgba(227, 6, 19, 0.2)' : 'rgba(0, 0, 0, 0.4)',
                  border: `2px solid ${paymentMethod === 'jazzcash' ? '#E30613' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.25s ease'
                }}
              >
                <img src="/assets/jazzcash-badge.svg" alt="JazzCash" style={{ height: '34px', width: 'auto' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--ivory-white)' }}>
                  JazzCash Mobile Wallet
                </span>
              </button>

              {/* EasyPaisa Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('easypaisa')}
                style={{
                  padding: '16px 14px',
                  background: paymentMethod === 'easypaisa' ? 'rgba(0, 168, 89, 0.2)' : 'rgba(0, 0, 0, 0.4)',
                  border: `2px solid ${paymentMethod === 'easypaisa' ? '#00A859' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.25s ease'
                }}
              >
                <img src="/assets/easypaisa-badge.svg" alt="EasyPaisa" style={{ height: '34px', width: 'auto' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--ivory-white)' }}>
                  EasyPaisa Mobile Wallet
                </span>
              </button>
            </div>
          </div>

          {/* 3. Transfer Instructions (JazzCash or EasyPaisa) */}
          <div
            style={{
              backgroundColor: 'rgba(5, 93, 9, 0.3)',
              border: '1px solid var(--gold-border)',
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold-bright)',
                marginBottom: '10px'
              }}
            >
              TRANSFER INSTRUCTIONS ({paymentMethod.toUpperCase()})
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--ivory-muted)', marginBottom: '14px' }}>
              Open your <strong>{paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'}</strong> App and send <strong>PKR {cartTotal > 0 ? cartTotal : 500}</strong> to:
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '6px',
                padding: '14px 18px',
                marginBottom: '8px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Account Mobile Number
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: 'var(--gold-bright)',
                    letterSpacing: '0.06em'
                  }}
                >
                  03108985387
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ivory-white)', marginTop: '2px' }}>
                  Receiver Name: <strong>Ali Ahmad / Ali Khan</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyNumber}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: copied ? 'rgba(5, 93, 9, 0.6)' : 'rgba(212, 175, 55, 0.2)',
                  border: `1px solid ${copied ? 'var(--pk-green-glow)' : 'var(--gold-primary)'}`,
                  color: copied ? '#A2E26E' : 'var(--gold-bright)',
                  padding: '10px 16px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'COPIED!' : 'COPY NUMBER'}</span>
              </button>
            </div>
          </div>

          {/* 4. Proof of Payment / Transaction Verification */}
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold-primary)',
                marginBottom: '8px'
              }}
            >
              3. ENTER TRANSACTION ID (TID)
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
              Enter the TID received in SMS confirmation from {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'}.
            </p>

            <input
              type="text"
              required
              placeholder="e.g. 10482938104"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '6px',
                color: 'var(--gold-bright)',
                fontSize: '1.05rem',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}
            />

            {/* Optional Screenshot Upload */}
            <div
              style={{
                border: '1px dashed rgba(212, 175, 55, 0.3)',
                borderRadius: '6px',
                padding: '14px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(0,0,0,0.3)'
              }}
              onClick={() => document.getElementById('checkout-screenshot-input').click()}
            >
              <input
                id="checkout-screenshot-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--ivory-muted)' }}>
                <Upload size={16} color="var(--gold-primary)" />
                <span>{screenshotName ? `Attached: ${screenshotName}` : 'Attach Payment Screenshot Receipt (Optional)'}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-gold"
            style={{ width: '100%', padding: '18px', fontSize: '0.95rem' }}
          >
            <ShieldCheck size={20} />
            <span>SUBMIT FOR PAYMENT VERIFICATION</span>
          </button>
        </form>
      </div>
    </div>
  );
}
