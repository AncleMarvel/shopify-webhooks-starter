import crypto from 'crypto';

function verifier(hmac, data, secret) {
    if (!hmac || !data || !secret) {
        return;
    }
    const generatedHash = crypto
        .createHmac('sha256', secret)
        .update(data, 'utf8')
        .digest('base64');

    return crypto.timingSafeEqual(Buffer.from(generatedHash), Buffer.from(hmac));
}


export default function verifyWebhook(req) {
    // How to use:
    // 'req' - request object from Express
    // 'process.env.SHOPIFY_SECRET' - the key which you got after creating a webhook in shopify admin pannel

    const hmacHeader = req.get('X-Shopify-Hmac-Sha256');
    const body = req.rawBody; // Make sure you haven't parsed the body to JSON or another format

    return verifier(hmacHeader, body, process.env.SHOPIFY_SECRET);
}