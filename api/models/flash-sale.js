module.exports = (sequelize, DataTypes) => {
  const FlashSale = sequelize.define("FlashSale", {
    flash_sale_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status_flash_sale: DataTypes.TINYINT,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
  }, {
    tableName: "flash_sales",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return FlashSale;
};
