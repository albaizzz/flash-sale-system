const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("flash_sale", "root", "Secret123!", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Product = require("./product")(sequelize, Sequelize);
db.Sku = require("./sku")(sequelize, Sequelize);
db.FlashSale = require("./flashSale")(sequelize, Sequelize);
db.FlashSaleStock = require("./flashSaleStock")(sequelize, Sequelize);
db.Order = require("./order")(sequelize, Sequelize);
db.OrderItem = require("./orderItem")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

// Relations
db.Product.hasMany(db.Sku, { foreignKey: "product_id" });
db.Sku.belongsTo(db.Product, { foreignKey: "product_id" });

db.FlashSale.hasMany(db.FlashSaleStock, { foreignKey: "flash_sale_id" });
db.FlashSaleStock.belongsTo(db.FlashSale, { foreignKey: "flash_sale_id" });

db.Sku.hasMany(db.FlashSaleStock, { foreignKey: "sku_id" });
db.FlashSaleStock.belongsTo(db.Sku, { foreignKey: "sku_id" });

db.User.hasMany(db.Order, { foreignKey: "user_id" });
db.Order.belongsTo(db.User, { foreignKey: "user_id" });

db.FlashSale.hasMany(db.Order, { foreignKey: "flash_sale_id" });
db.Order.belongsTo(db.FlashSale, { foreignKey: "flash_sale_id" });

db.Order.hasMany(db.OrderItem, { foreignKey: "order_id" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "order_id" });

db.Sku.hasMany(db.OrderItem, { foreignKey: "sku_id" });
db.OrderItem.belongsTo(db.Sku, { foreignKey: "sku_id" });

module.exports = db;
