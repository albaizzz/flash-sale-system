const order = require("../../models/order.js");
const orderService = require("./order.service.js");

class OrderHandler {
  
  async createOrder(req, res) {
    try {
       await orderService.createOrder(req.body);
       console.log("Order request received:", req.body);
       res.json({
        code: 2000,
        data: {},
        message: "Order is being processed"
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports =  new OrderHandler();