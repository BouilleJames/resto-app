const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// router.post("/items", ordersController.createOrder);
router.post("/api/tableOrders", ordersController.createOrder);
router.post("/api/tableOrders/:tableNumber", ordersController.createOrder);

module.exports = router;
