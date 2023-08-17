import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import "./App.css";
import TableSelection from "./components/TableSelection";
import TableOrders from "./components/TableOrders";

function App() {
  // Votre code de composant App ici
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TableSelection />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tableOrder" element={<TableOrders />} />
      </Routes>
    </div>
  );
}

export default App;
