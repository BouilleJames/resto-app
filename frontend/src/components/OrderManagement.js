import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUtensils, FaCocktail } from "react-icons/fa";
import "./OrderManagement.css";

function OrderManagement() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [kitchenOrders, setKitchenOrders] = useState([]);
  const [barOrders, setBarOrders] = useState([]);

  useEffect(() => {
    fetchTables();
    fetchOrders();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tables");
      setTables(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tables:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      const kitchenOrders = response.data.filter(
        (order) =>
          order.status === "en_cours" &&
          order.category_id >= 1 &&
          order.category_id <= 3
      );
      const barOrders = response.data.filter(
        (order) => order.status === "en_cours" && order.category_id === 4
      );
      setKitchenOrders(kitchenOrders);
      setBarOrders(barOrders);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
    }
  };

  const handleTableClick = (tableId) => {
    setSelectedTable(tableId);
  };

  return (
    <div className="order-management-container">
      <h2>Gestion des Commandes</h2>
      <div className="table-list">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table-icon ${
              selectedTable === table.id ? "selected" : ""
            }`}
            onClick={() => handleTableClick(table.id)}
          >
            {table.tableNumber}
          </div>
        ))}
      </div>
      <div className="orders-section">
        <div className="kitchen-orders">
          <h3>Commandes en préparation (Cuisine) :</h3>
          <ul>
            {kitchenOrders.map((order) => (
              <li key={order.id}>
                {/* Afficher les détails de la commande en cuisine */}
              </li>
            ))}
          </ul>
        </div>
        <div className="bar-orders">
          <h3>Commandes en préparation (Bar) :</h3>
          <ul>
            {barOrders.map((order) => (
              <li key={order.id}>
                {/* Afficher les détails de la commande au bar */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
