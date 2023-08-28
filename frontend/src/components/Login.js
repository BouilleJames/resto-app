import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login({ setIsLoggedIn, setIsAdmin }) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          login: login,
          password: password,
        }
      );

      console.log("Réponse du serveur:", response.data);

      setIsLoggedIn(true);
      setIsAdmin(response.data.role === "admin"); // Utilisation du rôle
      navigate("/");
    } catch (error) {
      console.error("Erreur d'authentification", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <input
        type="text"
        id="login" // Ajoutez un attribut id ici
        placeholder="Mail"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        id="password" // Ajoutez un attribut id ici
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
      <Link to="/forgot-password">Mot de passe oublié ?</Link>
    </div>
  );
}

export default Login;
