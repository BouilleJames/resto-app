const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define("categories", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;
