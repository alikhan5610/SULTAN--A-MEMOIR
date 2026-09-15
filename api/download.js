import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { token, orderId } = req.query;

  if (!token || !token.startsWith('tok_paid_')) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Valid paid verification token required to download SULTAN: A MEMOIR.'
    });
  }

  const filePath = path.join(process.cwd(), 'server/protected-storage/Sultan-A-Memoir-Wasim-Akram.pdf');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File Not Found', message: 'Book file is currently offline.' });
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
}
