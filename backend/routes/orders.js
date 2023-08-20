const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.post("/items", ordersController.createOrder);

module.exports = router;
