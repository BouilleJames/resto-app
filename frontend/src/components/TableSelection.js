// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function TableSelection() {
//   const [tableNumber, setTableNumber] = useState("");
//   const [totalCovers, setTotalCovers] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Envoyez les données au serveur pour enregistrement dans la base de données
//       const response = await axios.post("http://localhost:5000/api/tables", {
//         tableNumber,
//         totalCovers,
//       });

//       console.log("Réponse du serveur:", response.data);

//       // Réinitialisez les champs après l'enregistrement
//       setTableNumber("");
//       setTotalCovers("");
//       navigate("/dashboard");
//     } catch (error) {
//       if (error.response && error.response.data) {
//         console.error("Erreur lors de l'enregistrement:", error.response.data);
//       } else {
//         console.error("Erreur lors de l'enregistrement:", error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Sélection de la Table :</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Numéro de Table:</label>
//           <input
//             type="number"
//             value={tableNumber}
//             onChange={(e) => setTableNumber(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Nombre de Personnes:</label>
//           <input
//             type="number"
//             value={totalCovers}
//             onChange={(e) => setTotalCovers(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Enregistrer</button>
//       </form>
//     </div>
//   );
// }

// export default TableSelection;

// code avant modification du 2023-08-21
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTableStatus } from "./TableContext";
import "./TableSelection.css";

function TableSelection() {
  const [tableNumber, setTableNumber] = useState("");
  const [totalCovers, setTotalCovers] = useState("");
  const navigate = useNavigate();

  const { updateTableStatus } = useTableStatus();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyez les données au serveur pour enregistrement dans la base de données
      const response = await axios.post("https://localhost:5000/api/tables", {
        tableNumber,
        totalCovers,
      });

      console.log("Réponse du serveur:", response.data);

      // Mettez à jour le statut de la table comme occupée
      updateTableStatus(tableNumber, "occupied");

      // Réinitialisez les champs après l'enregistrement
      setTableNumber("");
      setTotalCovers("");
      navigate(`/dashboard/${tableNumber}`);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error.response.data);
    }
  };

  return (
    <div className="table-selection-container">
      <h2>Sélection de la Table</h2>
      <form onSubmit={handleSubmit}>
        <div className="align">
          <label htmlFor="tablenumber">Numéro de Table:</label>
          <input
            type="number"
            id="tablenumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />
        </div>
        <div className="align">
          <label htmlFor="totalcovers">Nombre de Personnes:</label>
          <input
            type="number"
            id="totalcovers"
            value={totalCovers}
            onChange={(e) => setTotalCovers(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default TableSelection;
