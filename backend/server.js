const express = require("express");
const app = require("./app");
const { promisePool } = require("./config/db"); // Importation du pool de connexions MySQL

const port = 5000;

// Middleware qui permet de traiter les données de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, x-auth-token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Connecter à la base de données MySQL à l'aide du promisePool
promisePool
  .getConnection()
  .then((connection) => {
    console.log("Connecté à la base de données MySQL: resto_app !");
    connection.release();

    // Démarrer le serveur une fois la connexion à la base de données établie
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Quitter le processus en cas d'erreur de connexion à la base de données
  });

// Utiliser le middleware d'authentification uniquement pour les routes qui en ont besoin
const authenticateUser = require("./middleware/auth");
app.use("/api/items", authenticateUser, require("./routes/itemRoutes")); // Protéger les routes des articles avec le middleware d'authentification
app.use("/api/auth", require("./routes/user")); // Routes pour gérer les utilisateurs (auth)

// const express = require("express");
// const app = require("./app");
// const { promisePool } = require("./config/db"); // Importation du pool de connexions MySQL

// const port = 5000;

// // Middleware qui permet de traiter les données de la requête
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Connecter à la base de données MySQL à l'aide du promisePool
// promisePool
//   .getConnection()
//   .then((connection) => {
//     console.log("Connecté à la base de données MySQL: resto_app !");
//     connection.release();

//     // Démarrer le serveur une fois la connexion à la base de données établie
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//   })
//   .catch((err) => {
//     console.error("Error connecting to the database:", err);
//     process.exit(1); // Quitter le processus en cas d'erreur de connexion à la base de données
//   });

// // Utiliser le middleware d'authentification uniquement pour les routes qui en ont besoin
// const authenticateUser = require("./middleware/auth");
// app.use("/post", authenticateUser, require("./routes/itemRoutes")); // Protéger les routes d'ajout, de modification et de suppression des articles avec le middleware d'authentification
// app.use("/user", authenticateUser, require("./routes/user")); // Protéger les routes de modification et de suppression des utilisateurs avec le middleware d'authentification
