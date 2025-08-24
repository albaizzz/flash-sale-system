const { Sequelize } = require("sequelize");
const Product = require("./products.js");
const Sku = require("./sku.js");
const FlashSale = require("./flash-sale.js");
const FlashSaleSku = require("./flash-sale-sku.js");
const Order = require("./order.js");
const OrderItem = require("./order-item.js");
const User = require("./user.js");

const sequelize = new Sequelize("flash_sale", "root", "Secret123!", {
  host: "localhost",
  dialect: "mysql",
  logging: true,
  logging: console.log, // ✅ tampilkan semua query di console
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Product = Product(sequelize, Sequelize);
db.Sku = Sku(sequelize, Sequelize);
db.FlashSale = FlashSale(sequelize, Sequelize);
db.FlashSaleSku = FlashSaleSku(sequelize, Sequelize);
db.Order = Order(sequelize, Sequelize);
db.OrderItem = OrderItem(sequelize, Sequelize);
db.User = User(sequelize, Sequelize);

// Relations
db.Product.hasMany(db.Sku, { foreignKey: "product_id" });
db.Sku.belongsTo(db.Product, { foreignKey: "product_id" });

db.FlashSale.hasMany(db.FlashSaleSku, { foreignKey: "flash_sale_id" });
db.FlashSaleSku.belongsTo(db.FlashSale, { foreignKey: "flash_sale_id" });

db.Sku.hasMany(db.FlashSaleSku, { foreignKey: "sku_id" });
db.FlashSaleSku.belongsTo(db.Sku, { foreignKey: "sku_id" });

db.User.hasMany(db.Order, { foreignKey: "user_id" });
db.Order.belongsTo(db.User, { foreignKey: "user_id" });

db.FlashSale.hasMany(db.Order, { foreignKey: "flash_sale_id" });
db.Order.belongsTo(db.FlashSale, { foreignKey: "flash_sale_id" });

db.Order.hasMany(db.OrderItem, { foreignKey: "order_id" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "order_id" });

db.Sku.hasMany(db.OrderItem, { foreignKey: "sku_id" });
db.OrderItem.belongsTo(db.Sku, { foreignKey: "sku_id" });

module.exports = db;