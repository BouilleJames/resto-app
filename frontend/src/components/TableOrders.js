import React, { useState, useEffect } from "react";
import "./TableOrders.css";

function TableOrders({ tableNumber }) {
  const [tableOrders, setTableOrders] = useState([]); // État pour les commandes de la table
  const [items, setItems] = useState([]);
  const [tableOrder, setTableOrder] = useState([]); // État pour la commande en cours

  useEffect(() => {
    // Fetch items and table orders based on tableNumber
    fetch(`http://localhost:5000/api/table/${tableNumber}/orders`)
      .then((response) => response.json())
      .then((data) => setTableOrders(data))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des commandes de la table",
          error
        )
      );

    fetch("http://localhost:5000/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des articles", error)
      );
  }, [tableNumber]);

  const addToTableOrder = (item) => {
    setTableOrder((prevOrder) => [...prevOrder, item]);
  };

  const removeFromTableOrder = (itemId) => {
    setTableOrder((prevOrder) =>
      prevOrder.filter((item) => item.id !== itemId)
    );
  };

  const generateTableOrder = () => {
    // Logic to generate and send table order to kitchen and bar
    console.log("Commande générée :", tableOrder);

    // Consolidate orders for the same table
    const existingTableOrder = tableOrders.find(
      (order) => order.tableNumber === tableNumber
    );
    const consolidatedOrder = existingTableOrder
      ? [...existingTableOrder.items, ...tableOrder]
      : tableOrder;

    // Update table orders
    if (existingTableOrder) {
      const updatedOrders = tableOrders.map((order) =>
        order.tableNumber === tableNumber
          ? { ...order, items: consolidatedOrder }
          : order
      );
      setTableOrders(updatedOrders);
    } else {
      setTableOrders([
        ...tableOrders,
        { tableNumber, items: consolidatedOrder },
      ]);
    }

    // Clear the table order after generating
    setTableOrder([]);
  };

  // Calculate total price of the current table order
  const tableOrderTotal = tableOrder.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="table-orders-container">
      <h2>Commandes de la table {tableNumber}</h2>
      <div className="order-list">
        {/* Display the table orders */}
        <h3>Commande en cours :</h3>
        <ul>
          {tableOrder.map((item) => (
            <li key={item.id}>
              {item.title} - {item.price} €{" "}
              <button onClick={() => removeFromTableOrder(item.id)}>
                Retirer
              </button>
            </li>
          ))}
        </ul>
        <div>Total de la commande : {tableOrderTotal} €</div>
        <button onClick={generateTableOrder}>Générer la commande</button>
      </div>
      <div className="items-list">
        {/* Display the items */}
        <h3>Articles disponibles :</h3>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.title} - {item.price} €{" "}
              <button onClick={() => addToTableOrder(item)}>Ajouter</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TableOrders;
