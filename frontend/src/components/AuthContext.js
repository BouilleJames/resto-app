import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Stocker le rôle de l'utilisateur

  function login(token, role) {
    setIsLoggedIn(true);
    setUserRole(role); // Définir le rôle de l'utilisateur lors de la connexion
    localStorage.setItem("token", token);
    localStorage.setItem("role", role); // Stocker le rôle dans localStorage
  }

  function logout() {
    setIsLoggedIn(false);
    setUserRole(null); // Réinitialiser le rôle de l'utilisateur lors de la déconnexion
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  const value = {
    isLoggedIn,
    userRole, // Utiliser userRole au lieu de isAdmin
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
