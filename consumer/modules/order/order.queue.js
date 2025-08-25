const { Queue } = require('bullmq');
const connection = require('../redis/connection');

const orderQueue = new Queue('order-queue', { connection });

module.exports = orderQueue;