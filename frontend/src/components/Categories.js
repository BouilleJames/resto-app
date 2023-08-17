import React from "react";

const Categories = ({ categories, activeCategory, filterItems }) => {
  return (
    <div className="btn-container">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-btn ${
            activeCategory === category.id ? "active-btn" : ""
          }`}
          onClick={() => filterItems(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;

// // code fonctionnel :)
// import React from "react";

// const Categories = ({ categories, filterItems, activeCategory }) => {
//   return (
//     <div className="btn-container">
//       {categories.map((category, index) => {
//         return (
//           <button
//             type="button"
//             className={`${
//               activeCategory === category ? "filter-btn active" : "filter-btn"
//             }`}
//             key={index}
//             onClick={() => filterItems(category)}
//           >
//             {category}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// export default Categories;

// import React from "react";

// const Categories = ({ categories, filterItems, activeCategory }) => {
//   return (
//     <div className="btn-container">
//       {categories.map((category) => {
//         return (
//           <button
//             type="button"
//             className={`${
//               activeCategory === category.id
//                 ? "filter-btn active"
//                 : "filter-btn"
//             }`}
//             key={category.id}
//             onClick={() => filterItems(category.id)}
//           >
//             {category.name}
//           </button>
//         );
//       })}
//     </div>
//   );
// };
// export default Categories;
