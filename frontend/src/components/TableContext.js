import { createContext, useContext, useState } from "react";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [selectedTable, setSelectedTable] = useState({
    tableNumber: "",
    numberOfPeople: "",
  });

  return (
    <TableContext.Provider value={{ selectedTable, setSelectedTable }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTableContext() {
  return useContext(TableContext);
}
