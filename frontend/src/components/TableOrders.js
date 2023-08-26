import React, { useState, useEffect } from "react";
import axios from "axios";

function TableOrders({ tableNumber }) {
  const [tableOrders, setTableOrders] = useState([]);
  const [error, setError] = useState(null); // Ajout d'un état pour gérer les erreurs

  useEffect(() => {
    // Appel à l'API pour récupérer les articles enregistrés pour la table spécifique
    async function fetchTableOrders() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tables/${tableNumber}/orders`
        );
        setTableOrders(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des commandes de la table:",
          error
        );
        setError(error);
      }
    }

    fetchTableOrders();
  }, [tableNumber]);

  if (error) {
    return <div>Erreur lors de la récupération des commandes de la table.</div>;
  }

  return (
    <div className="table-orders-container">
      <h3>Commandes pour la Table {tableNumber} :</h3>
      {tableOrders.map((order, index) => (
        <div key={index} className="table-order">
          <h4>Commande {index + 1}</h4>
          <ul>
            {order.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <p>Article: {item.itemTitle}</p>
                <p>Quantité: {item.quantity}</p>
                {/* Ajoutez d'autres informations si nécessaire */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TableOrders;

// import React, { useState, useEffect } from "react";
// import "./TableOrders.css";
// import axios from "axios";

// function TableOrders({ tableNumber }) {
//   const [tableOrders, setTableOrders] = useState([]);
//   const [items, setItems] = useState([]);
//   const [tableOrder, setTableOrder] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [setTableNumber] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/tables/${tableNumber}/orders`)
//       .then((response) => setTableOrders(response.data))
//       .catch((error) =>
//         console.error(
//           "Erreur lors de la récupération des commandes de la table",
//           error
//         )
//       );

//     axios
//       .get("http://localhost:5000/api/items")
//       .then((response) => setItems(response.data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des articles", error)
//       );
//   }, [tableNumber]);

//   // Vérifiez si les articles sont chargés avant d'afficher le contenu
//   if (items.length === 0) {
//     return <div>Chargement des articles...</div>;
//   }

//   const addToTableOrder = (item) => {
//     setTableOrder((prevOrder) => [...prevOrder, item]);
//   };

//   const removeFromTableOrder = (itemId) => {
//     setTableOrder((prevOrder) =>
//       prevOrder.filter((item) => item.id !== itemId)
//     );
//   };

//   const generateTableOrder = () => {
//     console.log("Commande générée :", tableOrder);

//     const existingTableOrder = tableOrders.find(
//       (order) => order.tableNumber === tableNumber
//     );
//     const consolidatedOrder = existingTableOrder
//       ? [...existingTableOrder.items, ...tableOrder]
//       : tableOrder;

//     if (existingTableOrder) {
//       const updatedOrders = tableOrders.map((order) =>
//         order.tableNumber === tableNumber
//           ? { ...order, items: consolidatedOrder }
//           : order
//       );
//       setTableOrders(updatedOrders);
//     } else {
//       setTableOrders([
//         ...tableOrders,
//         { tableNumber, items: consolidatedOrder },
//       ]);
//     }

//     setTableOrder([]);
//   };

//   const tableOrderTotal = tableOrder.reduce(
//     (total, item) => total + item.price,
//     0
//   );

//   const filteredItems = selectedCategory
//     ? items.filter((item) => item.category_id === selectedCategory)
//     : items;

//   const addToCart = (item) => {
//     const existingItem = cart.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
//       setCart((prevCart) =>
//         prevCart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (item) => {
//     const updatedCart = cart.map((cartItem) =>
//       cartItem.id === item.id
//         ? { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem
//     );
//     setCart(updatedCart.filter((cartItem) => cartItem.quantity > 0));
//   };

//   const completeOrder = () => {
//     if (Object.keys(tableOrders).length === 0) {
//       alert("Veuillez choisir une table avant de terminer la commande.");
//       return;
//     }
//     console.log("Commande terminée:", tableOrders);
//     // Envoyer la commande au serveur (vous pouvez utiliser une API, WebSocket, etc.)
//     // Réinitialiser les états
//     setTableNumber("");
//     setTableOrders([]);
//     setTableOrder([]);
//   };

//   return (
//     <div className="table-orders-container">
//       <h2>Commandes de la table {tableNumber}</h2>
//       <div className="order-list">
//         <h3>Commande en cours :</h3>
//         <ul>
//           {tableOrder.map((item) => (
//             <li key={item.id}>
//               {item.title} - {item.price} €{" "}
//               <button onClick={() => removeFromTableOrder(item.id)}>
//                 Retirer
//               </button>
//             </li>
//           ))}
//         </ul>
//         <div>Total de la commande : {tableOrderTotal} €</div>
//         <button onClick={generateTableOrder}>Générer la commande</button>
//       </div>
//       <div className="items-list">
//         <h3>Articles disponibles :</h3>
//         <div className="category-filter">
//           <button
//             onClick={() => setSelectedCategory(null)}
//             className={selectedCategory === null ? "active" : ""}
//           >
//             Tous
//           </button>
//           <button
//             onClick={() => setSelectedCategory(1)}
//             className={selectedCategory === 1 ? "active" : ""}
//           >
//             Entrées
//           </button>
//           <button
//             onClick={() => setSelectedCategory(2)}
//             className={selectedCategory === 2 ? "active" : ""}
//           >
//             Plats
//           </button>
//           <button
//             onClick={() => setSelectedCategory(3)}
//             className={selectedCategory === 3 ? "active" : ""}
//           >
//             Desserts
//           </button>
//           <button
//             onClick={() => setSelectedCategory(4)}
//             className={selectedCategory === 4 ? "active" : ""}
//           >
//             Boissons
//           </button>
//           {/* Ajoutez d'autres boutons pour les catégories restantes */}
//         </div>
//         <ul>
//           {filteredItems.map((item) => (
//             <li key={item.id}>
//               {item.title} - {item.price}- {item.quantity} €{" "}
//               <button onClick={() => addToTableOrder(item)}>Ajouter</button>
//             </li>
//           ))}
//         </ul>
//         <h3>Carte</h3>
//         <ul>
//           {filteredItems.map((item) => (
//             <li
//               key={item.id}
//               className={
//                 cart.some((cartItem) => cartItem.id === item.id)
//                   ? "selected"
//                   : ""
//               }
//             >
//               <div className="item-info">
//                 <span className="item-title">{item.title}</span>
//                 <span className="item-price">{item.price}</span>
//               </div>
//               <button onClick={() => addToCart(item)}>Ajouter au panier</button>
//             </li>
//           ))}
//         </ul>
//         <ul>
//           {cart.map((cartItem) => (
//             <li key={cartItem.id}>
//               <div className="cart-item-info">
//                 <span className="cart-item-title">{cartItem.title}</span>
//                 <span className="cart-item-price">{cartItem.price}</span>
//                 <span className="cart-item-quantity">
//                   Quantité : {cartItem.quantity}
//                 </span>
//               </div>
//               <button onClick={() => removeFromCart(cartItem)}>Retirer</button>
//             </li>
//           ))}
//         </ul>
//         <button onClick={completeOrder}>Terminer Commande</button>
//       </div>
//     </div>
//   );
// }

// export default TableOrders;
