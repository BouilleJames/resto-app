// components/ItemForm.js
import React from "react";
import axios from "axios";
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
}) => {
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
          onChange={(e) => {
            const newValue = Math.max(0, e.target.value);
            setPrice(newValue);
          }}
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
          Créer
        </button>
      </form>
    </div>
  );
};

export default ItemForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ItemForm.css";

// const ItemForm = ({ handleCreateOrUpdateItem, selectedItemId }) => {
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (selectedItemId) {
//       fetchItem(selectedItemId);
//     }
//   }, [selectedItemId]);

//   const fetchItem = async (itemId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/items/${itemId}`);
//       const itemData = response.data;
//       setTitle(itemData.title);
//       setPrice(itemData.price);
//       setCategory(itemData.category);
//     } catch (error) {
//       console.error("Error fetching item:", error);
//     }
//   };

//   const handleCreateOrUpdateItem = async () => {
//     try {
//       const itemData = {
//         title: title,
//         price: price,
//         category: category,
//       };

//       if (selectedItemId) {
//         // If selectedItemId is available, perform update
//         await axios.put(
//           `http://localhost:5000/items/${selectedItemId}`,
//           itemData
//         );
//         setMessage("Article modifié avec succès !");
//       } else {
//         // Otherwise, perform creation
//         await axios.post("http://localhost:5000/items", itemData);
//         setMessage("Article créé avec succès !");
//       }

//       setError("");
//     } catch (error) {
//       setError(
//         selectedItemId
//           ? "Erreur lors de la modification de l'article."
//           : "Erreur lors de la création de l'article."
//       );
//       setMessage("");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="admin-form-container">
//       <h3>Formulaire de création d'article</h3>
//       {message && <p className="admin-message success-message">{message}</p>}
//       {error && <p className="admin-message error-message">{error}</p>}
//       <form className="admin-form" onSubmit={handleCreateOrUpdateItem}>
//         <label className="admin-form-label">Titre:</label>
//         <input
//           type="text"
//           className="admin-form-input"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <label className="admin-form-label">Prix:</label>
//         <input
//           type="number"
//           className="admin-form-input"
//           value={price}
//           onChange={(e) => {
//             const newValue = Math.max(0, e.target.value);
//             setPrice(newValue);
//           }}
//           required
//         />
//         <label className="admin-form-label">Catégorie:</label>
//         <select
//           className="admin-form-select"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         >
//           <option value="" disabled>
//             Sélectionnez une catégorie
//           </option>
//           <option value="1">Entrées</option>
//           <option value="2">Plats</option>
//           <option value="3">Desserts</option>
//           <option value="4">Boissons</option>
//         </select>
//         <button className="admin-form-button" type="submit">
//           Créer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ItemForm;
