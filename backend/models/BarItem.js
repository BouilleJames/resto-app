const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const BarItem = sequelize.define("bar_items", {
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

module.exports = BarItem;
