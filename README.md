# shopify-webhooks-starter
A starter app to manage your Shopify store's webhooks

# Gettings started
## How to develop
1. npm install
2. npm run dev
3. ngrok http [your_port] (as default 3000)

You can use whatever you want for tunneling, but I use ngrok. You need it to make you localserver public so that Shopify can interact with your server.

4. Take the URL which ngrok has generated and append "/webhook", you should have something like: https://c120b310f4a7.ngrok.app/webhook
5. Go to Shopify store's admin pannel -> Settings -> Notification -> Webhooks and create one providing the URL you got from the 4th step.
6. After creating a webhook you will got a key for verifying webhook integrity. Copy the key and create .env file in your project folder.
7. Paste the key in .env file so you got something like this: SHOPIFY_SECRET=ddf3aec7ff3d6e0e7f9364b978d201310444e58813f323492afafe4f088a7abe.
8. Reload the server and then go back to Shopify admin pannel -> Webhooks and click "Send test notification" button to make sure anything works.