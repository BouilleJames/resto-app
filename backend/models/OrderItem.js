const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const OrderItem = sequelize.define("order_items", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "orders",
      key: "id",
    },
  },
  item_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "items",
      key: "id",
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("en_cours", "terminee", "annulee"),
    allowNull: false,
    defaultValue: "en_cours",
  },
});

module.exports = OrderItem;
