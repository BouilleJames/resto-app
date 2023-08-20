const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Client = sequelize.define("clients", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  table_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "tables",
      key: "id",
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalCovers: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Client;
