const sequelize = require("../config/db");
const { orders } = require("../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const [orders] = await sequelize.query(
      "SELECT * FROM orders inner join `tables` on orders.table_id = tables.id"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tables" });
  }
};

const getOrderByTableNumber = async (req, res) => {
  try {
    const [orders] = await sequelize.query(
      "SELECT * FROM orders inner join `tables` on orders.table_id = tables.id Where tableNumber = ?"
    );
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tables" });
  }
};

const createOrder = async (req, res) => {
  try {
    const numberOfPeople = req.body;
    const tableNumber = req.params.number;

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

const createKitchenOrder = async (req, res) => {
  try {
    const tableNumber = req.params.number;
    const items = req.body.items; // Assuming you're sending items in the request body

    // Your logic to create a kitchen order here

    res.status(201).json({ message: "Kitchen order created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating a kitchen order" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    const updatedOrderData = req.body; // Données mises à jour de la commande

    // Effectuez les mises à jour nécessaires dans la base de données
    // Utilisez tableNumber pour identifier la commande à mettre à jour
    // Utilisez updatedOrderData pour mettre à jour les détails de la commande

    // Exemple de mise à jour dans la base de données (à adapter à ma modèle de données)
    const result = await sequelize.query(
      "UPDATE order_items SET quantity = ?, status = ? WHERE table_id = ?",
      [updatedOrderData.quantity, updatedOrderData.status, tableNumber]
    );

    // Vérifiez si la mise à jour a réussi
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "Order updated successfully" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { tableNumber } = req.params;

    // Effectuez les mises à jour nécessaires dans la base de données
    // Utilisez tableNumber pour identifier la commande à supprimer

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the order" });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  createKitchenOrder,
  getOrderByTableNumber,
  updateOrder,
  deleteOrder,
};
