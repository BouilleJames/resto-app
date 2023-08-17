// derniere modif: 16/08/2021 par James
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure your MySQL connection
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "app_resto",
});

// Routes
// TODO: Define your API routes here
// Exemple de configuration pour renvoyer des données JSON
app.get("/api/orders", (req, res) => {
  const orders = [
    // ... vos données de commandes au format JSON
  ];
  res.json(orders);
});

app.get("/api/items", (req, res) => {
  const items = [
    {
      id: 1,
      category_id: 1,
      title: "Buttermilk Pancakes",
      description: "Je suis un pancake au caramel.",
      price: 15.99,
      image_url: "./images/item-1.jpeg",
    },
    {
      id: 2,
      category_id: 2,
      title: "Diner Double",
      description: "Burger,frites champignons et bacon.",
      price: 13.99,
      image_url: "./images/item-2.jpeg",
    },
    {
      id: 3,
      category_id: 4,
      title: "Godzilla Milkshake",
      description: "A la banane et à la fraise.",
      price: 6.99,
      image_url: "./images/item-5.jpeg",
    },
    {
      id: 4,
      category_id: 1,
      title: "country delight",
      description: "Un excellent Croc quand on a les crocs.",
      price: 20.99,
      image_url: "./images/item-4.jpeg",
    },
    {
      id: 5,
      category_id: 2,
      title: "egg attack",
      description: "Hamburger à l'oeuf pour les boxeurs.",
      price: 22.99,
      image_url: "./images/item-5.jpeg",
    },
    {
      id: 6,
      category_id: 4,
      title: "oreo dream",
      description: "Douceur au chocolat et à l'Oreo.",
      price: 18.99,
      image_url: "./images/item-6.jpeg",
    },
    {
      id: 7,
      category_id: 3,
      title: "bacon overflow",
      description: "Hamburger au bacon.",
      price: 8.99,
      image_url: "./images/item-7.jpeg",
    },
    {
      id: 8,
      category_id: 3,
      title: "american classic",
      description: "Hamburger classic, le goût des States.",
      price: 18.99,
      image_url: "./images/item-8.jpeg",
    },
    {
      id: 9,
      category_id: 4,
      title: "quarantine buddy",
      description: "Encas de Quarantaine, on est près.",
      price: 16.99,
      image_url: "./images/item-9.jpeg",
    },
  ];

  res.json(items);
});

// Route pour obtenir la liste des catégories
app.get("/api/categories", (req, res) => {
  const categories = [
    {
      id: 1,
      title: "Breakfast",
    },
    {
      id: 2,
      title: "Lunch",
    },
    {
      id: 3,
      title: "Shakes",
    },
    {
      id: 4,
      title: "Dinner",
    },
  ];

  res.json(categories);
});

// Route pour obtenir la liste des articles
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Autres routes et configurations...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const app = require("./app");
// const { promisePool } = require("./config/db"); // Importation du pool de connexions MySQL

// const port = 5000;

// // Middleware qui permet de traiter les données de la requête
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Middleware pour gérer les en-têtes CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, x-auth-token"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

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
// app.use("/api/items", require("./routes/itemRoutes")); // Protéger les routes des articles avec le middleware d'authentification
// app.use("/api/auth", require("./routes/user")); // Routes pour gérer les utilisateurs (auth)

// ****************************************************************
// // Routes pour gérer les commandes
// app.use("/api/orders", authenticateUser, require("./routes/orderRoutes"));

// // Routes pour gérer les images
// app.use("/api/images", authenticateUser, require("./routes/imageRoutes"));

// // Routes pour gérer les utilisateurs
// app.use("/api/users", authenticateUser, require("./routes/userRoutes"));

// // Routes pour gérer les catégories
// app.use("/api/categories", authenticateUser, require("./routes/categoryRoutes"));

// // Routes pour gérer les plats
// app.use("/api/dishes", authenticateUser, require("./routes/dishRoutes"));
