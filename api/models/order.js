module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    flash_sale_id: DataTypes.INTEGER,
    order_status: { type: DataTypes.STRING, defaultValue: "pending" },
    total_price: DataTypes.DECIMAL(12,2),
  }, {
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Order;
};
