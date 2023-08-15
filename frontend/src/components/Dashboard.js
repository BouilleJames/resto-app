import React, { useEffect, useState } from "react";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]); // State pour les articles

  useEffect(() => {
    // Appel au service pour obtenir la liste des commandes
    // Mettre à jour le state "orders" avec les données reçues

    // Appel au service pour obtenir la liste des articles
    fetch("http://localhost:5000/api/items") // Assurez-vous que l'URL est correcte
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des articles", error)
      );
  }, []);

  const addToCart = (item) => {
    // Ajouter l'article au panier (cart)
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    // Retirer l'article du panier (cart)
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCart(updatedCart.filter((cartItem) => cartItem.quantity > 0));
  };

  const generateKitchenTicket = () => {
    // Générer le ticket pour la cuisine
  };

  const generateBarTicket = () => {
    // Générer le ticket pour le bar
  };

  const completeOrder = () => {
    // Finaliser la commande (générer la facture, enregistrer en base de données, etc.)
  };

  return (
    <div>
      <h2>Tableau de bord</h2>
      <div>
        <h3>Commandes en cours</h3>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.id}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Carte</h3>
        <ul>
          {cart.map((cartItem) => (
            <li key={cartItem.id}>
              {cartItem.title} - {cartItem.price}{" "}
              <button onClick={() => removeFromCart(cartItem)}>Retirer</button>
            </li>
          ))}
        </ul>
        <button onClick={generateKitchenTicket}>Générer Ticket Cuisine</button>
        <button onClick={generateBarTicket}>Générer Ticket Bar</button>
        <button onClick={completeOrder}>Terminer Commande</button>
      </div>
    </div>
  );
}

export default Dashboard;
