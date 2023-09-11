import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TableChoice.css";
import { useTableStatus } from "./TableContext"; // Importez le crochet useTableStatus
import StateTable from "./StateTable";

export function isTableOpen(tableNumber, tableOrders) {
  // const openOrder = tableOrders.find(
  //   (order) => order.table_id === tableNumber && order.status === "en_cours"
  // );
  const openOrder = "en_cours";
  return openOrder;
}

function TableChoice({ currentTable, onChangeTable }) {
  const totalTables = 36; // Nombre total de tables
  const [tableOrders, setTableOrders] = useState([]);
  const [localTableStatus, setLocalTableStatus] = useState({}); // Renommez la variable locale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState();
  const {
    tableStatus: contextTableStatus,
    updateTableStatus,
  } = useTableStatus(); // Utilisez le contexte pour obtenir le statut des tables

  // useEffect(() => {
  //   // Récupérer les commandes de la table actuelle depuis l'API
  //   fetchTableOrders(currentTable);

  //   // Récupérer le statut de toutes les tables
  //   fetchTableStatus();
  // }, [currentTable]);

  const fetchTableOrders = async (tableNumber) => {
    try {
      const response = await axios.get(
        `https://localhost:5000/api/tables/${tableNumber}/orders`
      );
      setTableOrders(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commandes de la table:",
        error
      );
    }
  };

  const fetchTableStatus = async () => {
    try {
      const response = await axios.get(
        "https://localhost:5000/api/tables/status"
      );
      setLocalTableStatus(response.data); // Utilisez la variable locale renommée
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du statut des tables:",
        error
      );
    }
  };

  const isTableEnCours = (tableNumber) => {
    return localTableStatus[tableNumber] === "en_cours"; // Utilisez la variable locale renommée
  };

  const handleTableClick = (tableNumber) => {
    setTableNumber(tableNumber);
    // Ouvrir la modal au clic sur une table
    setIsModalOpen(true);
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
            } ${isTableOpen(index + 1) ? "open" : ""} ${
              tableOrders.find((order) => order.table_id === index + 1)
                ? "occupied"
                : ""
            } ${isTableEnCours(index + 1) ? "en-cours" : ""}`}
            onClick={() => handleTableClick(index + 1)}
            // onClick={() => onChangeTable(index + 1)}
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
                    <p>Prix: {item.price}</p>
                    {/* Ajoutez d'autres informations si nécessaire */}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {/* Afficher la modal StateTable si isModalOpen est true */}
      {isModalOpen && (
        <StateTable
          tableNumber={tableNumber}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default TableChoice;
