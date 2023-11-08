import verifyWebhook from './verifyWebhook.js';
import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import enqueueWebhookTask from './enqueueWebhookTask.js';
import checkoutUpdate from './webhook_handlers/checkoutUpdate.js';

const app = express();
const port = 3000;

/**
 * Avoid converting from a raw buffer to a JavaScript object, 
 * otherwise it will be impossible to obtain the raw request 
 * body that is needed for HMAC validation.
 */
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));

app.post('/webhook', (req, res) => {
    if (verifyWebhook(req)) {
        const topic = req.headers['x-shopify-topic'];
        if (topic === 'checkouts/update') {
            enqueueWebhookTask(req.body, checkoutUpdate);
        }
        // other handlers
    } else {
        console.log('Webhook failed =(');
    }

    res.status(200).send('Webhook received!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
