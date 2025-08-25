// repositories/flashSaleRepository.js
const { type } = require("os");
const db = require("../../models"); // otomatis ambil index.js
const order = require("../order/order.model.js");
const { FlashSale, sequelize, Sequelize } = db;


class OrderRepository {
  // Define methods for order data access here
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

  async createOrder(trx, orderData) {
    const query = 'insert into orders (user_id, flash_sale_id, order_status, total_price) values (:userId, :flashSaleId, :orderStatus, :totalPrice)';
      const results = await sequelize.query(query, {
      replacements: { 
        userId: orderData.user_id,
        flashSaleId: orderData.flash_sale_id,
        orderStatus: orderData.order_status,
        totalPrice: orderData.total_price
      },
      type: Sequelize.QueryTypes.INSERT,
      transaction: trx
    });
    return results.insertId;;
  }

  async createOrderItem(orderId, orderItemData) {
    const query = 'insert into order_items (order_id, sku_id, qty, price, sub_total) values (:orderId, :skuId, :qty, :price, :subTotal)';
      const results = await sequelize.query(query, {
      replacements: { 
        orderId: orderId,
        skuId: orderItemData.sku_id,
        qty: orderItemData.qty,
        price: orderItemData.price,
        subTotal: orderItemData.qty * orderItemData.price
      },
      type: Sequelize.QueryTypes.INSERT,
      transaction: trx
    });
    return query;
  }
}

module.exports =  OrderRepository;