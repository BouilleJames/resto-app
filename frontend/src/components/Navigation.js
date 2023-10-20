// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import jwt from "jsonwebtoken";
// import "./Navigation.css";

// function Navigation() {
//   const { isLoggedIn, isAdmin, logout } = useAuth();
//   const [role, setRole] = useState("");
//   const authToken = localStorage.getItem("token");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu mobile

//   useEffect(() => {
//     if (authToken) {
//       const decodedToken = jwt.decode(authToken);
//       setRole(decodedToken.role);
//     }
//   }, [authToken]);

//   // Fonction pour basculer l'état du menu mobile
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav>
//       <div className="mobile-header">
//         <button
//           className={`burger-button ${isMobileMenuOpen ? "open" : ""}`}
//           onClick={toggleMobileMenu}
//         >
//           <div className="bar"></div>
//           <div className="bar"></div>
//           <div className="bar"></div>
//         </button>
//       </div>
//       <ul className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
//         {(isAdmin || role === "admin") && (
//           <li>
//             <Link to="/adminPanel">Admin Panel</Link>
//           </li>
//         )}
//         <>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//           <li>
//             <Link to="/tableSelection">Créer Table</Link>
//           </li>
//           <li>
//             <Link to="/tableChoice">Choix de Table</Link>
//           </li>
//           <li>
//             <Link to="/tableOrders">Articles commandés</Link>
//           </li>
//         </>
//       </ul>
//       {(isLoggedIn || authToken) && (
//         <button className="logout" onClick={logout}>
//           Se déconnecter
//         </button>
//       )}
//     </nav>
//   );
// }

// export default Navigation;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import jwt from "jsonwebtoken";
import "./Navigation.css";

function Navigation() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [role, setRole] = useState("");
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwt.decode(authToken);
      setRole(decodedToken.role);
    }
  }, [authToken]);

  return (
    <nav>
      <ul className="nav-links">
        {(isAdmin || role === "admin") && (
          <li>
            <Link to="/adminPanel">Admin Panel</Link>
          </li>
        )}
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/tableSelection">Créer Table</Link>
          </li>
          <li>
            <Link to="/tableChoice">Choix de Table</Link>
          </li>
          <li>
            <Link to="/tableOrders">Articles commandés</Link>
          </li>
        </>
      </ul>
      {(isLoggedIn || authToken) && (
        <button className="logout" onClick={logout}>
          <i className="fa fa-sign-out"></i> Se déconnecter
        </button>
      )}
    </nav>
  );
}

export default Navigation;
