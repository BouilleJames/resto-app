import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetRequested, setResetRequested] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Envoyer la demande de réinitialisation du mot de passe au serveur
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      console.log("Réponse du serveur:", response.data);

      setResetRequested(true);
      setResetSuccess(true);
      setResetError("");
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe:",
        error.response.data
      );
      setResetRequested(true);
      setResetSuccess(false);
      setResetError(
        "Une erreur est survenue lors de la réinitialisation du mot de passe."
      );
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Réinitialisation du mot de passe</h2>
      {resetRequested ? (
        resetSuccess ? (
          <p className="success-message">
            Un lien de réinitialisation a été envoyé à votre adresse e-mail.
          </p>
        ) : (
          <p className="error-message">{resetError}</p>
        )
      ) : (
        <form onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="email">Adresse e-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Réinitialiser le mot de passe</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
