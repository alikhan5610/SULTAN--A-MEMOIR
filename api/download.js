import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
    const token = req.query?.token || url.searchParams.get('token');
    const orderId = req.query?.orderId || url.searchParams.get('orderId');

    // Strict security check: Token must exist and start with tok_paid_
    if (!token || typeof token !== 'string' || !token.startsWith('tok_paid_')) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        error: 'Forbidden',
        verified: false,
        message: 'Your payment has not been verified yet. Please wait or contact support.'
      }));
    }

    // Comprehensive candidate paths across Vercel Lambda, Docker, and local Node
    const candidatePaths = [
      path.join(process.cwd(), 'api', 'Sultan-A-Memoir-Wasim-Akram.pdf'),
      path.join(__dirname, 'Sultan-A-Memoir-Wasim-Akram.pdf'),
      path.join(process.cwd(), 'server', 'protected-storage', 'Sultan-A-Memoir-Wasim-Akram.pdf'),
      path.join(__dirname, '..', 'server', 'protected-storage', 'Sultan-A-Memoir-Wasim-Akram.pdf'),
      path.join(process.cwd(), 'raw_assets', 'Sultan A Memoir.pdf'),
      path.join(__dirname, '..', 'raw_assets', 'Sultan A Memoir.pdf')
    ];

    let resolvedPath = null;
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        resolvedPath = p;
        break;
      }
    }

    if (!resolvedPath) {
      console.error('PDF file could not be located in candidate paths:', candidatePaths);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        error: 'File Unavailable',
        message: 'Book file is currently offline. Please contact support at 03108985387.'
      }));
    }

    // Synchronous buffer read guarantees full 2.7 MB payload delivery on Vercel Serverless
    const fileBuffer = fs.readFileSync(resolvedPath);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', fileBuffer.length);
    res.setHeader('Content-Disposition', 'attachment; filename="Sultan-A-Memoir-Wasim-Akram.pdf"');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Accept-Ranges', 'bytes');

    return res.end(fileBuffer);
  } catch (err) {
    console.error('Unhandled error in /api/download:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      error: 'Internal Server Error',
      message: 'Download failed. Please try again or contact support at 03108985387.'
    }));
  }
}
