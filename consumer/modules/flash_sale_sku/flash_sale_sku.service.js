const FlashSaleSKURepository = require("./flash_sale_sku.repository.js");
const orderQueue = require("./order.queue.js"); // import BullMQ queue


class FlashSaleSKUService  {
    
    constructor() {
        this.flashSaleSKURepository = new FlashSaleSKURepository();
    }

    async processOrderFlashSaleSKU(orderData) {
        try {
            //deduct stock flash sale and update to db
            console.log("Processing flash sale SKU order:", orderData);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new FlashSaleSKUService();

