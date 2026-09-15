import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Secure backend download & verification middleware for development
function secureBookServerPlugin() {
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
              message: 'Valid paid verification token required to download SULTAN: A MEMOIR.'
            }));
            return;
          }

          const baseDir = import.meta.dirname || process.cwd();
          const filePath = path.resolve(baseDir, 'server/protected-storage/Sultan-A-Memoir-Wasim-Akram.pdf');

          if (!fs.existsSync(filePath)) {
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
            'Cache-Control': 'no-store, no-cache, must-revalidate, private'
          });

          const stream = fs.createReadStream(filePath);
          stream.pipe(res);
          return;
        }

        // Verification Status API Endpoint
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
