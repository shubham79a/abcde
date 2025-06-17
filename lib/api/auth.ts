import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const shop = req.query.shop as string;
    if (!shop) return res.status(400).send('Missing shop');

    const redirectUri = `https://abcde-sandy.vercel.app/api/auth/callback`;

    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SCOPES}&redirect_uri=${redirectUri}`;

    res.redirect(installUrl);
}
