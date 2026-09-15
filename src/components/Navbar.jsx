import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen, activeOrder, setIsAdminOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Legacy', href: '#legacy' },
    { name: 'The Book', href: '#the-book' },
    { name: 'Preview', href: '#preview' },
    { name: 'Purchase', href: '#the-book' }
  ];

  return (
    <header
      className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled ? 'rgba(1, 14, 3, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
        padding: isScrolled ? '16px 0' : '28px 0'
      }}
    >
      <div className="editorial-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Creator Initials Brand: 'ak' in lowercase */}
        <a
          href="#"
          className="brand-signature"
          title="Ali Khan — SULTAN: A MEMOIR"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.85rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
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
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: 'var(--text-dim)',
              textTransform: 'uppercase'
            }}
          >
            / Ali Khan
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ivory-muted)',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-bright)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-muted)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Icons: Cart & Order Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Active Order Pill Indicator if present */}
          {activeOrder && (
            <button
              onClick={() => setIsAdminOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: activeOrder.status === 'PAID' ? 'rgba(5, 93, 9, 0.4)' : 'rgba(212, 175, 55, 0.2)',
                border: `1px solid ${activeOrder.status === 'PAID' ? 'var(--pk-green-glow)' : 'var(--gold-primary)'}`,
                color: activeOrder.status === 'PAID' ? '#A2E26E' : 'var(--gold-bright)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)'
              }}
              title="View your order status"
            >
              <ShieldCheck size={14} />
              <span>{activeOrder.status === 'PAID' ? 'PAID / READY' : 'ORDER PENDING'}</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping Cart with ${cartCount} items`}
            style={{
              position: 'relative',
              background: 'rgba(5, 93, 9, 0.3)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '6px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--ivory-white)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold-primary)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <ShoppingBag size={18} color="var(--gold-primary)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em' }}>CART</span>
            {cartCount > 0 && (
              <span
                style={{
                  background: 'var(--gold-gradient)',
                  color: '#021705',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  marginLeft: '2px'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--ivory-white)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(1, 14, 3, 0.98)',
            borderBottom: '1px solid var(--gold-border)',
            backdropFilter: 'blur(20px)',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ivory-white)',
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
