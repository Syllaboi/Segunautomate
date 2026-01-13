// Vercel serverless function for creating a Cloudinary upload signature
// Never put your secrets in the client. Add these in Vercel Project Settings -> Environment Variables:
// - CLOUDINARY_CLOUD_NAME
// - CLOUDINARY_API_KEY
// - CLOUDINARY_API_SECRET

import crypto from 'crypto';

export default async function handler(req, res) {
  // Allow GET for simplicity; you can switch to POST if you prefer
  const { folder = '' } = req.query || {};

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Missing Cloudinary env vars' });
  }

  // Cloudinary expects a Unix timestamp (seconds)
  const timestamp = Math.floor(Date.now() / 1000);

  // Build the string to sign: parameters sorted alphabetically joined with & then + apiSecret
  // We will sign: folder (optional) and timestamp
  const paramsToSign = [];
  if (folder) paramsToSign.push(`folder=${folder}`);
  paramsToSign.push(`timestamp=${timestamp}`);
  const stringToSign = paramsToSign.sort().join('&');

  const signature = crypto
    .createHash('sha1')
    .update(stringToSign + apiSecret)
    .digest('hex');

  return res.status(200).json({ timestamp, signature, cloudName, apiKey, folder });
}
