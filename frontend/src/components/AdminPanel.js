import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemForm from "./ItemForm";

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState(""); // Utilisation du hook useState ici
  const [price, setPrice] = useState(""); // Utilisation du hook useState ici
  const [category, setCategory] = useState(""); // Utilisation du hook useState ici
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      // console.table(response.data);
      setItems(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Erreur de réponse:", error.response.data);
      } else {
        console.error("Erreur:", error.message);
      }
    }
  };

  const handleCreateItem = async () => {
    try {
      const newItemData = {
        title: title,
        price: price,
        category: category,
        description: "Description de l'article",
      };

      await axios.post("http://localhost:5000/items", newItemData);
      fetchItems();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleEditItem = async (id) => {
    try {
      setSelectedItemId(id);

      // Trouver l'article correspondant dans la liste
      const selectedItem = items.find((item) => item.id === id);

      // Mettre à jour les états avec les valeurs de l'article
      setTitle(selectedItem.title);
      setPrice(selectedItem.price);
      setCategory(selectedItem.category);

      const updatedItemData = {
        title: selectedItem.title,
        price: selectedItem.price,
        category: selectedItem.category,
      };

      await axios.put(`http://localhost:5000/items/${id}`, updatedItemData);
      setMessage("Article modifié avec succès !");
      setError("");
      fetchItems();
    } catch (error) {
      setError("Erreur lors de la modification de l'article.");
      setMessage("");
      console.error("Error editing item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setMessage("Article supprimé avec succès !");
      setError("");
      fetchItems();
    } catch (error) {
      setError("Erreur lors de la suppression de l'article.");
      setMessage("");
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-panel-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="admin-item-list">
        {items.map((item) => (
          <li key={item.id} className="admin-item">
            <div className="admin-item-info">
              <span className="admin-item-title">{item.title}</span>
              <span className="admin-item-price"> €{item.price}</span>
            </div>
            <div className="admin-item-buttons">
              <button
                className="admin-button edit-button"
                onClick={() => handleEditItem(item.id)}
              >
                Modifier{item.id}
              </button>
              <button
                className="admin-button delete-button"
                onClick={() => handleDeleteItem(item.id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ItemForm
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        message={message}
        error={error}
        handleCreateOrUpdateItem={handleCreateItem} // Passez la fonction de création
        selectedItemId={selectedItemId}
      />
    </div>
  );
};

export default AdminPanel;
