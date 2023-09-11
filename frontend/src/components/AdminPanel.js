import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemForm from "./ItemForm";
import jwt from "jsonwebtoken";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [role, setRole] = useState("");
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    fetchItems();
    if (authToken) {
      const decodedToken = jwt.decode(authToken);
      setRole(decodedToken.role);
    }
  }, [authToken]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("https://localhost:5000/items");
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

  if (role !== "admin") {
    return <div>Vous n'êtes pas autorisé à accéder à cette page.</div>;
  }

  const handleCreateItem = async () => {
    try {
      const newItemData = {
        title: title,
        price: price,
        category_id: category,
        description: "Description de l'article",
      };

      console.log("newItemData:", newItemData);

      await axios.post("https://localhost:5000/items", newItemData);
      setMessage("Article créé avec succès !");
      setError(""); // Réinitialise l'erreur si elle était précédemment affichée
      setTitle(""); // Réinitialise les champs
      setPrice("");
      setCategory("");
      // setSelectedItemId(null);
      fetchItems(); // Met à jour la liste des articles
      setForm(false);
    } catch (error) {
      setError("Erreur lors de la création de l'article.");
      setMessage(""); // Réinitialise le message si une erreur est survenue
      console.error("Error creating item:", error);
    }
  };

  const handleEditItem = async (item) => {
    try {
      const id = selectedItemId;

      const updatedItemData = {
        title: item.title,
        price: parseFloat(item.price), // Convertir en nombre décimal
        category_id: item.category,
        updatedAt: new Date(),
      };

      await axios.put(`https://localhost:5000/items/${id}`, updatedItemData);
      setMessage("Article modifié avec succès !");
      setError("");
      fetchItems();

      setSelectedItemId(null); // Réinitialise l'état pour indiquer que vous n'êtes plus en mode édition
      setForm(false);
    } catch (error) {
      setError("Erreur lors de la modification de l'article.");
      setMessage("");
      console.error("Error editing item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`https://localhost:5000/items/${id}`);
      setMessage("Article supprimé avec succès !");
      setError("");
      fetchItems();
    } catch (error) {
      setError("Erreur lors de la suppression de l'article.");
      setMessage("");
      console.error("Error deleting item:", error);
    }
  };

  const handleFilterByCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleForm = (item) => {
    setForm(true);
    if (item) {
      setFormTitle("Formulaire de modification d'article");
      setSelectedItemId(item.id);
      setTitle(item.title);
      setPrice(item.price);
      setCategory(item.category_id);
    } else {
      setFormTitle("Formulaire de création d'article");
    }
  };

  const handleFormSubmit = (itemData) => {
    selectedItemId ? handleEditItem(itemData) : handleCreateItem(itemData);
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category_id === selectedCategory)
    : items;

  return (
    <div className="admin-panel-container">
      <div className="admin-panel-header">
        <h2>Admin Panel</h2>
        <div className="category-filter">
          <button
            onClick={() => handleFilterByCategory(1)}
            className={selectedCategory === 1 ? "active" : ""}
          >
            Entrées
          </button>
          <button
            onClick={() => handleFilterByCategory(2)}
            className={selectedCategory === 2 ? "active" : ""}
          >
            Plats
          </button>
          <button
            onClick={() => handleFilterByCategory(3)}
            className={selectedCategory === 3 ? "active" : ""}
          >
            Desserts
          </button>
          <button
            onClick={() => handleFilterByCategory(4)}
            className={selectedCategory === 4 ? "active" : ""}
          >
            Boissons
          </button>
        </div>
      </div>
      <ul className="admin-item-list">
        {filteredItems.map((item) => (
          <li key={item.id} className="admin-item">
            <button
              className="admin-button edit-button"
              onClick={() => handleForm(item)}
            >
              <span role="img" aria-label="Modifier">
                &#9997;
              </span>
            </button>
            <div className="admin-item-info">
              <span className="admin-item-title">{item.title}</span>
              <span className="admin-item-price"> €{item.price}</span>
            </div>
            <div className="admin-item-buttons">
              <button
                className="admin-button delete-button"
                onClick={() => handleDeleteItem(item.id)}
              >
                <span role="img" aria-label="Effacer">
                  &#128465;
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="admin-button delete-button"
        onClick={() => handleForm()}
      >
        <span role="img" aria-label="Effacer">
          Créer un nouvel article
        </span>
      </button>
      <>
        {form && (
          <ItemForm
            formTitle={formTitle}
            title={title}
            setTitle={setTitle}
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            message={message}
            error={error}
            handleCreateOrUpdateItem={() =>
              handleFormSubmit({
                title,
                price,
                category,
              })
            }
            selectedItemId={selectedItemId}
          />
        )}
      </>
    </div>
  );
};

export default AdminPanel;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ItemForm from "./ItemForm";

// const AdminPanel = () => {
//   const [items, setItems] = useState([]);
//   const [title, setTitle] = useState(""); // Utilisation du hook useState ici
//   const [price, setPrice] = useState(""); // Utilisation du hook useState ici
//   const [category, setCategory] = useState(""); // Utilisation du hook useState ici
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [selectedItemId, setSelectedItemId] = useState(null);

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/items");
//       // console.table(response.data);
//       setItems(response.data);
//     } catch (error) {
//       if (error.response) {
//         console.error("Erreur de réponse:", error.response.data);
//       } else {
//         console.error("Erreur:", error.message);
//       }
//     }
//   };

//   const handleCreateItem = async () => {
//     try {
//       const newItemData = {
//         title: title,
//         price: price,
//         category_id: category,
//         description: "Description de l'article",
//       };

//       await axios.post("http://localhost:5000/items", newItemData);
//       setMessage("Article créé avec succès !");
//       setError(""); // Réinitialise l'erreur si elle était précédemment affichée
//       setTitle(""); // Réinitialise les champs
//       setPrice("");
//       setCategory("");
//       fetchItems(); // Met à jour la liste des articles
//     } catch (error) {
//       setError("Erreur lors de la création de l'article.");
//       setMessage(""); // Réinitialise le message si une erreur est survenue
//       console.error("Error creating item:", error);
//     }
//   };

//   const handleEditItem = async (id) => {
//     try {
//       setSelectedItemId(id);

//       // Trouver l'article correspondant dans la liste
//       const selectedItem = items.find((item) => item.id === id);

//       // Mettre à jour les états avec les valeurs de l'article
//       setTitle(selectedItem.title);
//       setPrice(selectedItem.price);
//       setCategory(selectedItem.category_id);

//       const updatedItemData = {
//         title: selectedItem.title,
//         price: selectedItem.price,
//         category: selectedItem.category,
//       };

//       await axios.put(`http://localhost:5000/items/${id}`, updatedItemData);
//       setMessage("Article modifié avec succès !");
//       setError("");
//       fetchItems();
//     } catch (error) {
//       setError("Erreur lors de la modification de l'article.");
//       setMessage("");
//       console.error("Error editing item:", error);
//     }
//   };

//   const handleDeleteItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/items/${id}`);
//       setMessage("Article supprimé avec succès !");
//       setError("");
//       fetchItems();
//     } catch (error) {
//       setError("Erreur lors de la suppression de l'article.");
//       setMessage("");
//       console.error("Error deleting item:", error);
//     }
//   };

//   return (
//     <div className="admin-panel-container">
//       <div className="admin-panel-header">
//         <h2>Admin Panel</h2>
//       </div>
//       <ul className="admin-item-list">
//         {items.map((item) => (
//           <li key={item.id} className="admin-item">
//             <div className="admin-item-info">
//               <span className="admin-item-title">{item.title}</span>
//               <span className="admin-item-price"> €{item.price}</span>
//             </div>
//             <div className="admin-item-buttons">
//               <button
//                 className="admin-button edit-button"
//                 onClick={() => handleEditItem(item.id)}
//               >
//                 Modifier{item.id}
//               </button>
//               <button
//                 className="admin-button delete-button"
//                 onClick={() => handleDeleteItem(item.id)}
//               >
//                 Supprimer
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <ItemForm
//         title={title}
//         setTitle={setTitle}
//         price={price}
//         setPrice={setPrice}
//         category={category}
//         setCategory={setCategory}
//         message={message}
//         error={error}
//         handleCreateOrUpdateItem={handleCreateItem} // Passez la fonction de création
//         selectedItemId={selectedItemId}
//       />
//     </div>
//   );
// };

// export default AdminPanel;
