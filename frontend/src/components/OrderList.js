import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderList({ tableNumber }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Chargez les commandes pour la table sélectionnée depuis l'API
    fetchOrders(tableNumber);
  }, [tableNumber]);

  const fetchOrders = async (tableNumber) => {
    try {
      const response = await axios.get(
        `https://localhost:5000/api/tables/${tableNumber}/orders`
      );
      setOrders(response.data);
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des commandes pour la table ${tableNumber}:`,
        error
      );
    }
  };

  return (
    <div>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <h4>Commande {index + 1}</h4>
            <ul>
              {order.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <p>Article: {item.itemTitle}</p>
                  <p>Quantité: {item.quantity}</p>
                  {/* Ajoutez d'autres informations si nécessaire */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
