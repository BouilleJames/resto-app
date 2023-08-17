// const express = require("express");
// const router = express.Router();
// const { promisePool } = require("../config/db"); // Importer le promisePool

// // Ajouter un article au panier
// router.post("/add-to-cart", (req, res) => {
//   const { itemId } = req.body;
//   const userId = req.auth.userId;

//   // Créer une nouvelle commande si l'utilisateur n'en a pas déjà une
//   promisePool
//     .execute(
//       "INSERT INTO orders (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = user_id",
//       [userId]
//     )
//     .then(() => {
//       // Insérer l'article dans la table order_items pour la commande de l'utilisateur
//       return promisePool.execute(
//         "INSERT INTO order_items (order_id, item_id, quantity) VALUES ((SELECT id FROM orders WHERE user_id = ?), ?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1",
//         [userId, itemId]
//       );
//     })
//     .then(() => {
//       res.status(200).json({ message: "Article ajouté au panier avec succès" });
//     })
//     .catch((error) => {
//       res.status(400).json({ error: error.message });
//     });
// });

// // Retirer un article du panier
// router.post("/remove-from-cart", (req, res) => {
//   const { itemId } = req.body;
//   const userId = req.auth.userId;

//   // Supprimer l'article du panier
//   promisePool
//     .execute(
//       "DELETE FROM order_items WHERE order_id = (SELECT id FROM orders WHERE user_id = ?) AND item_id = ?",
//       [userId, itemId]
//     )
//     .then(() => {
//       res.status(200).json({ message: "Article retiré du panier avec succès" });
//     })
//     .catch((error) => {
//       res.status(400).json({ error: error.message });
//     });
// });

// // Récupérer le contenu du panier
// router.get("/get-cart", (req, res) => {
//   const userId = req.auth.userId;

//   // Récupérer les articles du panier de l'utilisateur
//   promisePool
//     .execute(
//       "SELECT i.id, i.title, i.description, i.price, i.image_url, oi.quantity FROM items i JOIN order_items oi ON i.id = oi.item_id WHERE oi.order_id = (SELECT id FROM orders WHERE user_id = ?)",
//       [userId]
//     )
//     .then(([rows]) => {
//       res.status(200).json(rows);
//     })
//     .catch((error) => {
//       res.status(400).json({ error: error.message });
//     });
// });

// module.exports = router;
