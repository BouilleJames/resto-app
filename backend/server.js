const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const itemsRoutes = require("./routes/items");
const tablesRoutes = require("./routes/tables");
const ordersRoutes = require("./routes/orders");
const sequelize = require("./config/db");

// Importez tous vos modèles ici
const User = require("./models/User");
const Table = require("./models/Table");
const OrderItem = require("./models/OrderItem");
const Order = require("./models/Order");
const Item = require("./models/Item");
const KitchenItem = require("./models/KitchenItem");
const BarItem = require("./models/BarItem");
const Client = require("./models/Client");
const Category = require("./models/Category");

const app = express();

// Middleware pour gérer les requêtes POST avec des données JSON
app.use(bodyParser.json());

// Middleware pour autoriser les requêtes depuis des domaines différents
app.use(cors());

// Utilisation des routes liées aux articles
app.use(authRoutes);
app.use(itemsRoutes);
app.use(tablesRoutes);
app.use(ordersRoutes);

// Port sur lequel le serveur va écouter
const port = process.env.PORT || 5000;

// Synchronisation de la base de données et démarrage du serveur
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database synchronization error:", error);
  });

// *****************************************

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const items = require("./routes/items");
// const sequelize = require("./config/db"); // Importez votre instance Sequelize
// const app = express();
// const PORT = process.env.PORT || 5000;
// // Définissez vos modèles Sequelize ici
// // const User = require("./models/User");
// // const Table = require("./models/Table");
// // const OrderItem = require("./models/OrderItem");
// // const Order = require("./models/Order");
// const item = require("./models/Item");
// // const Client = require("./models/Client");
// // const Category = require("./models/Category");
// // const KitchenItem = require("./models/KitchenItem");
// // const BarItem = require("./models/BarItem");

// app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use(express.json());
// app.use("/api", items);

// // Synchronisez les modèles Sequelize avec la base de données
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Modèles de la base de données synchronisés");

//     // Lancez le serveur une fois que les modèles sont synchronisés
//     app.listen(PORT, () => {
//       console.log(`Le serveur fonctionne sur le port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error(
//       "Erreur lors de la synchronisation des modèles de la base de données :",
//       error
//     );
//   });

// ... Importez d'autres modèles si nécessaire

// Routes
// // Exemple de configuration pour renvoyer des données Sequelize
// app.get("/api/items", async (req, res) => {
//   try {
//     const items = await Item.findAll();
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// app.delete("/api/items/:id", async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     await Item.destroy({ where: { id: itemId } });
//     res.status(200).json({ message: "Item deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while deleting an item" });
//   }
// });

// app.get("/api/orders", async (req, res) => {
//   try {
//     const orders = await Order.findAll();
//     res.json(orders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// app.post("/api/orders", async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ error: "La commande est vide" });
//     }

//     // Créer une nouvelle commande avec les articles
//     const newOrder = await Order.create({
//       items: JSON.stringify(items), // Convertir les articles en JSON
//     });

//     res.status(201).json(newOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// // Route pour obtenir la liste des catégories
// app.get("/api/categories", async (req, res) => {
//   try {
//     const categories = await Category.findAll();
//     res.json(categories);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// app.get("/api/tables", async (req, res) => {
//   try {
//     const tables = await Table.findAll();
//     res.json(tables);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// app.post("/api/tables", async (req, res) => {
//   try {
//     const { tableNumber, totalCovers } = req.body;

//     if (!tableNumber || !totalCovers) {
//       return res
//         .status(400)
//         .json({ error: "Numéro de table et capacité requis" });
//     }

//     const newTable = await Table.create({
//       tableNumber,
//       totalCovers,
//     });

//     res.status(201).json(newTable);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// // Route pour obtenir les articles en cuisine
// app.get("/api/kitchen_items", async (req, res) => {
//   try {
//     const kitchenItems = await KitchenItem.findAll();
//     res.json(kitchenItems);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// // Route pour obtenir les articles au bar
// app.get("/api/bar_items", async (req, res) => {
//   try {
//     const barItems = await BarItem.findAll();
//     res.json(barItems);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// // Route pour mettre à jour le statut d'un article en cuisine
// app.put("/api/kitchen_items/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const kitchenItem = await KitchenItem.findByPk(id);

//     if (!kitchenItem) {
//       return res.status(404).json({ error: "Article introuvable" });
//     }

//     await kitchenItem.update({ status });

//     res
//       .status(200)
//       .json({ message: "Statut de l'article mis à jour avec succès" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// // Route pour mettre à jour le statut d'un article au bar
// app.put("/api/bar_items/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const barItem = await BarItem.findByPk(id);

//     if (!barItem) {
//       return res.status(404).json({ error: "Article introuvable" });
//     }

//     await barItem.update({ status });

//     res
//       .status(200)
//       .json({ message: "Statut de l'article mis à jour avec succès" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// app.post("/api/kitchen-orders/:tableId", async (req, res) => {
//   try {
//     const { items } = req.body;
//     const { tableId } = req.params;

//     // Créer une nouvelle commande en cuisine pour la table donnée
//     const newKitchenOrder = await Order.create({
//       table_id: tableId,
//       status: "en_cours", // Ou utilisez le statut approprié
//     });

//     for (const item of items) {
//       await KitchenItem.create({
//         order_id: newKitchenOrder.id,
//         order_item_id: item.id,
//         quantity: item.quantity,
//       });
//     }

//     res.status(201).json(newKitchenOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// app.post("/api/bar-orders/:tableId", async (req, res) => {
//   try {
//     const { items } = req.body;
//     const { tableId } = req.params;

//     // Créer une nouvelle commande au bar pour la table donnée
//     const newBarOrder = await Order.create({
//       table_id: tableId,
//       status: "en_cours", // Ou utilisez le statut approprié
//     });

//     for (const item of items) {
//       await BarItem.create({
//         order_id: newBarOrder.id,
//         order_item_id: item.id,
//       });
//     }

//     res.status(201).json(newBarOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// app.get("/api/tables/:tableNumber/orders", async (req, res) => {
//   try {
//     const { tableNumber } = req.params;

//     // Requête à la base de données pour récupérer les articles commandés par la table spécifique
//     const tableOrders = await Order.findAll({
//       where: { table_id: tableNumber },
//       include: [
//         {
//           model: OrderItem,
//           include: Item, // Assurez-vous que les associations sont correctement définies
//         },
//       ],
//     });

//     const formattedTableOrders = tableOrders.map((order) => {
//       return {
//         tableNumber: order.table_id,
//         items: order.order_items.map((orderItem) => {
//           return {
//             itemTitle: orderItem.item.title,
//             quantity: orderItem.quantity,
//             // Ajoutez d'autres informations si nécessaire
//           };
//         }),
//       };
//     });

//     res.json(formattedTableOrders);
//   } catch (error) {
//     console.error(
//       "Erreur lors de la récupération des commandes de la table:",
//       error
//     );
//     res.status(500).json({ error: "Erreur interne du serveur" });
//   }
// });

// Autres routes et configurations...

// Synchronisez les modèles Sequelize avec la base de données
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Modèles de la base de données synchronisés");

//     // Lancez le serveur une fois que les modèles sont synchronisés
//     app.listen(PORT, () => {
//       console.log(`Le serveur fonctionne sur le port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error(
//       "Erreur lors de la synchronisation des modèles de la base de données :",
//       error
//     );
//   });

// // derniere modif: 16/08/2021 par James
// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2/promise");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Configure your MySQL connection
// const connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "app_resto",
// });

// // Routes
// // TODO: Define your API routes here
// // Exemple de configuration pour renvoyer des données JSON
// app.get("/api/orders", (req, res) => {
//   const orders = [
//     // ... vos données de commandes au format JSON
//   ];
//   res.json(orders);
// });

// app.get("/api/items", (req, res) => {
//   const items = [
//     {
//       id: 1,
//       category_id: 1,
//       title: "Buttermilk Pancakes",
//       description: "Je suis un pancake au caramel.",
//       price: 15.99,
//       image_url: "./images/item-1.jpeg",
//     },
//     {
//       id: 2,
//       category_id: 2,
//       title: "Diner Double",
//       description: "Burger,frites champignons et bacon.",
//       price: 13.99,
//       image_url: "./images/item-2.jpeg",
//     },
//     {
//       id: 3,
//       category_id: 4,
//       title: "Godzilla Milkshake",
//       description: "A la banane et à la fraise.",
//       price: 6.99,
//       image_url: "./images/item-5.jpeg",
//     },
//     {
//       id: 4,
//       category_id: 1,
//       title: "country delight",
//       description: "Un excellent Croc quand on a les crocs.",
//       price: 20.99,
//       image_url: "./images/item-4.jpeg",
//     },
//     {
//       id: 5,
//       category_id: 2,
//       title: "egg attack",
//       description: "Hamburger à l'oeuf pour les boxeurs.",
//       price: 22.99,
//       image_url: "./images/item-5.jpeg",
//     },
//     {
//       id: 6,
//       category_id: 4,
//       title: "oreo dream",
//       description: "Douceur au chocolat et à l'Oreo.",
//       price: 18.99,
//       image_url: "./images/item-6.jpeg",
//     },
//     {
//       id: 7,
//       category_id: 3,
//       title: "bacon overflow",
//       description: "Hamburger au bacon.",
//       price: 8.99,
//       image_url: "./images/item-7.jpeg",
//     },
//     {
//       id: 8,
//       category_id: 3,
//       title: "american classic",
//       description: "Hamburger classic, le goût des States.",
//       price: 18.99,
//       image_url: "./images/item-8.jpeg",
//     },
//     {
//       id: 9,
//       category_id: 4,
//       title: "quarantine buddy",
//       description: "Encas de Quarantaine, on est près.",
//       price: 16.99,
//       image_url: "./images/item-9.jpeg",
//     },
//   ];

//   res.json(items);
// });

// // Route pour obtenir la liste des catégories
// app.get("/api/categories", (req, res) => {
//   const categories = [
//     {
//       id: 1,
//       title: "Breakfast",
//     },
//     {
//       id: 2,
//       title: "Lunch",
//     },
//     {
//       id: 3,
//       title: "Shakes",
//     },
//     {
//       id: 4,
//       title: "Dinner",
//     },
//   ];

//   res.json(categories);
// });

// // Route pour obtenir la liste des articles
// app.get("/api/items", (req, res) => {
//   res.json(items);
// });

// // Autres routes et configurations...

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

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
// app.use("/api/items", require("./routes/items")); // Protéger les routes des articles avec le middleware d'authentification
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
