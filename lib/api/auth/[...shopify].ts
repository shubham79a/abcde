import { shopify } from '../../../lib/shopify';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query.shop) {
      const redirectUrl = await shopify.auth.begin({
        shop: req.query.shop,
        callbackPath: '/api/auth/callback',
        isOnline: true,
        rawRequest: req,
        rawResponse: res,
      });
      return res.redirect(redirectUrl);
    }
    return res.status(400).send('Missing shop param');
  }

  return res.status(405).send('Method Not Allowed');
}
