const orderRepository = require("./order.repository.js");
const flashSaleSkuService = require("../flash_sale_sku/flash_sale_sku.service.js");
const orderQueue = require("./order.queue.js"); // import BullMQ queue


class OrderService {
    
    constructor() {
        this.orderRepository = new orderRepository();
        this.flashSaleSkuService = new flashSaleService();
    }
    // Define methods for order data access here
    async getFlashSaleSkuOrderCompleted( skuId) {
        return await orderRepository.getFlashSaleSkuOrderCompleted(skuId);
    }

    async createOrder(orderData) {
        try {
            // Validate order data
            //check flash sale stock
            var fsItems = await this.flashSaleService.getFlashSaleActiveItems(new Date(), orderData.sku_id);
            if (fsItems.length == 0) {
                throw new Error("Flash Sale Item not found or not active");
            }
            if (fsItems[0].stock_flash_sale <= 0) {
                throw new Error("Flash Sale Item out of stock");
            }
            if (fsItems[0].order_eligible == false){
                throw new Error("You have reached the maximum order limit for this item in the flash sale");
            }
            if (fsItems[0].user_ordered + orderData.qty > fsItems[0].max_per_user){
                throw new Error("You have reached the maximum order limit for this item in the flash sale");
            }
            //validate order data qty, price and total price
            var fsItemsTotalProce = fsItems[0].price_flash_sale * orderData.qty;
            if (fsItemsTotalProce != orderData.total_price) {
                throw new Error("Invalid Order");
            }
            //publish order to queue
            orderQueue.add('flash-sale-order', orderData, {
                removeOnComplete: true,
                attempts: 3,          // retry jika gagal
                backoff: { type: 'exponential', delay: 2000 } // retry dengan jeda
            });
            return { message: "Order is being processed" };
        } 
        catch (error) {
            throw error;
        }
    }

    async processOrder(orderData) {

        const trx = await sequelize.transaction();
        try {
            // Simulate order processing logic
            console.log("Processing order:", orderData);
            //insert to db orders
            orderId = this.orderRepository.createOrder(trx, orderData);
            //insert to db order items
            this.orderRepository.createOrderItem(orderId,orderData);
            if (orderData.flash_sale_id != null) {
                //deduct stock flash sale
                this.flashSaleService.processOrderFlashSaleSKU(orderData.flash_sale_id, orderData.sku_id, orderData.qty, trx);
            } else {
                //deduct stock regular sale
            }  
            // Misalnya, simpan ke database atau update stock
            trx.commit();
            return { message: "Order processed successfully" };
        } catch (error) {
            trx.rollback();
            throw error;
        }
    }

}

module.exports = new OrderService();

