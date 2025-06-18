import { shopify } from '../../../lib/shopify';

export default async function handler(req, res) {
  try {
    const { session } = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const redirectUrl = `/?shop=${session.shop}&host=${req.query.host}`;
    res.redirect(redirectUrl);
  } catch (e) {
    console.error('OAuth callback failed', e);
    res.status(500).send('Authentication error');
  }
}
