// components/ItemForm.js
import React from "react";
import "./ItemForm.css";

const ItemForm = ({
  handleCreateOrUpdateItem,
  title,
  setTitle,
  price,
  setPrice,
  category,
  setCategory,
  message,
  error,
  selectedItemId,
}) => {
  const isEditing = selectedItemId !== null; // Vérifie si vous êtes en train de modifier
  const buttonText = isEditing ? "Modifier" : "Créer"; // Texte du bouton
  return (
    <div className="admin-form-container">
      <h3>Formulaire de création d'article</h3>
      {message && <p className="admin-message success-message">{message}</p>}
      {error && <p className="admin-message error-message">{error}</p>}
      <form className="admin-form" onSubmit={handleCreateOrUpdateItem}>
        <label className="admin-form-label">Titre:</label>
        <input
          type="text"
          className="admin-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="admin-form-label">Prix:</label>
        <input
          type="number"
          className="admin-form-input"
          value={price}
          onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value)))}
          min="0" // Empêche les valeurs négatives
          step="0.01" // Permet de régler le prix de centime en centime
          required
        />
        <label className="admin-form-label">Catégorie:</label>
        <select
          className="admin-form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Sélectionnez une catégorie
          </option>
          <option value="1">Entrées</option>
          <option value="2">Plats</option>
          <option value="3">Desserts</option>
          <option value="4">Boissons</option>
        </select>
        <button className="admin-form-button" type="submit">
          {buttonText} {/* Utilisation du texte conditionnel */}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
