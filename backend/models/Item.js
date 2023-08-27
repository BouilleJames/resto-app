const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Item = sequelize.define("items", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

Item.sync({ force: false }) // Utilisez force: false pour éviter la recréation de la table à chaque synchronisation
  .then(async () => {
    const itemCount = await Item.count();
    if (itemCount === 0) {
      Item.bulkCreate([
        {
          category_id: 4,
          title: "Buttermilk Pancakes",
          description: "Je suis un pancake au caramel.",
          price: 15.99,
        },
        {
          category_id: 2,
          title: "Diner Double",
          description: "Burger,frites champignons et bacon.",
          price: 13.99,
        },
        {
          category_id: 3,
          title: "Godzilla Milkshake",
          description: "A la banane et à la fraise.",
          price: 6.99,
        },
        {
          category_id: 2,
          title: "Country delight",
          description: "Un excellent Croc quand on a les crocs.",
          price: 20.99,
        },
        {
          category_id: 1,
          title: "Egg attack",
          description: "Hamburger à l'oeuf pour les boxeurs.",
          price: 22.99,
        },
        {
          category_id: 3,
          title: "Oreo dream",
          description: "Douceur au chocolat et à l'Oreo.",
          price: 8.99,
        },
        {
          category_id: 2,
          title: "Bacon overflow",
          description: "Hamburger au bacon pour les gourmands.",
          price: 10.99,
        },
        {
          category_id: 2,
          title: "American classic",
          description: "Hamburger clssic, le meilleur de la maison.",
          price: 13.99,
        },
        {
          category_id: 3,
          title: "Quarantine buddy",
          description: "Encas de confinement pour les boxeurs.",
          price: 8.99,
        },
        {
          category_id: 4,
          title: "SodaCoke",
          description: "Sucré et Gazeux à souhait.",
          price: 3.99,
        },
        {
          category_id: 4,
          title: "SodaOrange",
          description: "Sucré et Gazeux à souhait.",
          price: 3.99,
        },
        {
          category_id: 4,
          title: "SodaFraise",
          description: "Sucré et Gazeux à souhait.",
          price: 3.99,
        },
        {
          category_id: 4,
          title: "KF",
          description: "Italien et délicieux.",
          price: 1.49,
        },
        {
          category_id: 4,
          title: "Eau Minérale plate 1L",
          description: "Italien et délicieux.",
          price: 4.49,
        },
        {
          category_id: 4,
          title: "Eau Minérale gazeuse 1L",
          description: "Italien et délicieux.",
          price: 4.49,
        },
        // ... Ajoutez les autres éléments de la liste ici
      ])
        .then(() => {
          console.log("Contenu ajouté aux items");
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout du contenu aux items :", error);
        });
    }
  })
  .catch((error) => {
    console.error("Erreur lors de la synchronisation de la table :", error);
  });

module.exports = Item;

// const Sequelize = require("sequelize");
// const sequelize = require("../config/db");

// const Item = sequelize.define("items", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   category_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: true,
//   },
//   price: {
//     type: Sequelize.DECIMAL(10, 2),
//     allowNull: false,
//   },
//   availability: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//     defaultValue: true,
//   },
// });

// // Ajout du contenu initial aux items
// Item.sync().then(() => {
//   Item.bulkCreate([
//     {
//       category_id: 4,
//       title: "Buttermilk Pancakes",
//       description: "Je suis un pancake au caramel.",
//       price: 15.99,
//     },
//     {
//       category_id: 2,
//       title: "Diner Double",
//       description: "Burger,frites champignons et bacon.",
//       price: 13.99,
//     },
//     {
//       category_id: 3,
//       title: "Godzilla Milkshake",
//       description: "A la banane et à la fraise.",
//       price: 6.99,
//     },
//     {
//       category_id: 2,
//       title: "Country delight",
//       description: "Un excellent Croc quand on a les crocs.",
//       price: 20.99,
//     },
//     {
//       category_id: 1,
//       title: "Egg attack",
//       description: "Hamburger à l'oeuf pour les boxeurs.",
//       price: 22.99,
//     },
//     {
//       category_id: 3,
//       title: "Oreo dream",
//       description: "Douceur au chocolat et à l'Oreo.",
//       price: 8.99,
//     },
//     {
//       category_id: 2,
//       title: "Bacon overflow",
//       description: "Hamburger au bacon pour les gourmands.",
//       price: 10.99,
//     },
//     {
//       category_id: 2,
//       title: "American classic",
//       description: "Hamburger clssic, le meilleur de la maison.",
//       price: 13.99,
//     },
//     {
//       category_id: 3,
//       title: "Quarantine buddy",
//       description: "Encas de confinement pour les boxeurs.",
//       price: 8.99,
//     },
//     {
//       category_id: 4,
//       title: "SodaCoke",
//       description: "Sucré et Gazeux à souhait.",
//       price: 3.99,
//     },
//     {
//       category_id: 4,
//       title: "SodaOrange",
//       description: "Sucré et Gazeux à souhait.",
//       price: 3.99,
//     },
//     {
//       category_id: 4,
//       title: "SodaFraise",
//       description: "Sucré et Gazeux à souhait.",
//       price: 3.99,
//     },
//     {
//       category_id: 4,
//       title: "KF",
//       description: "Italien et délicieux.",
//       price: 1.49,
//     },
//     {
//       category_id: 4,
//       title: "Eau Minérale plate 1L",
//       description: "Italien et délicieux.",
//       price: 4.49,
//     },
//     {
//       category_id: 4,
//       title: "Eau Minérale gazeuse 1L",
//       description: "Italien et délicieux.",
//       price: 4.49,
//     },
//     // ... Ajoutez les autres éléments de la liste ici
//   ])
//     .then(() => {
//       console.log("Contenu ajouté aux items");
//     })
//     .catch((error) => {
//       console.error("Erreur lors de l'ajout du contenu aux items :", error);
//     });
// });

// module.exports = Item;
