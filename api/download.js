import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Support both query parameters and URL parsing
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const token = req.query?.token || url.searchParams.get('token');
  const orderId = req.query?.orderId || url.searchParams.get('orderId');

  // Strict validation: Token must exist and start with tok_paid_
  if (!token || typeof token !== 'string' || !token.startsWith('tok_paid_')) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      error: 'Forbidden',
      verified: false,
      message: 'Your payment has not been verified yet. Please wait or contact support.'
    }));
  }

  // Robust path resolution across Vercel Lambda, Docker, and local environments
  const candidatePaths = [
    path.resolve(process.cwd(), 'api/Sultan-A-Memoir-Wasim-Akram.pdf'),
    path.resolve(process.cwd(), 'server/protected-storage/Sultan-A-Memoir-Wasim-Akram.pdf'),
    path.resolve(process.cwd(), 'raw_assets/Sultan A Memoir.pdf'),
    path.resolve(__dirname || '', 'Sultan-A-Memoir-Wasim-Akram.pdf'),
    path.resolve(__dirname || '', '../server/protected-storage/Sultan-A-Memoir-Wasim-Akram.pdf')
  ];

  let resolvedPath = null;
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      resolvedPath = p;
      break;
    }
  }

  if (!resolvedPath) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      error: 'File Unavailable',
      message: 'Book file is currently offline. Please contact support at 03108985387.'
    }));
  }

  const stat = fs.statSync(resolvedPath);

  // Set binary download headers for unabridged 191-page PDF
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Length': stat.size,
    'Content-Disposition': 'attachment; filename="Sultan-A-Memoir-Wasim-Akram.pdf"',
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Accept-Ranges': 'bytes'
  });

  const stream = fs.createReadStream(resolvedPath);
  stream.pipe(res);
}
