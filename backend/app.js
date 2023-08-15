const express = require("express");
const app = express();
const path = require("path");
const authenticateUser = require("./middleware/auth"); // Importez le middleware d'authentification

const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cartRoutes"); // Importez les routes du panier

// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware pour traiter les données de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes pour gérer les articles (items)
app.use("/api/items", authenticateUser, itemRoutes);

// Routes pour gérer le panier (cart)
app.use("/api/cart", authenticateUser, cartRoutes); // Utilisez le middleware d'authentification pour protéger les routes du panier

// Routes pour gérer les utilisateurs (auth)
app.use("/api/auth", userRoutes);

// Middleware pour servir les images statiques depuis le dossier "images"
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
