// app.js
const express = require("express");
// Import routes per domain
const flashSaleRoutes = require("./flash_sale/flash_sale.routes.js");
const orderRoutes = require("./order/order.route.js");
const app = express();

app.use(express.json());

app.use("/api/sale", flashSaleRoutes);
app.use("/api/order", orderRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

module.exports = app;