module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_code: { type: DataTypes.STRING, unique: true, allowNull: false },
    name_product: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    gallery: DataTypes.JSON,
  }, {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Product;
};