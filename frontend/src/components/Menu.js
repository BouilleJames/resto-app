import React from "react";
import Categories from "./Categories"; // Assurez-vous d'importer correctement le chemin

const Menu = ({ categories, activeCategory, filterItems }) => {
  return (
    <section className="menu">
      <h2>Menu</h2>
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        filterItems={filterItems}
      />
    </section>
  );
};

export default Menu;
