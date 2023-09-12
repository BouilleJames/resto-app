import React, { createContext, useContext, useState } from "react";

// Créez un contexte
const TableContext = createContext();

// Créez un composant fournisseur pour le contexte
export const TableProvider = ({ children }) => {
  const [tableStatus, setTableStatus] = useState([]);

  const updateTableStatus = (statusArray) => {
    setTableStatus(statusArray);
  };

  // Fonction pour mettre à jour le statut de toutes les tables dans le contexte
  // const updateTableStatus = (tableNumber, status) => {
  //   const updatedTableStatus = tableStatus.map((table) => {
  //     if (table.tableNumber === tableNumber) {
  //       return { ...table, status };
  //     }
  //     return table;
  //   });
  //   setTableStatus(updatedTableStatus);
  // };
  // const updateTableStatus = (status) => {
  //   setTableStatus([status]);
  // };

  // Fonction pour mettre à jour le statut d'une table spécifique dans le contexte
  // const updateTableStatus = (tableNumber, status) => {
  //   const updatedTableStatus = [...tableStatus]; // Créez une copie du tableau existant
  //   updatedTableStatus[tableNumber - 1] = status; // Mettez à jour le statut de la table spécifiée
  //   setTableStatus(updatedTableStatus); // Mettez à jour le contexte avec le nouveau tableau
  // };

  return (
    <TableContext.Provider value={{ tableStatus, updateTableStatus }}>
      {children}
    </TableContext.Provider>
  );
};

// Utilisez un crochet personnalisé pour accéder au contexte
export const useTableStatus = () => {
  return useContext(TableContext);
};

// import { createContext, useContext, useState } from "react";

// const TableContext = createContext();

// export function TableProvider({ children }) {
//   const [selectedTable, setSelectedTable] = useState({
//     tableNumber: "",
//     numberOfPeople: "",
//   });

//   return (
//     <TableContext.Provider value={{ selectedTable, setSelectedTable }}>
//       {children}
//     </TableContext.Provider>
//   );
// }

// export function useTableContext() {
//   return useContext(TableContext);
// }
