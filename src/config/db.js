const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // nome do banco
  process.env.DB_USER, // usuário
  process.env.DB_PASSWORD, // senha
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, // tira os logs do Sequelize
  }
);

module.exports = sequelize;
