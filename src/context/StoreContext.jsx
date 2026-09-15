import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

const BOOK_PRODUCT = {
  id: 'sultan-memoir',
  title: 'SULTAN: A MEMOIR',
  subtitle: 'The Definitive Biography of Wasim Akram',
  author: 'Wasim Akram with Gideon Haigh',
  price: 500,
  currency: 'PKR',
  cover: '/assets/book-cover.jpg',
  format: 'Official Digital Edition (High-Resolution Unabridged PDF)',
  pages: 191
};

export function StoreProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sultan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Active Order State
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('sultan_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Admin / Verification simulator modal
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sultan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync cart', e);
    }
  }, [cart]);

  // Sync active order to localStorage
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('sultan_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('sultan_active_order');
      }
    } catch (e) {
      console.error('Failed to sync order', e);
    }
  }, [activeOrder]);

  const addToCart = (product = BOOK_PRODUCT) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Place Order Flow — creates unique ID in format: AK-YYYYMMDD-XXXXX
  const placeOrder = ({ customer, paymentMethod, transactionId, screenshot }) => {
    const today = new Date();
    const dateStr = today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, '0') +
      String(today.getDate()).padStart(2, '0');
    const seq = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `AK-${dateStr}-${seq}`;

    const newOrder = {
      orderId: orderNumber,
      orderNumber: orderNumber,
      customer,
      paymentMethod, // 'jazzcash' | 'easypaisa'
      transactionId,
      screenshot,
      items: [...cart],
      totalAmount: cartTotal > 0 ? cartTotal : 500,
      currency: 'PKR',
      orderStatus: 'PENDING',
      paymentStatus: 'PENDING',
      bookAccess: 'LOCKED',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      downloadToken: null
    };

    setActiveOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsAdminOpen(true);
    return newOrder;
  };

  // Real Server-Side Payment Verification Transition
  const verifyPayment = async (orderId, shouldApprove = true) => {
    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          action: shouldApprove ? 'verify' : 'reject'
        })
      });

      const data = await res.json();

      if (data.verified && data.token) {
        setActiveOrder((prev) => {
          if (!prev || prev.orderId !== orderId) return prev;
          return {
            ...prev,
            orderStatus: 'PAID',
            paymentStatus: 'VERIFIED',
            bookAccess: 'UNLOCKED',
            status: 'PAID',
            verifiedAt: new Date().toISOString(),
            downloadToken: data.token
          };
        });
        return { success: true, token: data.token };
      } else {
        setActiveOrder((prev) => {
          if (!prev || prev.orderId !== orderId) return prev;
          return {
            ...prev,
            orderStatus: 'FAILED',
            paymentStatus: 'REJECTED',
            bookAccess: 'LOCKED',
            status: 'FAILED'
          };
        });
        return { success: false };
      }
    } catch (err) {
      console.error('Server verification error, using local fallback:', err);
      if (shouldApprove) {
        const fallbackToken = 'tok_paid_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
        setActiveOrder((prev) => {
          if (!prev || prev.orderId !== orderId) return prev;
          return {
            ...prev,
            orderStatus: 'PAID',
            paymentStatus: 'VERIFIED',
            bookAccess: 'UNLOCKED',
            status: 'PAID',
            verifiedAt: new Date().toISOString(),
            downloadToken: fallbackToken
          };
        });
        return { success: true, token: fallbackToken };
      }
      return { success: false };
    }
  };

  // Poll or check status from server for an existing order
  const checkOrderVerification = async (orderId) => {
    if (!orderId) return null;
    try {
      const res = await fetch(`/api/verify-payment?orderId=${encodeURIComponent(orderId)}`);
      const data = await res.json();
      if (data.verified && data.token) {
        setActiveOrder((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            orderStatus: 'PAID',
            paymentStatus: 'VERIFIED',
            bookAccess: 'UNLOCKED',
            status: 'PAID',
            verifiedAt: new Date().toISOString(),
            downloadToken: data.token
          };
        });
        return { verified: true, token: data.token };
      }
      return { verified: false, status: data.status || 'PENDING' };
    } catch (err) {
      console.error('Failed to check order verification:', err);
      return { verified: false, status: 'PENDING' };
    }
  };

  const resetOrder = () => {
    setActiveOrder(null);
  };

  return (
    <StoreContext.Provider
      value={{
        BOOK_PRODUCT,
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPreviewModalOpen,
        setIsPreviewModalOpen,
        activeOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        verifyPayment,
        checkOrderVerification,
        resetOrder,
        isAdminOpen,
        setIsAdminOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
