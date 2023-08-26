const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

// Récupérer les articles
router.get("/items", itemsController.getItems);

// Récupérer un article par ID
router.get("/items/:id", itemsController.getItemById);

// Créer un nouvel article
router.post("/items", itemsController.createItem);

// Mettre à jour un article existant
router.put("/items/:id", itemsController.updateItem);

// Supprimer un article
router.delete("/items/:id", itemsController.deleteItem);

// Exportez le routeur
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const itemsController = require("../controllers/itemsController");
// const { Item } = require("../models");

// // Créer un nouvel article
// router.post("/items", async (req, res) => {
//   try {
//     const newItem = await Item.create(req.body);
//     res.status(201).json(newItem);
//   } catch (error) {
//     console.error("Erreur lors de la création de l'article:", error);
//     res
//       .status(500)
//       .json({ message: "Erreur lors de la création de l'article." });
//   }
// });

// // Mettre à jour un article existant
// router.put("/items/:id", async (req, res) => {
//   const itemId = req.params.id;
//   try {
//     const updatedItem = await Item.update(req.body, {
//       where: { id: itemId },
//     });
//     res.json(updatedItem);
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour de l'article:", error);
//     res
//       .status(500)
//       .json({ message: "Erreur lors de la mise à jour de l'article." });
//   }
// });

// // Supprimer un article
// router.delete("/items/:id", async (req, res) => {
//   const itemId = req.params.id;
//   try {
//     await Item.destroy({ where: { id: itemId } });
//     res.json({ message: "Article supprimé avec succès." });
//   } catch (error) {
//     console.error("Erreur lors de la suppression de l'article:", error);
//     res
//       .status(500)
//       .json({ message: "Erreur lors de la suppression de l'article." });
//   }
// });

// module.exports = router;
