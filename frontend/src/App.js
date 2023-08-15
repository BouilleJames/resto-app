import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  // Votre code de composant App ici
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
