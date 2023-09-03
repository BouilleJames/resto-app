import React, { createContext, useContext, useState } from "react";

// Créez un contexte
const TableContext = createContext();

// Créez un composant fournisseur pour le contexte
export const TableProvider = ({ children }) => {
  const [tableStatus, setTableStatus] = useState({});

  // Fonction pour mettre à jour le statut d'une table
  const updateTableStatus = (tableNumber, status) => {
    setTableStatus((prevStatus) => ({
      ...prevStatus,
      [tableNumber]: status,
    }));
  };

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
