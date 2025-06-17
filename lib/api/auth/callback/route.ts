import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { NextResponse } from 'next/server';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: ['read_products'],
  hostName: process.env.HOST!.replace(/^https?:\/\//, ''),
  isEmbeddedApp: true,
  apiVersion: LATEST_API_VERSION,
});

export async function GET(req: Request) {
  const url = new URL(req.url);

  const callbackParams = {
    rawRequest: req,
    rawResponse: new NextResponse(),
    query: Object.fromEntries(url.searchParams.entries()),
  };

  try {
    const callbackResponse = await shopify.auth.callback(callbackParams);
    const session = callbackResponse.session;

    const { shop, accessToken } = session;

    console.log('Authenticated shop:', shop);
    console.log('Access token:', accessToken);

    return NextResponse.redirect(
      `https://${shop}/admin/apps?host=${Buffer.from(`${shop}/admin`).toString('base64')}`
    );
  } catch (e) {
    return NextResponse.json({ error: 'OAuth callback failed', details: e }, { status: 500 });
  }
}
