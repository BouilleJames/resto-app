import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTableStatus } from "./TableContext";
import "./TableSelection.css";

// Importez la fonction isTableOpen de TableChoice
import { isTableOpen } from "./TableChoice";

function TableSelection() {
  const [tableNumber, setTableNumber] = useState("");
  const [totalCovers, setTotalCovers] = useState("");
  const navigate = useNavigate();
  const { updateTableStatus } = useTableStatus();

  useEffect(() => {
    // Effectuez une vérification initiale pour voir si la table existe déjà
    const checkTableExistence = async () => {
      try {
        const tableAlreadyOpen = isTableOpen(tableNumber);

        if (tableAlreadyOpen) {
          // La table existe déjà et est ouverte, affichez un message d'erreur
          console.log("Cette table est déjà occupée.");
          return;
        }

        // Si la table n'existe pas déjà, vous pouvez continuer avec la création
        // ...
      } catch (error) {
        console.error("Erreur lors de la vérification de la table :", error);
      }
    };

    if (tableNumber !== "") {
      checkTableExistence();
    }
  }, [tableNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyez les données au serveur pour enregistrement dans la base de données
      const response = await axios.post("https://localhost:5000/api/tables", {
        tableNumber,
        totalCovers,
        status: "occupied",
      });

      console.log("Réponse du serveur:", response.data);

      // Mettez à jour le statut de la table comme occupée
      updateTableStatus(tableNumber, "occupied");

      // Réinitialisez les champs après l'enregistrement
      setTableNumber("");
      setTotalCovers("");
      navigate(`/dashboard/${tableNumber}`);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error.response.data);
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

// ------------------------------------------------------

// code avant modification du 2023-09-09
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useTableStatus } from "./TableContext";
// import "./TableSelection.css";

// function TableSelection() {
//   const [tableNumber, setTableNumber] = useState("");
//   const [totalCovers, setTotalCovers] = useState("");
//   const navigate = useNavigate();
//   const { updateTableStatus } = useTableStatus();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Envoyez les données au serveur pour enregistrement dans la base de données
//       const response = await axios.post("https://localhost:5000/api/tables", {
//         tableNumber,
//         totalCovers,
//       });

//       console.log("Réponse du serveur:", response.data);

//       // Mettez à jour le statut de la table comme occupée
//       updateTableStatus(tableNumber, "occupied");

//       // Réinitialisez les champs après l'enregistrement
//       setTableNumber("");
//       setTotalCovers("");
//       navigate(`/dashboard/${tableNumber}`);
//     } catch (error) {
//       console.error("Erreur lors de l'enregistrement:", error.response.data);
//     }
//   };

//   return (
//     <div className="table-selection-container">
//       <h2>Sélection de la Table</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="align">
//           <label htmlFor="tablenumber">Numéro de Table:</label>
//           <input
//             type="number"
//             id="tablenumber"
//             value={tableNumber}
//             onChange={(e) => setTableNumber(e.target.value)}
//             required
//           />
//         </div>
//         <div className="align">
//           <label htmlFor="totalcovers">Nombre de Personnes:</label>
//           <input
//             type="number"
//             id="totalcovers"
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

// ----------------------------------------------------------
// code avant modification du 2023-09-10 à 16.37
// ----------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useTableStatus } from "./TableContext";
// import "./TableSelection.css";

// function TableSelection() {
//   const [tableNumber, setTableNumber] = useState("");
//   const [totalCovers, setTotalCovers] = useState("");
//   const navigate = useNavigate();
//   const { updateTableStatus } = useTableStatus();

//   useEffect(() => {
//     // Effectuez une vérification initiale pour voir si la table existe déjà
//     const checkTableExistence = async () => {
//       try {
//         const response = await axios.get(
//           `https://localhost:5000/api/tables/${tableNumber}`
//         );

//         if (response.data) {
//           // La table existe déjà, vous pouvez naviguer vers le tableau de bord
//           navigate(`/dashboard/${tableNumber}`);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la vérification de la table :", error);
//       }
//     };

//     if (tableNumber !== "") {
//       checkTableExistence();
//     }
//   }, [tableNumber, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Envoyez les données au serveur pour enregistrement dans la base de données
//       const response = await axios.post("https://localhost:5000/api/tables", {
//         tableNumber,
//         totalCovers,
//       });

//       console.log("Réponse du serveur:", response.data);

//       // Mettez à jour le statut de la table comme occupée
//       updateTableStatus(tableNumber, "occupied");

//       // Réinitialisez les champs après l'enregistrement
//       setTableNumber("");
//       setTotalCovers("");
//       navigate(`/dashboard/${tableNumber}`);
//     } catch (error) {
//       console.error("Erreur lors de l'enregistrement :", error.response.data);
//     }
//   };

//   return (
//     <div className="table-selection-container">
//       <h2>Sélection de la Table</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="align">
//           <label htmlFor="tablenumber">Numéro de Table:</label>
//           <input
//             type="number"
//             id="tablenumber"
//             value={tableNumber}
//             onChange={(e) => setTableNumber(e.target.value)}
//             required
//           />
//         </div>
//         <div className="align">
//           <label htmlFor="totalcovers">Nombre de Personnes:</label>
//           <input
//             type="number"
//             id="totalcovers"
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
