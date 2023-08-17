import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [login, setLogin] = useState(""); // Utiliser "login" au lieu de "email"
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          login: login, // Utiliser "login" au lieu de "email"
          password: password,
          role: "user",
        }
      );

      console.log("Réponse du serveur:", response.data);

      setLogin(""); // Remettre à zéro le champ login après l'inscription
      setPassword("");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.response.data);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)} // Utiliser setLogin
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterForm;
