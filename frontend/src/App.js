import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import ForgotPassword from "./components/ForgotPassword";
import TableSelection from "./components/TableSelection";
import TableOrders from "./components/TableOrders";
import ItemForm from "./components/ItemForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
      <Navigation />
      {/* <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registerForm">Register</Link>
            </li>
          </ul>
        </nav> */}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              isAdmin ? (
                <AdminPanel />
              ) : (
                <Dashboard isAdmin={isAdmin} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/tableSelection" element={<TableSelection />} />
        <Route path="/dashboard/:tableNumber" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/tableSelection" />} />
        <Route path="/dashboard/tableOrders" element={<TableOrders />} />
        <Route path="/dashboard/itemForm" element={<ItemForm />} />
      </Routes>
    </div>
  );
}

export default App;
