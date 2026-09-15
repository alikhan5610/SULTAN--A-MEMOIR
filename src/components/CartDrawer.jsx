import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#031705',
          borderLeft: '1px solid var(--gold-border)',
          boxShadow: '-15px 0 50px rgba(0, 0, 0, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '30px',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Drawer Header */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              paddingBottom: '20px',
              marginBottom: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={20} color="var(--gold-primary)" />
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: 'var(--ivory-white)'
                }}
              >
                YOUR CART ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Close cart"
            >
              <X size={22} />
            </button>
          </div>

          {/* Cart Item List */}
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: 'var(--text-dim)', marginBottom: '20px' }}>
                Your cart is currently empty.
              </p>
              <a
                href="#the-book"
                onClick={() => setIsCartOpen(false)}
                className="btn-ghost"
                style={{ fontSize: '0.8rem', padding: '10px 20px' }}
              >
                Explore SULTAN: A MEMOIR
              </a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    background: 'rgba(5, 93, 9, 0.2)',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                    borderRadius: '8px',
                    padding: '16px'
                  }}
                >
                  {/* Book Cover Thumbnail */}
                  <img
                    src={item.cover}
                    alt={item.title}
                    style={{
                      width: '72px',
                      height: '96px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.98rem',
                            fontWeight: 700,
                            color: 'var(--ivory-white)'
                          }}
                        >
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#FF6B6B',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                        {item.author}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Quantity Selector */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'rgba(0, 0, 0, 0.4)',
                          borderRadius: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--ivory-white)',
                            padding: '4px 8px',
                            cursor: 'pointer'
                          }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, padding: '0 8px' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--ivory-white)',
                            padding: '4px 8px',
                            cursor: 'pointer'
                          }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: 'var(--gold-bright)'
                        }}
                      >
                        PKR {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Drawer Footer & Checkout Button */}
        {cart.length > 0 && (
          <div
            style={{
              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
              paddingTop: '24px',
              marginTop: '30px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '20px'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ivory-muted)'
                }}
              >
                TOTAL:
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--gold-bright)'
                }}
              >
                PKR {cartTotal}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="btn-gold"
              style={{ width: '100%', padding: '16px' }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={18} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '16px',
                fontSize: '0.74rem',
                color: 'var(--text-dim)'
              }}
            >
              <ShieldCheck size={14} color="var(--gold-primary)" />
              <span>Secure Pakistani Payment Process (JazzCash / EasyPaisa)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
