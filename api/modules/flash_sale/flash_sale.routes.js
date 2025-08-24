const express = require("express");
const router = express.Router();
const flashSaleHandler = require("./flash_sale.handler.js");

// Define routes
router.get("/", flashSaleHandler.getActiveFlashSales);
router.get("/items", flashSaleHandler.getFlashSaleItems);
router.get("/items/:id", flashSaleHandler.getFlashSaleItems);
module.exports = router;