import React, { useEffect, useState } from "react";
import axios from "axios";
// import Categories from "./Categories";
import TableOrders from "./TableOrders";
import { useParams } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const { tableNumber } = useParams();
  const [items, setItems] = useState([]); // État pour stocker la liste des articles
  const [cart, setCart] = useState([]); // État pour stocker le panier
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tableOrders, setTableOrders] = useState({});
  const [selectedTable] = useState(""); // État pour stocker les commandes par table

  useEffect(() => {
    // Appel à l'API pour récupérer les données d'articles
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category_id === selectedCategory)
    : items;

  const addToCart = (item) => {
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
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCart(updatedCart.filter((cartItem) => cartItem.quantity > 0));
  };

  const generateKitchenTicket = () => {
    console.log(`Kitchen Ticket Generated for Table: {tableNumber}`);

    // Filtrer les articles du panier par catégories 1 à 3
    const kitchenItems = cart.filter(
      (cartItem) => cartItem.category_id >= 1 && cartItem.category_id <= 3
    );

    // Mettez à jour l'état tableOrders avec les articles commandés
    setTableOrders((prevTableOrders) => ({
      ...prevTableOrders,
      [selectedTable]: kitchenItems.map((cartItem) => ({
        id: cartItem.id, // Ajoutez l'ID de l'article
        quantity: cartItem.quantity,
      })),
    }));

    // Appelez l'API pour enregistrer la commande en cuisine dans la base de données
    axios
      .post(`http://localhost:5000/api/kitchen-orders/${selectedTable}`, {
        items: kitchenItems.map((cartItem) => ({
          id: cartItem.id, // Ajoutez l'ID de l'article
          quantity: cartItem.quantity,
        })),
      })
      .then((response) => {
        console.log("Commande enregistrée en cuisine:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement de la commande:", error);
      });

    // Supprimez les articles du panier des catégories 1 à 3
    const updatedCart = cart.filter((cartItem) => cartItem.category_id > 3);

    // Mettez à jour le panier avec les articles restants
    setCart(updatedCart);
  };

  const generateBarTicket = () => {
    console.log(`Bar Ticket Generated for Table: {tableNumber}:`);

    // Filtrer les articles du panier par catégories 4 (boissons)
    const barItems = cart.filter((cartItem) => cartItem.category_id === 4);

    // Mettez à jour l'état tableOrders avec les articles commandés
    setTableOrders((prevTableOrders) => ({
      ...prevTableOrders,
      [selectedTable]: barItems.map((cartItem) => ({
        itemTitle: cartItem.title,
        quantity: cartItem.quantity,
      })),
    }));

    // Appelez l'API pour enregistrer la commande au bar dans la base de données
    axios
      .post("http://localhost:5000/api/orders", {
        items: barItems,
        tableNumber: selectedTable,
      })
      .then((response) => {
        console.log("Commande enregistrée au bar:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement de la commande:", error);
      });

    // Supprimez les articles du panier de la catégorie 4
    const updatedCart = cart.filter((cartItem) => cartItem.category_id < 4);

    // Mettez à jour le panier avec les articles restants
    setCart(updatedCart);
  };

  return (
    <div className="dashboard-container">
      <h2>Tableau de bord</h2>
      <div className="category-filter">
        <button
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? "active" : ""}
        >
          Tous
        </button>
        <button
          onClick={() => setSelectedCategory(1)}
          className={selectedCategory === 1 ? "active" : ""}
        >
          Entrées
        </button>
        <button
          onClick={() => setSelectedCategory(2)}
          className={selectedCategory === 2 ? "active" : ""}
        >
          Plats
        </button>
        <button
          onClick={() => setSelectedCategory(3)}
          className={selectedCategory === 3 ? "active" : ""}
        >
          Desserts
        </button>
        <button
          onClick={() => setSelectedCategory(4)}
          className={selectedCategory === 4 ? "active" : ""}
        >
          Boissons
        </button>
        {/* Ajoutez d'autres boutons pour les catégories restantes */}
      </div>
      <div className="menu-section">
        <h3>Articles disponibles :</h3>
        <ul>
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className={
                cart.some((cartItem) => cartItem.id === item.id)
                  ? "selected"
                  : ""
              }
            >
              <div className="item-info">
                <span className="item-title">{item.title}</span>
                <span className="item-price">{item.price}</span>
              </div>
              <button onClick={() => addToCart(item)}>Ajouter au panier</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-section">
        <h3>Panier :</h3>
        <ul>
          {cart.map((cartItem) => (
            <li key={cartItem.id}>
              <div className="cart-item-info">
                <span className="cart-item-title">{cartItem.title}</span>
                <span className="cart-item-price">{cartItem.price}</span>
                <span className="cart-item-quantity">
                  Quantité : {cartItem.quantity}
                </span>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(cartItem)}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
        <button className="generate-button" onClick={generateKitchenTicket}>
          Générer Ticket Cuisine
        </button>
        <button className="generate-button" onClick={generateBarTicket}>
          Générer Ticket Bar
        </button>
      </div>
      <TableOrders tableOrders={tableOrders} />{" "}
      {/* Composant pour afficher les commandes par table */}
    </div>
  );
}

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Categories from "./Categories";
// import "./Dashboard.css";
// import TableOrders from "./TableOrders";

// function Dashboard() {
//   const [items, setItems] = useState([]); // État pour stocker la liste des articles
//   const [cart, setCart] = useState([]); // État pour stocker le panier
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     // Appel à l'API pour récupérer les données d'articles
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/items");
//       setItems(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des articles:", error);
//     }
//   };

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

//   const generateKitchenTicket = () => {
//     console.log("Kitchen Ticket Generated:");

//     // Filtrer les articles du panier par catégories 1 à 3
//     const kitchenItems = cart.filter(
//       (cartItem) => cartItem.category_id >= 1 && cartItem.category_id <= 3
//     );

//     // Envoyer le ticket à la cuisine (vous pouvez utiliser une API, WebSocket, etc.)
//     // Afficher les articles du ticket pour la cuisine
//     console.log("Articles pour la cuisine :", kitchenItems);

//     // Supprimer les articles du panier des catégories 1 à 3
//     const updatedCart = cart.filter((cartItem) => cartItem.category_id > 3);

//     // Mettre à jour le panier avec les articles restants
//     setCart(updatedCart);
//   };

//   // const generateKitchenTicket = async () => {
//   //   console.log("Kitchen Ticket Generated:");

//   //   // Filtrer les articles du panier par catégories 1 à 3
//   //   const kitchenItems = cart.filter(
//   //     (cartItem) => cartItem.category_id >= 1 && cartItem.category_id <= 3
//   //   );

//   //   // Créer une nouvelle commande dans la base de données
//   //   try {
//   //     const newOrder = await Order.create({
//   //       user_id: 1, // Remplacez par l'ID de l'utilisateur en cours
//   //       table_id: 1, // Remplacez par l'ID de la table appropriée
//   //       status: "en_cours",
//   //     });

//   //     // Ajouter les articles associés à la commande dans la table OrderItem
//   //     for (const kitchenItem of kitchenItems) {
//   //       await OrderItem.create({
//   //         order_id: newOrder.id,
//   //         item_id: kitchenItem.id,
//   //         quantity: kitchenItem.quantity,
//   //         status: "en_cours",
//   //       });
//   //     }

//   //     console.log("Commande enregistrée avec succès:", newOrder);
//   //   } catch (error) {
//   //     console.error("Erreur lors de l'enregistrement de la commande:", error);
//   //   }

//   //   // Mettre à jour le panier en supprimant les articles des catégories 1 à 3
//   //   const updatedCart = cart.filter((cartItem) => cartItem.category_id > 3);
//   //   setCart(updatedCart);
//   // };

//   const generateBarTicket = () => {
//     console.log("Bar Ticket Generated:");

//     // Filtrer les articles du panier par catégories 1 à 3
//     const barItems = cart.filter((cartItem) => cartItem.category_id === 4);

//     // Envoyer le ticket au bar (vous pouvez utiliser une API, WebSocket, etc.)
//     // Afficher les articles du ticket pour la cuisine
//     console.log("Articles pour le bar :", barItems);

//     // Supprimer les articles du panier de la catégorie 4
//     const updatedCart = cart.filter((cartItem) => cartItem.category_id < 4);

//     // Mettre à jour le panier avec les articles restants
//     setCart(updatedCart);
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Tableau de bord</h2>
//       <div className="category-filter">
//         <button
//           onClick={() => setSelectedCategory(null)}
//           className={selectedCategory === null ? "active" : ""}
//         >
//           Tous
//         </button>
//         <button
//           onClick={() => setSelectedCategory(1)}
//           className={selectedCategory === 1 ? "active" : ""}
//         >
//           Entrées
//         </button>
//         <button
//           onClick={() => setSelectedCategory(2)}
//           className={selectedCategory === 2 ? "active" : ""}
//         >
//           Plats
//         </button>
//         <button
//           onClick={() => setSelectedCategory(3)}
//           className={selectedCategory === 3 ? "active" : ""}
//         >
//           Desserts
//         </button>
//         <button
//           onClick={() => setSelectedCategory(4)}
//           className={selectedCategory === 4 ? "active" : ""}
//         >
//           Boissons
//         </button>
//         {/* Ajoutez d'autres boutons pour les catégories restantes */}
//       </div>
//       <div className="menu-section">
//         <h3>Articles disponibles :</h3>
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
//       </div>
//       <div className="cart-section">
//         <h3>Panier :</h3>
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
//               <button
//                 className="remove-button"
//                 onClick={() => removeFromCart(cartItem)}
//               >
//                 Retirer
//               </button>
//             </li>
//           ))}
//         </ul>
//         <button className="generate-button" onClick={generateKitchenTicket}>
//           Générer Ticket Cuisine
//         </button>
//         <button className="generate-button" onClick={generateBarTicket}>
//           Générer Ticket Bar
//         </button>
//       </div>
//       <TableOrders tableOrders={tableOrders} />
//     </div>
//   );
// }

// export default Dashboard;

// ***********************************************************************
// import React, { useState, useEffect } from "react";
// import TableSelection from "./TableSelection";
// import TableOrders from "./TableOrders";
// import Categories from "./Categories";
// import axios from "axios";

// const Dashboard = () => {
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [selectedPeople, setSelectedPeople] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [cart, setCart] = useState([]); // Initialize cart state
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Appel à l'API pour récupérer les données d'articles
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/items");
//       setItems(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des articles:", error);
//     }
//   };

//   const handleTableSelection = (tableNumber, totalCovers) => {
//     setSelectedTable(tableNumber);
//     setSelectedPeople(totalCovers);
//   };

//   const handleCategoryFilter = (category) => {
//     setSelectedCategory(category);
//   };

//   const addToTableOrder = (item) => {
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

//   // Replace with your actual item data
//   const filteredItems = items.filter(
//     (item) => selectedCategory === null || item.category_id === selectedCategory
//   );

//   return (
//     <div>
//       <h2>Table Selection</h2>
//       {!selectedTable ? (
//         <TableSelection onTableSelect={handleTableSelection} />
//       ) : (
//         <TableOrders tableNumber={selectedTable} />
//       )}

//       {selectedTable && selectedPeople && (
//         <div>
//           <h2>Menu</h2>
// <Categories
//   categories={Categories} // Replace with your actual category data
//   activeCategory={selectedCategory}
//   filterItems={handleCategoryFilter}
// />
//           <div className="category-filter">
//             <button
//               onClick={() => handleCategoryFilter(null)}
//               className={selectedCategory === null ? "active" : ""}
//             >
//               Tous
//             </button>
//             <button
//               onClick={() => handleCategoryFilter(1)}
//               className={selectedCategory === 1 ? "active" : ""}
//             >
//               Entrées
//             </button>
//             <button
//               onClick={() => handleCategoryFilter(2)}
//               className={selectedCategory === 2 ? "active" : ""}
//             >
//               Plats
//             </button>
//             <button
//               onClick={() => handleCategoryFilter(3)}
//               className={selectedCategory === 3 ? "active" : ""}
//             >
//               Desserts
//             </button>
//             <button
//               onClick={() => handleCategoryFilter(4)}
//               className={selectedCategory === 4 ? "active" : ""}
//             >
//               Boissons
//             </button>
//           </div>
//           <ul>
//             {filteredItems.map((item) => (
//               <li key={item.id}>
//                 {item.title} - {item.price} €{" "}
//                 <button onClick={() => addToTableOrder(item)}>Ajouter</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <TableOrders />
//     </div>
//   );
// };

// export default Dashboard;
//**************************************************   */

// 19/08/2023
// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";
// import TableSelection from "./TableSelection";
// import TableOrders from "./TableOrders";
// import Categories from "./Categories";

// function Dashboard() {
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [tableOrders, setTableOrders] = useState([]);
//   const numberOfTables = 50;

//   useEffect(() => {
//     fetch("http://localhost:5000/api/categories")
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des catégories", error)
//       );

//     fetch("http://localhost:5000/api/orders")
//       .then((response) => response.json())
//       .then((data) => setOrders(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des commandes", error)
//       );

//     fetch("http://localhost:5000/api/items")
//       .then((response) => response.json())
//       .then((data) => setItems(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des articles", error)
//       );
//   }, []);

//   const handleTableSelect = (tableNumber) => {
//     setSelectedTable(tableNumber);
//   };

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

//   const generateKitchenTicket = () => {
//     console.log("Kitchen Ticket Generated:", cart);
//     setCart([]);
//   };

//   const generateBarTicket = () => {
//     console.log("Bar Ticket Generated:", cart);
//     // Ajouter le contenu de "cart" dans un ticket pour le bar
//     const barTicket = [...cart]; // Créer une copie de cart
//     // Envoyer le ticket au bar (vous pouvez utiliser une API, WebSocket, etc.)
//     console.log("Ticket envoyé au bar:", barTicket);
//   };

//   const completeOrder = () => {
//     if (Object.keys(tableOrders).length === 0) {
//       alert("Veuillez choisir une table avant de terminer la commande.");
//       return;
//     }

//     // Ajouter la commande au tableau des commandes par table
//     const tableNumber = Object.keys(tableOrders)[0]; // Prendre la première clé
//     const currentTableOrders = tableOrders[tableNumber] || [];
//     setTableOrders({
//       ...tableOrders,
//       [tableNumber]: [...currentTableOrders, ...cart],
//     });

//     setCart([]); // Réinitialiser le panier après avoir terminé la commande
//   };

//   const filterItemsByCategory = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredItems = selectedCategory
//     ? items.filter((item) => item.category_id === selectedCategory)
//     : items;

//   return (
//     <div className="dashboard-container">
//       {selectedTable ? (
//         <div>
//           <h2>Tableau de bord</h2>
//           {/* ... Le reste de votre code */}
//           <div className="menu-section">
//             <Categories
//               categories={categories}
//               activeCategory={selectedCategory}
//               filterItems={filterItemsByCategory}
//             />
//             <ul>
//               {filteredItems.map((item) => (
//                 <li
//                   key={item.id}
//                   className={
//                     cart.some((cartItem) => cartItem.id === item.id)
//                       ? "selected"
//                       : ""
//                   }
//                 >
//                   <div className="item-info">
//                     <span className="item-title">{item.title}</span>
//                     <span className="item-price">{item.price}</span>
//                   </div>
//                   <button onClick={() => addToCart(item)}>
//                     Ajouter au panier
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <ul>
//               {cart.map((cartItem) => (
//                 <li key={cartItem.id}>
//                   <div className="cart-item-info">
//                     <span className="cart-item-title">{cartItem.title}</span>
//                     <span className="cart-item-price">{cartItem.price}</span>
//                     <span className="cart-item-quantity">
//                       Quantité : {cartItem.quantity}
//                     </span>
//                   </div>
//                   <button onClick={() => removeFromCart(cartItem)}>
//                     Retirer
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <button onClick={generateKitchenTicket}>
//               Générer Ticket Cuisine
//             </button>
//             <button onClick={generateBarTicket}>Générer Ticket Bar</button>
//             <button onClick={completeOrder}>Terminer Commande</button>
//           </div>
//           <div className="table-orders-section">
//             <h3>Commandes par Table</h3>
//             <div className="table-orders-container">
//               {Array.from({ length: numberOfTables }, (_, index) => (
//                 <TableOrders
//                   key={`table-${index + 1}`}
//                   tableNumber={index + 1}
//                   tableOrders={tableOrders[index + 1] || []}
//                   setTableOrders={(newOrders) =>
//                     setTableOrders({
//                       ...tableOrders,
//                       [index + 1]: newOrders,
//                     })
//                   }
//                   items={items}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <TableSelection onSelect={handleTableSelect} />
//       )}
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";
// import TableSelection from "./TableSelection";
// import TableOrders from "./TableOrders"; // Assurez-vous d'importer correctement le chemin
// import Menu from "./Menu";

// function Dashboard() {
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [items, setItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [tableOrders, setTableOrders] = useState({});
//   const numberOfTables = 50;

//   useEffect(() => {
//     fetch("http://localhost:5000/api/orders")
//       .then((response) => response.json())
//       .then((data) => setOrders(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des commandes", error)
//       );

//     fetch("http://localhost:5000/api/items")
//       .then((response) => response.json())
//       .then((data) => setItems(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des articles", error)
//       );
//   }, []);

//   const handleTableSelect = (tableNumber) => {
//     setSelectedTable(tableNumber);
//   };

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

//   const generateKitchenTicket = () => {
//     console.log("Kitchen Ticket Generated:", cart);
//     setCart([]);
//   };

//   const generateBarTicket = () => {
//     console.log("Bar Ticket Generated:", cart);
//     // Ajouter le contenu de "cart" dans un ticket pour le bar
//     const barTicket = [...cart]; // Créer une copie de cart
//     // Envoyer le ticket au bar (vous pouvez utiliser une API, WebSocket, etc.)
//     console.log("Ticket envoyé au bar:", barTicket);
//   };

//   const completeOrder = () => {
//     if (Object.keys(tableOrders).length === 0) {
//       alert("Veuillez choisir une table avant de terminer la commande.");
//       return;
//     }

//     // Ajouter la commande au tableau des commandes par table
//     const tableNumber = Object.keys(tableOrders)[0]; // Prendre la première clé
//     const currentTableOrders = tableOrders[tableNumber] || [];
//     setTableOrders({
//       ...tableOrders,
//       [tableNumber]: [...currentTableOrders, ...cart],
//     });

//     setCart([]); // Réinitialiser le panier après avoir terminé la commande
//   };

//   const filterItemsByCategory = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredItems = selectedCategory
//     ? items.filter((item) => item.category_id === selectedCategory)
//     : items;

//   return (
//     <div className="dashboard-container">
//       {selectedTable ? (
//         <div>
//           <h2>Tableau de bord</h2>

//           <div className="category-filter">
//             <button
//               onClick={() => filterItemsByCategory(null)}
//               className={selectedCategory === null ? "active" : ""}
//             >
//               Tous
//             </button>
//             <button
//               onClick={() => filterItemsByCategory(1)}
//               className={selectedCategory === 1 ? "active" : ""}
//             >
//               Entrées
//             </button>
//             <button
//               onClick={() => filterItemsByCategory(2)}
//               className={selectedCategory === 2 ? "active" : ""}
//             >
//               Plats
//             </button>
//             <button
//               onClick={() => filterItemsByCategory(3)}
//               className={selectedCategory === 3 ? "active" : ""}
//             >
//               Desserts
//             </button>
//             <button
//               onClick={() => filterItemsByCategory(4)}
//               className={selectedCategory === 4 ? "active" : ""}
//             >
//               Boissons
//             </button>
//           </div>

//           <div className="orders-section">
//             <h3>Commandes en cours</h3>
//             <ul>
//               {orders.map((order) => (
//                 <li key={order.id}>
//                   Commande #{order.id} - Date :{" "}
//                   {new Date(order.order_date).toLocaleString()} - État :{" "}
//                   {order.status}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="menu-section">
//             <h3>Carte</h3>
//             <ul>
//               {filteredItems.map((item) => (
//                 <li
//                   key={item.id}
//                   className={
//                     cart.some((cartItem) => cartItem.id === item.id)
//                       ? "selected"
//                       : ""
//                   }
//                 >
//                   <div className="item-info">
//                     <span className="item-title">{item.title}</span>
//                     <span className="item-price">{item.price}</span>
//                   </div>
//                   <button onClick={() => addToCart(item)}>
//                     Ajouter au panier
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <ul>
//               {cart.map((cartItem) => (
//                 <li key={cartItem.id}>
//                   <div className="cart-item-info">
//                     <span className="cart-item-title">{cartItem.title}</span>
//                     <span className="cart-item-price">{cartItem.price}</span>
//                     <span className="cart-item-quantity">
//                       Quantité : {cartItem.quantity}
//                     </span>
//                   </div>
//                   <button onClick={() => removeFromCart(cartItem)}>
//                     Retirer
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <button onClick={generateKitchenTicket}>
//               Générer Ticket Cuisine
//             </button>
//             <button onClick={generateBarTicket}>Générer Ticket Bar</button>
//             <button onClick={completeOrder}>Terminer Commande</button>
//           </div>

//           {/* Liste des commandes par table */}
//           <div className="table-orders-section">
//             <h3>Commandes par Table</h3>
//             <div className="table-orders-container">
//               {Array.from({ length: numberOfTables }, (_, index) => (
//                 <TableOrders
//                   key={`table-${index + 1}`} // Utiliser une clé unique
//                   tableNumber={index + 1}
//                   tableOrders={tableOrders[index + 1] || []}
//                   setTableOrders={(newOrders) =>
//                     setTableOrders({
//                       ...tableOrders,
//                       [index + 1]: newOrders,
//                     })
//                   }
//                   items={items}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <TableSelection onSelect={handleTableSelect} />
//       )}
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import TableSelection from "./TableSelection";

// const Dashboard = () => {
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [items, setItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Fetch orders and items data here

//     // For example:
//     fetch("/api/orders")
//       .then((response) => response.json())
//       .then((data) => setOrders(data))
//       .catch((error) => console.error("Error fetching orders:", error));

//     fetch("/api/items")
//       .then((response) => response.json())
//       .then((data) => setItems(data))
//       .catch((error) => console.error("Error fetching items:", error));
//   }, [orders, items]);

// const handleTableSelect = (tableNumber) => {
//   setSelectedTable(tableNumber);
// };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div>
//       <h1>Tableau de bord</h1>
//       <TableSelection onSelect={handleTableSelect} />
//       {selectedTable && (
//         <div>
//           <h2>Commande de la table numéro {selectedTable}</h2>
//           <div>
//             <h3>Filtrer par catégorie</h3>
//             <button onClick={() => handleCategorySelect(null)}>Tous</button>
//             <button onClick={() => handleCategorySelect(1)}>Entrées</button>
//             <button onClick={() => handleCategorySelect(2)}>Plats</button>
//             <button onClick={() => handleCategorySelect(3)}>Desserts</button>
//             <button onClick={() => handleCategorySelect(4)}>Boissons</button>
//           </div>
//           <div>
//             {items
//               .filter((item) =>
//                 selectedCategory ? item.category_id === selectedCategory : true
//               )
//               .map((item) => (
//                 <div key={item.id}>
//                   <p>{item.title}</p>
//                   <p>Prix : {item.price} €</p>
//                   {/* Affichez d'autres détails de l'article ici */}
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// *****************************************************************************************
// *************************************************************************************

// // Code du 17/08/2023
// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";
// import TableOrders from "./TableOrders"; // Assurez-vous d'importer correctement le chemin

// function Dashboard() {
//   const [orders, setOrders] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [items, setItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [tableOrders, setTableOrders] = useState({}); // Nouvel état pour les commandes par table
//   const numberOfTables = 10; // Nombre total de tables dans le restaurant

//   useEffect(() => {
//     fetch("http://localhost:5000/api/orders")
//       .then((response) => response.json())
//       .then((data) => setOrders(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des commandes", error)
//       );

//     fetch("http://localhost:5000/api/items")
//       .then((response) => response.json())
//       .then((data) => setItems(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des articles", error)
//       );
//   }, []);

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

//   const generateKitchenTicket = () => {
//     console.log("Kitchen Ticket Generated:", cart);
//     setCart([]);
//   };

//   const generateBarTicket = () => {
//     console.log("Bar Ticket Generated:", cart);
//     // Ajouter le contenu de "cart" dans un ticket pour le bar
//     const barTicket = [...cart]; // Créer une copie de cart
//     // Envoyer le ticket au bar (vous pouvez utiliser une API, WebSocket, etc.)
//     console.log("Ticket envoyé au bar:", barTicket);
//   };

//   const completeOrder = () => {
//     if (Object.keys(tableOrders).length === 0) {
//       alert("Veuillez choisir une table avant de terminer la commande.");
//       return;
//     }

//     // Ajouter la commande au tableau des commandes par table
//     const tableNumber = Object.keys(tableOrders)[0]; // Prendre la première clé
//     const currentTableOrders = tableOrders[tableNumber] || [];
//     setTableOrders({
//       ...tableOrders,
//       [tableNumber]: [...currentTableOrders, ...cart],
//     });

//     setCart([]); // Réinitialiser le panier après avoir terminé la commande
//   };

//   const filterItemsByCategory = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredItems = selectedCategory
//     ? items.filter((item) => item.category_id === selectedCategory)
//     : items;

//   return (
//     <div className="dashboard-container">
//       <h2>Tableau de bord</h2>

//       <div className="category-filter">
//         <button
//           onClick={() => filterItemsByCategory(null)}
//           className={selectedCategory === null ? "active" : ""}
//         >
//           Tous
//         </button>
//         <button
//           onClick={() => filterItemsByCategory(1)}
//           className={selectedCategory === 1 ? "active" : ""}
//         >
//           Entrées
//         </button>
//         <button
//           onClick={() => filterItemsByCategory(2)}
//           className={selectedCategory === 2 ? "active" : ""}
//         >
//           Plats
//         </button>
//         <button
//           onClick={() => filterItemsByCategory(3)}
//           className={selectedCategory === 3 ? "active" : ""}
//         >
//           Desserts
//         </button>
//         <button
//           onClick={() => filterItemsByCategory(4)}
//           className={selectedCategory === 4 ? "active" : ""}
//         >
//           Boissons
//         </button>
//       </div>

//       <div className="orders-section">
//         <h3>Commandes en cours</h3>
//         <ul>
//           {orders.map((order) => (
//             <li key={order.id}>
//               Commande #{order.id} - Date :{" "}
//               {new Date(order.order_date).toLocaleString()} - État :{" "}
//               {order.status}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="menu-section">
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
//         <button onClick={generateKitchenTicket}>Générer Ticket Cuisine</button>
//         <button onClick={generateBarTicket}>Générer Ticket Bar</button>
//         <button onClick={completeOrder}>Terminer Commande</button>
//       </div>

//       {/* Liste des commandes par table */}
//       <div className="table-orders-section">
//         <h3>Commandes par Table</h3>
//         <div className="table-orders-container">
//           {Array.from({ length: numberOfTables }, (_, index) => (
//             <TableOrders
//               key={`table-${index + 1}`} // Utiliser une clé unique
//               tableNumber={index + 1}
//               tableOrders={tableOrders[index + 1] || []}
//               setTableOrders={(newOrders) =>
//                 setTableOrders({
//                   ...tableOrders,
//                   [index + 1]: newOrders,
//                 })
//               }
//               items={items}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// *****************************************************************************************
// *************************************************************************************
// oublies pas que ce code simplifié ne traite que de l'affichage dans la console et de la mise à jour du panier. Dans une application réelle, je dois implémenter les appels API appropriés pour générer les tickets, compléter les commandes et effectuer d'autres opérations nécessaires.

// import React, { useState, useEffect, useContext } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import Categories from "../components/Categories/Categories";
// import logo from "../assets/icons/logo.JPG";
// import { AuthContext } from "../components/Admin/AuthContext";
// import { CartContext } from "../components/Cart/CartContext";
// import Table from "../components/Table/Table";
// import Navigation from "../components/Navigation/Navigation";

// const Dashboard = () => {
//   const { isLoggedIn } = useContext(AuthContext);
//   const [menuItems, setMenuItems] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [filteredItems, setFilteredItems] = useState([]);

//   const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

//   const fetchMenuItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/items");
//       setMenuItems(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des items :", error);
//     }
//   };

//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   useEffect(() => {
//     if (activeCategory === "all") {
//       setFilteredItems(menuItems);
//     } else {
//       const newItems = menuItems.filter(
//         (item) => item.category_id === activeCategory
//       );
//       setFilteredItems(newItems);
//     }
//   }, [activeCategory, menuItems]);

//   if (!isLoggedIn) {
//     return <Navigate to="/LogAdmin" />;
//   }

//   return (
//     <div>
//       <Navigation />
//       <main>
//         <section className="menu section">
//           <div className="title">
//             <img src={logo} alt="logo" className="logo" />
//             <h2>Resto App</h2>
//             <div className="underline"></div>
//           </div>
//           <Categories
//             categories={[
//               { id: "all", name: "Tout" },
//               { id: 1, name: "Entrées" },
//               { id: 2, name: "Plats" },
//               { id: 3, name: "Desserts" },
//               { id: 4, name: "Boissons" },
//             ]}
//             activeCategory={activeCategory}
//             filterItems={setActiveCategory}
//           />
//           <div className="table-container">
//             <Table
//               items={filteredItems}
//               cartItems={cartItems}
//               addToCart={addToCart}
//               removeFromCart={removeFromCart}
//             />
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
