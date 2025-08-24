// services/flash_sale.service.js
const FlashSaleRepository = require("./flash_sale.repository.js");
const OrderService = require("../order/order.service.js");
const { Order } = require("../../models/index.js");

class FlashSaleService {
  constructor() {
    this.repo = new FlashSaleRepository();
    this.orderService = OrderService;
  }
  async getFlashSaleActiveByTime(currentTime) {
    return await this.repo.getFlashSaleActiveByTime(currentTime);
  }

  async getFlashSaleActiveItems(currentTime, flashSaleSkuId = null) {
    var items = await this.repo.getFlashSaleActiveItems(currentTime,flashSaleSkuId);
    if (flashSaleSkuId !== null) {
      items[0].order_eligible = true;
      var SkuComplete = await this.orderService.getFlashSaleSkuOrderCompleted(items[0].flash_sale_id, items[0].sku_id);  
      if (SkuComplete.count >= items[0].max_per_user) {
        items[0].order_eligible = false;
      } // Example static value, replace with actual logic if needed  
      console.log("Fetching details for Flash Sale SKU ID:", flashSaleSkuId);
      //check with order repository
    }
    return items;
  }
}

module.exports = new FlashSaleService();