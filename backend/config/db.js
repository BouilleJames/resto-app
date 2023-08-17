// Code de connexion à la base de données avec Sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize("app_resto", "db_user", "db_password", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;

// Dernier code de connexion à la base de données avant de passer à Sequelize
// const dotenv = require("dotenv");
// dotenv.config();

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// const promisePool = pool.promise();

// module.exports = { pool, promisePool }; // Exporter les deux pools
