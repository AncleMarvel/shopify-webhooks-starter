# Shopify Webhooks Starter

This starter application facilitates the management of Shopify store webhooks, providing a local development setup for webhook integration and testing.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- A Shopify store with admin access
- [ngrok](https://ngrok.com/) or any similar tunneling service for local development

### Development Setup

Follow these steps to set up and run your local development environment:

1. Install dependencies:

    ```
    npm instal
    ```
2. Start the development server:

    ```
    npm run dev
    ```
3. Set up a tunnel to your local server using ngrok (default port is 3000):

    ```
    ngrok http 3000
    ```

### Configuring Webhooks with Shopify

1. Take the HTTPS URL provided by ngrok and append /webhook to it. For example:

    ```
    https://<your-ngrok-subdomain>.ngrok.io/webhook
    ```
2. In your Shopify store's admin panel, navigate to Settings > Notifications > Webhooks.
3. Create a new webhook by providing the URL obtained from the above step.
4. Upon creation, Shopify will provide a key to verify webhook integrity. Copy this key.
5. Create a .env file in your project folder and paste the key like so:

```
SHOPIFY_SECRET=<your-shopify-secret-key>
```

6. Restart your server to load the new environment variables.

7. Go back to the Shopify admin panel under Webhooks and click the "Send test notification" button to ensure everything is set up correctly.

### Handling Webhooks
Implement your webhook handlers in `server.js`. Ensure you wrap them with the `enqueueWebhookTask` function for proper processing. For example:

```
enqueueWebhookTask(req.body, yourCallbackFunction);
```
