// services/flash_sale.service.js
const FlashSaleRepository = require("./flash_sale.repository.js");
const { Order } = require("../../models/index.js");

class FlashSaleService {
  constructor() {
    this.flashSaleRepository = new FlashSaleRepository();
  }
  async getFlashSaleActiveByTime(currentTime) {
    return await this.repo.getFlashSaleActiveByTime(currentTime);
  }

  async getFlashSaleActiveItems(currentTime, flashSaleSkuId = null) {
    var items = await this.flashSaleRepository.getFlashSaleActiveItems(currentTime,flashSaleSkuId);
    if (flashSaleSkuId !== null) {
      if (items.length === 0) {
        throw new Error("Flash Sale Item not found or not active");
      }
      items[0] = Object.assign(items[0], { order_eligible:  true });
      var SkuComplete = await this.getFlashSaleSkuOrderCompleted(items[0].sku_id);  
      if (SkuComplete.count >= items[0].max_per_user) {
        items[0].order_eligible = false;
      } 
      items[0].user_ordered = SkuComplete.count;
      // Example static value, replace with actual logic if needed  
      console.log("Fetching details for Flash Sale SKU ID:", flashSaleSkuId);
      //check with order repository
    }
    return items;
  }

  async getFlashSaleSkuOrderCompleted(skuId) {
    return await this.flashSaleRepository.getFlashSaleSkuOrderCompleted(skuId);
  }
}

module.exports =  FlashSaleService;