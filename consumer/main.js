// consumers/order.consumer.js
const { Worker } = require('bullmq');
const OrderService = require('./modules/order/order.service.js');

const connection = {
  host: '127.0.0.1', // default Redis host
  port: 6379,        // default Redis port
};



const orderWorker = new Worker(
  'order-queue', // nama queue harus sama dengan waktu producer
  async (job) => {
    console.log(`Processing job ${job.id}...`);
    console.log("Data order:", job.data);

    // contoh logika proses order
    if (!job.data.sku_id) {
      throw new Error("SKU ID is required");
    }

    // misalnya update stock atau simpan ke DB
    console.log(`Order for SKU ${job.data.sku_id} is being processed...`);

    return {status: "success", processedAt: new Date()};
  },
  { connection }
);

orderWorker.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

orderWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed with error:`, err.message);
});
