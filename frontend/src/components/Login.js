import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import "./Login.css";
import { useAuth } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5000/api/auth/login",
        {
          login: login,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);

      const decodedToken = jwt.decode(response.data.token);
      const role = decodedToken.role;
      const token = response.data.token;

      authLogin(token, role);

      if (role === "admin") {
        navigate("/adminPanel");
      } else {
        navigate("/tableSelection");
      }
    } catch (error) {
      console.error("Erreur d'authentification", error);

      if (error.response === undefined) {
        console.log(error);
      } else if (error.response.status === 401) {
        setMsg("Identifiants ou mot de passe incorrects");
      } else {
        setMsg("Erreur d'authentification");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <input
        type="text"
        id="login"
        placeholder="Mail"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="error-msg">{msg}</p>
      <button onClick={handleLogin}>Se connecter</button>
      <Link to="/forgot-password">Mot de passe oublié ?</Link>
    </div>
  );
}

export default Login;
