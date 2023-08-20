import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assurez-vous d'importer axios si ce n'est pas déjà fait
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", // Endpoint de connexion
        {
          username: username, // Envoyer les informations de connexion
          password: password,
        }
      );

      console.log("Réponse du serveur:", response.data);

      // Ici, vous pourriez effectuer des actions après une connexion réussie,
      // telles que stocker le jeton d'authentification, rediriger l'utilisateur, etc.
      // Par exemple, vous pourriez rediriger l'utilisateur vers le dashboard :
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur d'authentification", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Login;
