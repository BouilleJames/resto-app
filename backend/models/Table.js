const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Table = sequelize.define("tables", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tableNumber: {
    // Utiliser le même nom que dans la migration
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalCovers: {
    // Utiliser le même nom que dans la migration
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("occupied", "libre"),
    allowNull: false,
    defaultValue: "libre",
  },
});

module.exports = Table;
