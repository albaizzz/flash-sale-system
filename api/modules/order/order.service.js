const OrderRepository = require("./order.repository.js");

class OrderService {
    constructor() {
        this.repo = new OrderRepository();
    }
    // Define methods for order data access here
    async getFlashSaleSkuOrderCompleted(flashSaleSkuId, skuId) {
        return await this.repo.getFlashSaleSkuOrderCompleted(flashSaleSkuId, skuId);
    }
}

module.exports = new OrderService();

