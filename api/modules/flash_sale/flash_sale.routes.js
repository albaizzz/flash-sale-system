const express = require("express");
const router = express.Router();
const flashSaleHandler = require("./flash_sale.handler");

// Define routes
router.get("/", flashSaleHandler.getActiveFlashSales);
module.exports = router;