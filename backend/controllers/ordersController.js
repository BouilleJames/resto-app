// Dans votre serveur (backend/controllers/ordersController.js)

const createOrder = async (req, res) => {
  try {
    const { tableNumber, covers } = req.body;

    // Créer une nouvelle commande dans la base de données avec le numéro de table et le nombre de personnes
    const result = await connection.query(
      "INSERT INTO orders (table_number, covers) VALUES (?, ?)",
      [tableNumber, covers]
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
