// // const express = require("express");
// // const auth = require("../middleware/auth");
// // const router = express.Router();
// // const axios = require("axios");
// // const multer = require("../middleware/multer-config");

// // const stuffCtrl = require("../controllers/stuff");

// // router.get("/", auth, stuffCtrl.getAllThings);
// // router.post("/", auth, multer, stuffCtrl.createThing);
// // router.get("/:id", auth, stuffCtrl.getOneThing);
// // router.put("/:id", auth, multer, stuffCtrl.modifyThing);
// // router.delete("/:id", auth, stuffCtrl.deleteThing);

// // module.exports = router;

// const express = require("express");
// const auth = require("../middleware/auth");
// const router = express.Router();
// const multer = require("../middleware/multer-config");
// const { promisePool } = require("../config/db"); // Importer le promisePool
// const fs = require("fs"); // Ajout de la dépendance fs pour pouvoir utiliser fs.unlink()

// router.get("/", (req, res, next) => {
//   promisePool
//     .execute("SELECT * FROM items")
//     .then(([rows]) => {
//       const itemsWithFullImageUrls = rows.map((item) => ({
//         ...item,
//         image_url: `${req.protocol}://${req.get("host")}/${item.image_url}`,
//       }));
//       res.status(200).json(itemsWithFullImageUrls);
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error:
//           "Erreur lors de la récupération des données depuis la base de données",
//       });
//     });
// });

// // router.post("/", auth, multer, (req, res, next) => {
// //   const title = req.body.title;
// //   const description = req.body.description;
// //   const price = req.body.price;
// //   const imageUrl = "./images/item-1.jpeg";
// //   const categoryId = 3;

// //   // Validation côté serveur : Vérifier que les champs ne sont pas vides
// //   if (!title || !description || !price) {
// //     return res.status(400).json({ error: "Veuillez remplir tous les champs" });
// //   }

// //   promisePool
// //     .execute(
// //       "INSERT INTO items (title, description, image_url, category_id, price) VALUES (?, ?, ?, ?, ?)",
// //       [title, description, imageUrl, categoryId, price]
// //     )
// //     .then(() => {
// //       res.status(201).json({
// //         message: "Objet enregistré avec succès !",
// //       });
// //     })
// //     .catch((error) => {
// //       res.status(400).json({
// //         error: error.message,
// //       });
// //     });
// // });
// router.post("/", auth, multer, (req, res, next) => {
//   const thingObject = JSON.parse(req.body.thing);
//   delete thingObject._id;
//   delete thingObject.userId;

//   const { title, description, price } = thingObject;
//   const userId = req.auth.userId;
//   const imageUrl = `${req.protocol}://${req.get("host")}/images/${
//     req.file.filename
//   }`;
//   // Validation côté serveur : Vérifier que les champs ne sont pas vides
//   if (!title || !description || !price || !req.file) {
//     return res.status(400).json({ error: "Veuillez remplir tous les champs" });
//   }

//   promisePool
//     .execute(
//       "INSERT INTO items (title, description, image_url, category_id, price) VALUES (?, ?, ?, ?, ?)",
//       [title, description, imageUrl, categoryId, price]
//     )
//     .then(() => {
//       res.status(201).json({
//         message: "Objet enregistré avec succès !",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: "Erreur lors de l'enregistrement de l'objet",
//       });
//     });
// });

// router.get("/:id", auth, (req, res, next) => {
//   const thingId = req.params.id;

//   promisePool
//     .execute("SELECT * FROM items WHERE id = ?", [thingId])
//     .then(([rows]) => {
//       if (rows.length === 0) {
//         return res.status(404).json({ error: "Objet non trouvé" });
//       }
//       const thing = rows[0];
//       res.status(200).json(thing);
//     })
//     .catch((error) => {
//       res
//         .status(400)
//         .json({ error: "Erreur lors de la récupération de l'objet" });
//     });
// });

// router.put("/:id", auth, multer, (req, res, next) => {
//   const thingObject = req.file
//     ? {
//         ...JSON.parse(req.body.thing),
//         image_url: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`, // J'utilise req.file.filename pour obtenir le nom du fichier enregistré
//       }
//     : { ...req.body };

//   delete thingObject._userId;
//   const thingId = req.params.id;

//   promisePool
//     .execute("SELECT user_id, image_url FROM items WHERE id = ?", [thingId])
//     .then(([rows]) => {
//       if (rows.length === 0) {
//         return res.status(404).json({ error: "Objet non trouvé" });
//       }
//       const thing = rows[0];
//       if (thing.user_id !== req.auth.userId) {
//         return res.status(401).json({ message: "Non autorisé" });
//       }

//       const { title, description, price, image_url } = thingObject;
//       const filename = thing.image_url.split("/images/")[1];

//       // Je supprime l'ancienne image du serveur avant de mettre à jour la base de données
//       fs.unlink(`images/${filename}`, (error) => {
//         if (error) {
//           console.error("Erreur lors de la suppression du fichier :", error);
//         }
//         // Je mets à jour l'objet dans la base de données avec la nouvelle image_url
//         promisePool
//           .execute(
//             "UPDATE items SET title=?, description=?, price=?, image_url=? WHERE id=?",
//             [title, description, price, image_url, thingId]
//           )
//           .then(() => {
//             res.status(200).json({ message: "Objet modifié avec succès !" });
//           })
//           .catch((error) =>
//             res
//               .status(400)
//               .json({ error: "Erreur lors de la modification de l'objet" })
//           );
//       });
//     })
//     .catch((error) =>
//       res
//         .status(400)
//         .json({ error: "Erreur lors de la modification de l'objet" })
//     );
// });

// router.delete("/:id", auth, (req, res, next) => {
//   const thingId = req.params.id;

//   promisePool
//     .execute("SELECT * FROM items WHERE id = ?", [thingId]) // Remplacez "articles" par "items"
//     .then(([rows]) => {
//       if (rows.length === 0) {
//         return res.status(404).json({ error: "Objet non trouvé" });
//       }
//       const thing = rows[0];
//       if (thing.user_id !== req.auth.userId) {
//         return res.status(401).json({ message: "Non autorisé" });
//       }

//       const filename = thing.image_url.split("/images/")[1];
//       fs.unlink(`images/${filename}`, () => {
//         return pool.execute("DELETE FROM items WHERE id=?", [thingId]);
//       });
//     })
//     .then(() => {
//       res.status(200).json({ message: "Objet supprimé avec succès !" });
//     })
//     .catch((error) => {
//       res
//         .status(400)
//         .json({ error: "Erreur lors de la suppression de l'objet" });
//     });
// });

// module.exports = router;
