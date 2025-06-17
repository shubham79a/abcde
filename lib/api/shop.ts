// pages/api/shop.ts
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { NextApiRequest, NextApiResponse } from "next";

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY!,
    apiSecretKey: process.env.SHOPIFY_API_SECRET!,
    scopes: process.env.SCOPES!.split(','),
    hostName: process.env.HOST!.replace(/^https?:\/\//, ''),
    isEmbeddedApp: true,
    apiVersion: LATEST_API_VERSION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { shop } = req.query;

    if (!shop || typeof shop !== 'string') {
        return res.status(400).json({ error: 'Missing shop param' });
    }

    try {
        const session = await shopify.session.customAppSession(shop);
        const client = new shopify.clients.Rest({ session });
        const response = await client.get({ path: 'shop' });

        res.status(200).json(response.body);
    } catch (error: any) {
        console.error('API error:', error);
        res.status(500).json({ error: error.message });
    }
}
