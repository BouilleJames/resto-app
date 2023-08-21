import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import "./App.css";
import TableSelection from "./components/TableSelection";
import TableOrders from "./components/TableOrders";
import Navigation from "./components/Navigation";
import OrderManagement from "./components/OrderManagement";

function App() {
  // Votre code de composant App ici
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<TableSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderManagement" element={<OrderManagement />} />
        <Route path="/api/auth/signup" element={<RegisterForm />} />
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/tableOrders" element={<TableOrders />} />
      </Routes>
    </div>
  );
}

export default App;
