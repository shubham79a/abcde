import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: ['read_products', 'write_customers'],
  hostName: process.env.HOST!.replace(/^https?:\/\//, ''),
  isEmbeddedApp: true,
  apiVersion: LATEST_API_VERSION,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get('shop');

  if (!shop) {
    return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 });
  }

  const authRoute = await shopify.auth.begin({
    shop,
    callbackPath: '/api/auth/callback',
    isOnline: true,
    rawRequest: req,
    rawResponse: new Response(), // ✅ required
  });

  return NextResponse.redirect(authRoute.redirectUrl);
}
