const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tablesController");

// Endpoint pour récupérer les commandes par table
router.get("/:tableId/orders", tablesController.getOrdersByTable);

// Autres routes pour créer, mettre à jour et supprimer des tables...

module.exports = router;
