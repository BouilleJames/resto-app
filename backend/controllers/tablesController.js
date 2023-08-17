const connection = require("../server").connection;

const getTables = async (req, res) => {
  try {
    const [tables] = await connection.query("SELECT * FROM tables");
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tables" });
  }
};

const getOrdersByTable = async (req, res) => {
  try {
    const tableId = req.params.tableId;

    // Récupérez les commandes pour la table avec l'ID tableId depuis la base de données
    const [orders] = await connection.query(
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
    const { number, capacity } = req.body;
    await connection.query(
      "INSERT INTO tables (number, capacity) VALUES (?, ?)",
      [number, capacity]
    );
    res.status(201).json({ message: "Table created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a table" });
  }
};

const updateTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const { number, capacity, totalCovers } = req.body;
    await connection.query(
      "UPDATE tables SET table_number = ?, capacity = ?, total_covers = ? WHERE id = ?",
      [number, capacity, totalCovers, tableId]
    );
    res.status(200).json({ message: "Table updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating a table" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    await connection.query("DELETE FROM tables WHERE id = ?", [tableId]);
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
};
