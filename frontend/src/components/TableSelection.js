import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TableSelection() {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const handleStartOrder = () => {
    if (!tableNumber || !numberOfPeople) {
      alert("Veuillez saisir le numéro de table et le nombre de personnes.");
      return;
    }

    // Vous pouvez effectuer des actions supplémentaires ici, comme enregistrer les informations dans le state global, etc.

    // Rediriger vers le tableau de bord ou une autre page après la sélection de la table
    navigate("/dashboard");
  };

  return (
    <div className="table-selection-container">
      <h2>Sélection de la Table</h2>
      <div>
        <label>Numéro de Table:</label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Nombre de Personnes:</label>
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          required
        />
      </div>
      <button onClick={handleStartOrder}>Commencer la Commande</button>
    </div>
  );
}

export default TableSelection;
