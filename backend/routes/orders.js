const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// router.post("/items", ordersController.createOrder);
router.post("/api/tableOrders", ordersController.createOrder);
router.post("/api/tableOrders/:tableNumber", ordersController.createOrder);
router.get(
  "/api/tableOrder/:tableNumber",
  ordersController.getOrderByTableNumber
);
router.get("/api/tableOrders", ordersController.getAllOrders);
router.put("/api/tableOrders/:tableNumber", ordersController.updateOrder);
router.delete("/api/tableOrders/:tableNumber", ordersController.deleteOrder);

module.exports = router;
