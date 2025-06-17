// app/api/shop/route.ts

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const shop = req.nextUrl.searchParams.get('shop');

    if (!shop) {
        return new Response(JSON.stringify({ error: 'Missing shop parameter' }), {
            status: 400,
        });
    }

    try {
        const response = await fetch(`https://${shop}/admin/api/2023-10/shop.json`, {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!, // 👈 replace with your actual Admin Token if needed
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error: any) {
        console.error('Shopify API error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
