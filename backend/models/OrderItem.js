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
  },
  item_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("en_cours", "prete", "annulee"),
    allowNull: false,
    defaultValue: "en_cours",
  },
});

module.exports = OrderItem;
