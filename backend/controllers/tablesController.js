const sequelize = require("../config/db"); // Importez la connexion à la base de données

const { Table } = require("../models/Table");

const getTables = async (req, res) => {
  try {
    const [tables] = await sequelize.query("SELECT * FROM tables");
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tables" });
  }
};

const getTableStatus = async (req, res) => {
  try {
    const [tableStatus] = await sequelize.query(
      "SELECT tableNumber, status FROM tables"
    );
    const statusMap = {};
    tableStatus.forEach((table) => {
      statusMap[table.tableNumber] = table.status;
    });
    res.status(200).json(statusMap);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching table status" });
  }
};

const getOrdersByTable = async (req, res) => {
  try {
    const tableId = req.params.tableId;

    // Récupérez les commandes pour la table avec l'ID tableId depuis la base de données
    const [orders] = await sequelize.query(
      "SELECT * FROM orders WHERE table_id = ?",
      [tableId]
    );

    // Ensuite, renvoyez les données des commandes au format JSON
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching orders by table" });
  }
};

const createTable = async (req, res) => {
  try {
    const { tableNumber, totalCovers } = req.body;
    await sequelize.query(
      "INSERT INTO tables (tableNumber, totalCovers) VALUES (?, ?)",
      [tableNumber, totalCovers]
    );
    res.status(201).json({ message: "Table created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a table" });
  }
};

const updateTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const { tableNumber, totalCovers } = req.body;
    await sequelize.query(
      "UPDATE tables SET tableNumber = ?, totalCovers = ? WHERE id = ?",
      [tableNumber, totalCovers, tableId]
    );
    res.status(200).json({ message: "Table updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating a table" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    await sequelize.query("DELETE FROM tables WHERE id = ?", [tableId]);
    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting a table" });
  }
};

module.exports = {
  getTables,
  getOrdersByTable,
  createTable,
  updateTable,
  deleteTable,
  getTableStatus,
};
