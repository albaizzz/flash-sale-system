module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    order_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: DataTypes.INTEGER,
    sku_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(12,2),
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL(12,2),
  }, {
    tableName: "order_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return OrderItem;
};
