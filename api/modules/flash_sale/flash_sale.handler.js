// handlers/flash_sale.handler.js
const flashSaleService = require("./flash_sale.service.js");

class FlashSaleHandler {
  async getActiveFlashSales(req, res, next) {
    try {
      const currentTime = new Date();
      const activeFlashSales = await flashSaleService.getFlashSaleActiveByTime(currentTime);
      res.json({
        code: 2000,
        data: activeFlashSales,
        message: ""
      });
    } catch (err) {
      next(err);
    }
  }

  async getFlashSaleItems(req, res, next) {
    try {
      const currentTime = new Date();
      var  flashSaleSkuId = null;
      if (req.params.id) {
        flashSaleSkuId=req.params.id
      }
      const activeFlashSales = await flashSaleService.getFlashSaleActiveItems(currentTime, flashSaleSkuId);
      res.json({
        code: 2000,
        data: activeFlashSales,
        message: ""
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = new FlashSaleHandler();