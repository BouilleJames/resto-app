const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");

const Category = sequelize.define("categories", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Ajout du contenu initial aux catégories
Category.sync().then(() => {
  Category.bulkCreate([
    { name: "tout" },
    { name: "entrees" },
    { name: "plats" },
    { name: "desserts" },
    { name: "boissons" },
  ])
    .then(() => {
      console.log("Contenu ajouté aux catégories");
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'ajout du contenu aux catégories :",
        error
      );
    });
});

// Définition de la relation entre Item et Category
Category.hasMany(Item, {
  foreignKey: "category_id",
});

module.exports = Category;
