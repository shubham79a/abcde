import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { NextRequest, NextResponse } from 'next/server';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: ['read_products'],
  hostName: process.env.HOST!.replace(/^https?:\/\//, ''),
  isEmbeddedApp: true,
  apiVersion: LATEST_API_VERSION,
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  try {
    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: new Response(), // ✅ important
    });
    //   const callbackParams = {
    //   rawRequest: req,
    //   rawResponse: new NextResponse(),
    //   query: Object.fromEntries(url.searchParams.entries()),
    // };

    const session = callbackResponse.session;
    const { shop, accessToken } = session;
    const host = url.searchParams.get('host');

    console.log('✅ Authenticated shop:', shop);
    console.log('🔑 Access token:', accessToken);

    return NextResponse.redirect(
      `https://${process.env.HOST}/?shop=${shop}&host=${host}`
    );
  } catch (e) {
    console.error('❌ OAuth callback failed:', e);
    return NextResponse.json({ error: 'OAuth callback failed', details: `${e}` }, { status: 500 });
  }
}
