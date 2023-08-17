const connection = require("../server").connection;

const getItems = async (req, res) => {
  try {
    const [items] = await connection.query("SELECT * FROM items");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching items" });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    await connection.query("INSERT INTO items (name, price) VALUES (?, ?)", [
      name,
      price,
    ]);
    res.status(201).json({ message: "Item created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating an item" });
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, price } = req.body;
    await connection.query(
      "UPDATE items SET name = ?, price = ? WHERE id = ?",
      [name, price, itemId]
    );
    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating an item" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    await connection.query("DELETE FROM items WHERE id = ?", [itemId]);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting an item" });
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};

// **************************************************************************************************
// const { promisePool } = require("../config/db");
// const fs = require("fs");

// exports.createThing = (req, res, next) => {
//   const thingObject = JSON.parse(req.body.thing);
//   delete thingObject._id;
//   delete thingObject.userId;

//   // Extract categoryId from thingObject
//   const { title, description, price, categoryId } = thingObject;
//   const imageUrl = `${req.protocol}://${req.get("host")}/images/${
//     req.file.filename
//   }`;
//   const userId = req.auth.userId;

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
// };

// exports.getOneThing = (req, res, next) => {
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
// };

// exports.modifyThing = (req, res, next) => {
//   const thingObject = req.file
//     ? {
//         ...JSON.parse(req.body.thing),
//         image_url: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
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
//       return pool.execute(
//         "UPDATE items SET title=?, description=?, price=?, image_url=? WHERE id=?",
//         [title, description, price, image_url, thingId]
//       );
//     })
//     .then(() =>
//       res.status(200).json({ message: "Objet modifié avec succès !" })
//     )
//     .catch((error) =>
//       res
//         .status(400)
//         .json({ error: "Erreur lors de la modification de l'objet" })
//     );
// };

// exports.deleteThing = (req, res, next) => {
//   const thingId = req.params.id;

//   promisePool
//     .execute("SELECT * FROM items WHERE id = ?", [thingId])
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
// };

// exports.getAllThings = (req, res, next) => {
//   promisePool
//     .execute("SELECT * FROM items")
//     .then(([rows]) => {
//       res.status(200).json(rows);
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: "Erreur lors de la récupération des objets",
//       });
//     });
// };

// exports.getAllThingsByCategory = (req, res, next) => {
//   const categoryId = req.params.categoryId;

//   promisePool
//     .execute("SELECT * FROM items WHERE category_id = ?", [categoryId])
//     .then(([rows]) => {
//       res.status(200).json(rows);
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: "Erreur lors de la récupération des objets par catégorie",
//       });
//     });
// };
