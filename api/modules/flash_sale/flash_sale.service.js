// services/flash_sale.service.js
const FlashSaleRepository = require("./flash_sale.repository.js");

class FlashSaleService {
  constructor() {
    this.repo = new FlashSaleRepository();
  }
  async getFlashSaleActiveByTime(currentTime) {
    return await this.repo.getFlashSaleActiveByTime(currentTime);
  }

  async getFlashSaleActiveItems(currentTime, flashSaleSkuId = null) {
    return await this.repo.getFlashSaleActiveItems(currentTime,flashSaleSkuId);
  }
}

module.exports = new FlashSaleService();