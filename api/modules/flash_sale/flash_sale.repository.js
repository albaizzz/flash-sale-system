// repositories/flashSaleRepository.js
const db = require("../../models"); // otomatis ambil index.js
const { FlashSale, sequelize, Sequelize } = db;

class FlashSaleRepository {

  /**
   * Get active flash sales by current time
   * @param {Date|string} currentTime - Current timestamp to check against
   * @returns {Promise<Array>} Array of currently active flash sales
   */
  async getFlashSaleActiveByTime(currentTime) {
    const query = `
      SELECT *
      FROM flash_sales
      WHERE :currentTime BETWEEN start_time AND end_time
    `;
    return await sequelize.query(query, {
      replacements: { currentTime },
      type: Sequelize.QueryTypes.SELECT,
    });
  }

  async  getFlashSaleActiveItems(currentTime, flashSaleSkuId = null) {
    var query = `
      SELECT fs.flash_sale_id, fss.flash_sale_sku_id, fss.max_per_user , fs.status_flash_sale, fs.start_time, fs.end_time, fss.sku_id, fss.stock_flash_sale, s.price, fss.price_flash_sale , ROUND(((s.price - fss.price_flash_sale) / s.price) * 100, 2) AS discount_percent,
             s.sku_code, s.price, p.product_id, p.product_code, p.product_name, p.description, p.image_url, p.gallery
      FROM flash_sales fs
      JOIN flash_sale_skus fss ON fs.flash_sale_id = fss.flash_sale_id
      JOIN skus s ON fss.sku_id = s.sku_id
      JOIN products p ON s.product_id = p.product_id
      WHERE :currentTime BETWEEN fs.start_time AND fs.end_time`;
      if (flashSaleSkuId !== null) {
        query += ` AND fss.flash_sale_sku_id = :flashSaleSkuId`;
      }
    return await sequelize.query(query, {
      replacements: { currentTime , flashSaleSkuId},
      type: Sequelize.QueryTypes.SELECT,
    });
  }
  
  async getFlashSaleSkuOrderCompleted(skuId) {
      const query = `
      select count(1) as count from orders o
      inner join order_items oi on o.order_id  = oi.order_id
      inner join flash_sales fs on o.flash_sale_id  = fs.flash_sale_id
      where oi.sku_id = :skuId
      and now() BETWEEN fs.start_time AND fs.end_time
      and o.order_status = 'completed'`;
      const results = await sequelize.query(query, {
        replacements: { skuId },
        type: Sequelize.QueryTypes.SELECT,
      });
      return results[0];
  }
}

module.exports = FlashSaleRepository;
