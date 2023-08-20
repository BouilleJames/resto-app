const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/items", itemsController.getItems);
// Ajoutez d'autres routes pour créer, mettre à jour et supprimer des articles

module.exports = router;
