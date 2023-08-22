import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUtensils, FaCocktail } from "react-icons/fa";
import "./OrderManagement.css";

function OrderManagement() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [kitchenItems, setKitchenItems] = useState([]);
  const [barItems, setBarItems] = useState([]);

  useEffect(() => {
    fetchKitchenItems();
    fetchBarItems();
  }, []);

  const fetchKitchenItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/kitchen_items"
      );
      setKitchenItems(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des articles de cuisine:",
        error
      );
    }
  };

  const fetchBarItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bar_items");
      setBarItems(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des articles de bar:",
        error
      );
    }
  };

  const handleKitchenItemPrepared = async (item) => {
    try {
      // Marquer l'article comme préparé dans la base de données
      await axios.put(`http://localhost:5000/api/kitchen_items/${item.id}`, {
        status: "prete",
      });

      // Mettre à jour la liste des articles de cuisine
      const updatedKitchenItems = kitchenItems.map((kitchenItem) =>
        kitchenItem.id === item.id
          ? { ...kitchenItem, status: "prete" }
          : kitchenItem
      );
      setKitchenItems(updatedKitchenItems);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'article de cuisine:",
        error
      );
    }
  };

  const handleBarItemPrepared = async (item) => {
    try {
      // Marquer l'article comme préparé dans la base de données
      await axios.put(`http://localhost:5000/api/bar_items/${item.id}`, {
        status: "prete",
      });

      // Mettre à jour la liste des articles de bar
      const updatedBarItems = barItems.map((barItem) =>
        barItem.id === item.id ? { ...barItem, status: "prete" } : barItem
      );
      setBarItems(updatedBarItems);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'article de bar:",
        error
      );
    }
  };

  return (
    <div className="order-management-container">
      <h2>Gestion des Commandes</h2>
      <div className="table-selection">
        <p>Choisissez une table :</p>
        <div className="table-icons">{/* Icônes de table */}</div>
      </div>
      <div className="order-items">
        <div className="kitchen-items">
          <h3>Articles en Cuisine :</h3>
          <ul>
            {kitchenItems.map((item) => (
              <li
                key={item.id}
                className={item.status === "en_cours" ? "pending" : "ready"}
              >
                {item.title}{" "}
                {item.status === "en_cours" ? (
                  <button onClick={() => handleKitchenItemPrepared(item)}>
                    Prêt
                  </button>
                ) : (
                  <span>Prêt à servir</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bar-items">
          <h3>Articles au Bar :</h3>
          <ul>
            {barItems.map((item) => (
              <li
                key={item.id}
                className={item.status === "en_cours" ? "pending" : "ready"}
              >
                {item.title}{" "}
                {item.status === "en_cours" ? (
                  <button onClick={() => handleBarItemPrepared(item)}>
                    Prêt
                  </button>
                ) : (
                  <span>Prêt à servir</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
