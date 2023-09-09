import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Navigation.css";

const handleClick = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("token");
    // make sure the user is logged out with a redirect to the login page
    window.location.href = "/login";
  }
};

function Navigation() {
  const { isLoggedIn, isAdmin } = useAuth();
  console.log("test :", isLoggedIn);
  return (
    <nav>
      <ul>
        {isAdmin && (
          <li>
            <Link to="/adminPanel">Admin Panel</Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/tableChoice">Choix de Table</Link>
            </li>
            <li>
              <Link to="/tableOrders">Articles commandés</Link>
            </li>
          </>
        )}
      </ul>
      {isLoggedIn && <button onClick={handleClick}>Se déconnecter</button>}
    </nav>
  );
}

export default Navigation;
