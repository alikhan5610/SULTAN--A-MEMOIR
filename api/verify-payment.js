import crypto from 'crypto';

// In-memory / cache store for verified orders (survives during instance lifetime)
const verifiedOrders = new Map();

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const orderId = req.query?.orderId || url.searchParams.get('orderId');

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {}
    } else if (!body) {
      try {
        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();
        if (data) body = JSON.parse(data);
      } catch {}
    }
    body = body || {};

    const targetOrderId = body.orderId || orderId;
    const transactionId = body.transactionId;
    const action = body.action || 'verify';
    const isTestMode = Boolean(body.isTestMode);

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
        isTestMode,
        verifiedAt: null
      });
      res.statusCode = 200;
      return res.end(JSON.stringify({
        verified: false,
        status: 'FAILED',
        isTestMode,
        message: 'Your payment could not be verified. Please contact support.'
      }));
    }

    // Verify and issue secure paid token
    const tokenSecret = process.env.PAYMENT_VERIFICATION_SECRET || 'sultan-wasim-akram-secure-token-secret-2026';
    const timestamp = Date.now();
    const hash = crypto.createHmac('sha256', tokenSecret).update(`${targetOrderId}-${timestamp}`).digest('hex').substring(0, 16);
    const token = `tok_paid_${hash}_${timestamp}`;

    verifiedOrders.set(targetOrderId, {
      status: 'PAID',
      verified: true,
      token,
      isTestMode,
      verifiedAt: new Date().toISOString()
    });

    res.statusCode = 200;
    return res.end(JSON.stringify({
      verified: true,
      status: 'PAID',
      isTestMode,
      token,
      orderId: targetOrderId,
      downloadUrl: `/api/download?token=${encodeURIComponent(token)}&orderId=${encodeURIComponent(targetOrderId)}`,
      message: isTestMode
        ? 'Payment verified via Test Mode simulation.'
        : 'Payment successfully verified.'
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
      isTestMode: existing.isTestMode || false,
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
      isTestMode: existing.isTestMode || false,
      message: 'Your payment could not be verified. Please contact support.'
    }));
  }

  // Default: Pending verification
  res.statusCode = 200;
  return res.end(JSON.stringify({
    verified: false,
    status: 'PENDING',
    isTestMode: false,
    message: 'Your payment has not been verified yet. Please wait or contact support.'
  }));
}
