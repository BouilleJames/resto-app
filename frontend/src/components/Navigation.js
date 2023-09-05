import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/adminPanel">Admin Panel</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/tableChoice">Choix de Table</Link>
        </li>
        <li>
          <Link to="/tableOrders">Articles commandés</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
