// repositories/flashSaleRepository.js
const db = require("../../models"); // otomatis ambil index.js
const { FlashSale, sequelize, Sequelize } = db;


class OrderRepository {
  // Define methods for order data access here
  async getFlashSaleSkuOrderCompleted(flashSaleSkuId, skuId) {
    const query = `
    select count(1) as count from orders o
    inner join order_items oi on o.order_id  = oi.order_id
    where o.flash_sale_id = :flashSaleSkuId
    and oi.sku_id = :skuId
    and o.order_status = 'completed';`;
    const results = await sequelize.query(query, {
      replacements: { flashSaleSkuId, skuId },
      type: Sequelize.QueryTypes.SELECT,
    });
    return results[0];
  }
}

module.exports = OrderRepository;