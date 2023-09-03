import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import ForgotPassword from "./components/ForgotPassword";
import TableSelection from "./components/TableSelection";
import TableOrders from "./components/TableOrders";
import ItemForm from "./components/ItemForm";
import TableChoice from "./components/TableChoice";
import OrderManagement from "./components/OrderManagement";
import { TableProvider } from "./components/TableContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <TableProvider>
        <Navigation user={user} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
            }
          />
          <Route
            path="/adminPanel"
            element={isAdmin ? <AdminPanel /> : <Navigate to="/tableChoice" />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/adminPanel" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/registerForm" element={<RegisterForm />} />
          <Route path="/tableSelection" element={<TableSelection />} />
          <Route path="/tableChoice" element={<TableChoice />} />
          <Route path="/dashboard/:tableNumber" element={<Dashboard />} />
          <Route
            path="/dashboard"
            element={<Navigate to="/tableSelection" />}
          />
          <Route path="/tableOrders" element={<TableOrders />} />
          <Route path="/itemForm" element={<ItemForm />} />
          <Route path="/orderManagement" element={<OrderManagement />} />
        </Routes>
      </TableProvider>
    </div>
  );
}

export default App;
