module.exports = (sequelize, DataTypes) => {
  const Sku = sequelize.define("Sku", {
    sku_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: DataTypes.INTEGER,
    sku_code: { type: DataTypes.STRING, unique: true },
    stock: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(12,2),
    weight: DataTypes.DECIMAL(10,2),
    dimension: DataTypes.STRING,
    status: DataTypes.TINYINT,
    name_sku: DataTypes.STRING,
  }, {
    tableName: "skus",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Sku;
};
