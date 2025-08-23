import { FlashSale } from '../../../models/flash_sale';


class FlashSaleRepository {
  async getByUserId() {
    return await FlashSale.findAll();
  }

  async getFlashSaleByUserId(userId) {
    const query = `
      SELECT fs.*
      FROM flash_sales fs
      INNER JOIN users u ON fs.user_id = u.id
      WHERE u.id = :userId
    `;
    return await FlashSale.sequelize.query(query, {
      replacements: { userId },
      type: FlashSale.sequelize.QueryTypes.SELECT,
    });
  }

  async getFlashSaleActiveByTime(currentTime) {
    const query = `
      SELECT *
      FROM flash_sales
      WHERE start_time <= :currentTime AND end_time >= :currentTime
    `;
    return await FlashSale.sequelize.query(query, {
      replacements: { currentTime },
      type: FlashSale.sequelize.QueryTypes.SELECT,
    });
  }

}

module.exports = new FlashSaleRepository();