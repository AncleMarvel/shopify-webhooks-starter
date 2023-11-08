/**
 * Shopify recommends responding to webhooks quickly and performing any additional processing asynchronously. 
 * This provides better scalability and reliability of the application, especially when processing a large 
 * number of webhooks or performing tasks that may take a long time. The queue approach allows your 
 * application to quickly respond to webhooks with a 200 OK confirmation while the actual data 
 * processing happens in the background.
 */

import Queue from 'better-queue';

// Creating a universal queued task processor
function universalTaskHandler(task, cb) {
  // Call a callback function with data
  task.callback(task.data);

  // Notify the queue that the task has completed
  cb();
}

// Create a queue instance
const myQueue = new Queue(universalTaskHandler);

// Function for adding a task to the queue
export default function enqueueWebhookTask(webhookData, callback) {
  // Add webhook data and callback function to the queue
  myQueue.push({ data: webhookData, callback });
}