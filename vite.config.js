import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Secure backend download & verification middleware for development
function secureBookServerPlugin() {
  const verifiedOrders = new Map();

  return {
    name: 'secure-book-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const parsedUrl = new URL(req.url, 'http://localhost');

        // Protected PDF Download Endpoint
        if (parsedUrl.pathname === '/api/download') {
          const token = parsedUrl.searchParams.get('token');
          const orderId = parsedUrl.searchParams.get('orderId');

          // Strict validation: Token must exist and start with tok_paid_
          if (!token || !token.startsWith('tok_paid_')) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              error: 'Forbidden',
              verified: false,
              message: 'Your payment has not been verified yet. Please wait or contact support.'
            }));
            return;
          }

          const baseDir = import.meta.dirname || process.cwd();
          const candidatePaths = [
            path.resolve(baseDir, 'api/Sultan-A-Memoir-Wasim-Akram.pdf'),
            path.resolve(baseDir, 'server/protected-storage/Sultan-A-Memoir-Wasim-Akram.pdf'),
            path.resolve(baseDir, 'raw_assets/Sultan A Memoir.pdf')
          ];

          let filePath = null;
          for (const p of candidatePaths) {
            if (fs.existsSync(p)) {
              filePath = p;
              break;
            }
          }

          if (!filePath) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'File Not Found', message: 'Book file is currently offline.' }));
            return;
          }

          const stat = fs.statSync(filePath);
          res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': stat.size,
            'Content-Disposition': 'attachment; filename="Sultan-A-Memoir-Wasim-Akram.pdf"',
            'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            'Accept-Ranges': 'bytes'
          });

          const stream = fs.createReadStream(filePath);
          stream.pipe(res);
          return;
        }

        // Verification Status API Endpoint
        if (parsedUrl.pathname === '/api/verify-payment') {
          res.setHeader('Content-Type', 'application/json');

          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (chunk) => { bodyStr += chunk; });
            req.on('end', () => {
              let body = {};
              try { body = JSON.parse(bodyStr); } catch {}
              const orderId = body.orderId || parsedUrl.searchParams.get('orderId');
              const action = body.action || 'verify';

              if (action === 'reject') {
                verifiedOrders.set(orderId, { status: 'FAILED', verified: false });
                res.statusCode = 200;
                res.end(JSON.stringify({
                  verified: false,
                  status: 'FAILED',
                  message: 'Your payment could not be verified. Please contact support.'
                }));
                return;
              }

              const token = `tok_paid_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
              verifiedOrders.set(orderId, {
                status: 'PAID',
                verified: true,
                token
              });

              res.statusCode = 200;
              res.end(JSON.stringify({
                verified: true,
                status: 'PAID',
                token,
                orderId,
                downloadUrl: `/api/download?token=${encodeURIComponent(token)}&orderId=${encodeURIComponent(orderId)}`,
                message: 'Payment successfully verified.'
              }));
            });
            return;
          }

          const orderId = parsedUrl.searchParams.get('orderId');
          const existing = verifiedOrders.get(orderId);
          if (existing && existing.verified) {
            res.statusCode = 200;
            res.end(JSON.stringify({
              verified: true,
              status: 'PAID',
              token: existing.token,
              downloadUrl: `/api/download?token=${encodeURIComponent(existing.token)}&orderId=${encodeURIComponent(orderId)}`,
              message: 'Payment has been successfully verified.'
            }));
            return;
          }

          if (existing && existing.status === 'FAILED') {
            res.statusCode = 200;
            res.end(JSON.stringify({
              verified: false,
              status: 'FAILED',
              message: 'Your payment could not be verified. Please contact support.'
            }));
            return;
          }

          res.statusCode = 200;
          res.end(JSON.stringify({
            verified: false,
            status: 'PENDING',
            message: 'Your payment has not been verified yet. Please wait or contact support.'
          }));
          return;
        }

        // Legacy endpoint alias
        if (parsedUrl.pathname === '/api/verify-order') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'ONLINE',
            merchant: 'Ali Ahmad / Ali Khan',
            accounts: {
              jazzcash: '03108985387',
              easypaisa: '03108985387'
            },
            price: 500,
            currency: 'PKR'
          }));
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), secureBookServerPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
