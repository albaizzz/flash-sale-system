const flashSaleService = require("./flash_sale.service");

class ProductController {
  async getAll(req, res, next) {
    try {
      const products = await productService.listProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async getActiveFlashSales(req, res, next) {
    try {
      const currentTime = new Date();
      const activeFlashSales = await flashSaleService.getActiveFlashSales(currentTime);
      res.json(activeFlashSales);
    } catch (err) {
      next(err);
    }
  }
}
  module.exports = new ProductController();