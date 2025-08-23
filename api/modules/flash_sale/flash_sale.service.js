const flashSaleRepository = require("./flash_sale.repository");

class FlashSaleService {

  async getFlashSaleActiveByTime(currentTime) {
    return await flashSaleRepository.getFlashSaleActiveByTime(currentTime);
  }

}

module.exports = new FlashSaleService();