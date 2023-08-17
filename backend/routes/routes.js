// const express = require("express");
// const router = express.Router();
// const {
//   login,
//   getItems,
//   createItem,
//   updateItem,
//   deleteItem,
//   getOrders,
//   createOrder,
// } = require("./controllers");

// // Middleware de vérification d'authentification
// const isAuthenticated = (req, res, next) => {
//   // Mettez en place votre vérification d'authentification ici
//   // Par exemple, utilisez un middleware pour vérifier le jeton JWT
//   // Si l'authentification échoue, renvoyez une réponse d'erreur 401 (non autorisé)
//   // Sinon, appelez next() pour permettre l'accès à la route
//   next();
// };

// // Route de connexion
// router.post("/login", login);

// // Routes d'administration des articles
// router.get("/items", isAuthenticated, getItems);
// router.post("/items", isAuthenticated, createItem);
// router.put("/items/:id", isAuthenticated, updateItem);
// router.delete("/items/:id", isAuthenticated, deleteItem);

// // Routes de gestion des commandes
// router.get("/orders", isAuthenticated, getOrders);
// router.post("/orders", isAuthenticated, createOrder);

// module.exports = router;
