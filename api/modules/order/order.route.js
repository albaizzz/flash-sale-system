const express = require("express");
const router = express.Router();
const orderHandler = require("./order.handler.js");

// Define routes
router.post("/", orderHandler.createOrder);
module.exports = router;