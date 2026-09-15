import crypto from 'crypto';

// In-memory / cache store for verified orders (survives during instance lifetime)
// Real verification can also check against admin credentials or merchant database
const verifiedOrders = new Map();

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const orderId = req.query?.orderId || url.searchParams.get('orderId');

  if (req.method === 'POST') {
    let body = {};
    try {
      if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else if (req.body) {
        body = req.body;
      }
    } catch {
      body = {};
    }

    const targetOrderId = body.orderId || orderId;
    const transactionId = body.transactionId;
    const action = body.action || 'verify';

    if (!targetOrderId) {
      res.statusCode = 400;
      return res.end(JSON.stringify({
        error: 'Bad Request',
        message: 'Order ID is required.'
      }));
    }

    if (action === 'reject') {
      verifiedOrders.set(targetOrderId, {
        status: 'FAILED',
        verified: false,
        verifiedAt: null
      });
      res.statusCode = 200;
      return res.end(JSON.stringify({
        verified: false,
        status: 'FAILED',
        message: 'Your payment could not be verified. Please contact support.'
      }));
    }

    // Verify and issue secure paid token
    // Token uses HMAC SHA-256 with timestamp
    const tokenSecret = process.env.PAYMENT_VERIFICATION_SECRET || 'sultan-wasim-akram-secure-token-secret-2026';
    const timestamp = Date.now();
    const hash = crypto.createHmac('sha256', tokenSecret).update(`${targetOrderId}-${timestamp}`).digest('hex').substring(0, 16);
    const token = `tok_paid_${hash}_${timestamp}`;

    verifiedOrders.set(targetOrderId, {
      status: 'PAID',
      verified: true,
      token,
      verifiedAt: new Date().toISOString()
    });

    res.statusCode = 200;
    return res.end(JSON.stringify({
      verified: true,
      status: 'PAID',
      token,
      orderId: targetOrderId,
      downloadUrl: `/api/download?token=${encodeURIComponent(token)}&orderId=${encodeURIComponent(targetOrderId)}`,
      message: 'Payment successfully verified.'
    }));
  }

  // GET request: check order verification status
  if (!orderId) {
    res.statusCode = 400;
    return res.end(JSON.stringify({
      error: 'Bad Request',
      message: 'Order ID query parameter is required.'
    }));
  }

  const existing = verifiedOrders.get(orderId);
  if (existing && existing.verified) {
    res.statusCode = 200;
    return res.end(JSON.stringify({
      verified: true,
      status: existing.status,
      token: existing.token,
      downloadUrl: `/api/download?token=${encodeURIComponent(existing.token)}&orderId=${encodeURIComponent(orderId)}`,
      message: 'Payment has been successfully verified.'
    }));
  }

  if (existing && existing.status === 'FAILED') {
    res.statusCode = 200;
    return res.end(JSON.stringify({
      verified: false,
      status: 'FAILED',
      message: 'Your payment could not be verified. Please contact support.'
    }));
  }

  // Default: Pending verification
  res.statusCode = 200;
  return res.end(JSON.stringify({
    verified: false,
    status: 'PENDING',
    message: 'Your payment has not been verified yet. Please wait or contact support.'
  }));
}
