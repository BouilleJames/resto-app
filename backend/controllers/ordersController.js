const sequelize = require("../config/db");
const { Order } = require("../models/Order");

const getOrder = async (req, res) => {
  try {
    const [order] = await sequelize.query("SELECT * FROM tables");
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tables" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { tableNumber, numberOfPeople } = req.body;

    // Créer une nouvelle commande dans la base de données avec le numéro de table et le nombre de personnes
    const result = await sequelize.query(
      "INSERT INTO tables (tableNumber, numberOfPeople) VALUES (?, ?)",
      [tableNumber, numberOfPeople]
    );

    // Récupérer l'ID de la nouvelle commande créée
    const orderId = result.insertId;

    // Rediriger vers le tableau de bord de cette commande spécifique
    res.status(201).json({ message: "Order created successfully", orderId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating an order" });
  }
};

module.exports = {
  createOrder,
};
