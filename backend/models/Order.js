const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  table_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "tables",
      key: "id",
    },
  },
  order_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  status: {
    type: Sequelize.ENUM("en_cours", "terminee", "annulee"),
    allowNull: false,
    defaultValue: "en_cours",
  },
});

module.exports = Order;
