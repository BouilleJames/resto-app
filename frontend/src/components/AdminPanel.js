import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items"); // Adjust the URL as needed
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreateItem = async () => {
    try {
      await axios.post("http://localhost:5000/api/items"); // Adjust the URL as needed
      fetchItems();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleEditItem = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/items/${id}`); // Adjust the URL as needed
      fetchItems();
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`); // Adjust the URL as needed
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => handleCreateItem(item.id)}>Create</button>
            <button onClick={() => handleEditItem(item.id)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
