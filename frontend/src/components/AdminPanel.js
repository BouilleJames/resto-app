import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminPanel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Appel au service pour obtenir la liste des articles
    fetch("http://localhost:5000/api/items") // Assurez-vous que l'URL est correcte
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des articles", error)
      );
    // Mettre à jour le state "items" avec les données reçues
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <Link to="/dashboard">Tableau de bord</Link>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
