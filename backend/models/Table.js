const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Table = sequelize.define("tables", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  table_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total_covers: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Table;
