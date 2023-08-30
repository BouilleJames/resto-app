import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TableChoice.css";

function TableChoice({ currentTable, onChangeTable }) {
  const totalTables = 100; // Nombre total de tables
  const [tableOrders, setTableOrders] = useState([]);

  useEffect(() => {
    // Récupérer les commandes de la table actuelle depuis l'API
    fetchTableOrders(currentTable);
  }, [currentTable]);

  const fetchTableOrders = async (tableNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tables/${tableNumber}/orders`
      );
      setTableOrders(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commandes de la table:",
        error
      );
    }
  };

  const isTableOpen = (tableNumber) => {
    const openOrder = tableOrders.find(
      (order) => order.table_id === tableNumber && order.status === "en_cours"
    );
    return openOrder;
  };

  return (
    <div className="table-choice-container">
      <h3>Choisissez une table :</h3>
      <div className="table-list">
        {Array.from({ length: totalTables }, (_, index) => (
          <div
            key={index}
            className={`table-circle ${
              currentTable === index + 1 ? "active" : ""
            } ${isTableOpen(index + 1) ? "open" : ""}`}
            onClick={() => onChangeTable(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="table-orders">
        <h3>Commandes pour la table {currentTable} :</h3>
        <ul>
          {tableOrders.map((order, index) => (
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
    </div>
  );
}

export default TableChoice;
