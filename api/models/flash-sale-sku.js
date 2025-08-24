module.exports = (sequelize, DataTypes) => {
  const FlashSaleSku = sequelize.define("FlashSaleSku", {
    flash_sale_sku_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    flash_sale_id: DataTypes.INTEGER,
    sku_id: DataTypes.INTEGER,
    price_flash_sale: DataTypes.DECIMAL(12,2),
    stock_flash_sale: DataTypes.INTEGER,
  }, {
    tableName: "flash_sale_skus",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return FlashSaleSku;
};
