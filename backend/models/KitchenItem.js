const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const OrderItem = require("./OrderItem");

const KitchenItem = sequelize.define("kitchen_items", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  order_item_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "order_items",
      key: "id",
    },
  },
});

module.exports = KitchenItem;
