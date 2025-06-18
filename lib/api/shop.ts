import { shopify, sessionStorage } from '../../lib/shopify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionId = await shopify.session.getCurrentId({
    rawRequest: req,
    rawResponse: res,
    isOnline: false,
  });

  if (!sessionId) return res.status(401).json({ error: 'Unauthenticated' });

  const session = await sessionStorage.loadSession(sessionId);

  try {
    const client = new shopify.clients.Rest({ session });
    const response = await client.get({ path: 'shop' });
    res.status(200).json(response.body);
  } catch (err: any) {
    console.error('Shop API error:', err);
    res.status(500).json({ error: err.message });
  }
}
