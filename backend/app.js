// const express = require("express");
// const app = express();
// const path = require("path");
// const authenticateUser = require("./middleware/auth"); // Importez le middleware d'authentification

// const itemRoutes = require("./routes/itemRoutes");
// const userRoutes = require("./routes/user");
// const cartRoutes = require("./routes/cartRoutes"); // Importez les routes du panier

// // Middleware pour gérer les en-têtes CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

// // Middleware pour traiter les données de la requête
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Routes pour gérer les articles (items)
// app.use("/api/items", authenticateUser, itemRoutes);

// // Routes pour gérer le panier (cart)
// app.use("/api/cart", authenticateUser, cartRoutes); // Utilisez le middleware d'authentification pour protéger les routes du panier

// // Routes pour gérer les utilisateurs (auth)
// app.use("/api/auth", userRoutes);

// // Middleware pour servir les images statiques depuis le dossier "images"
// app.use("/images", express.static(path.join(__dirname, "images")));

// module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const itemsRoutes = require("./routes/items");
const tablesRoutes = require("./routes/tables");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/tables", tablesRoutes);

// Gestionnaire d'erreur global
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Une erreur est survenue sur le serveur." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
