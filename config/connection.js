const Sequelize = require('sequelize');
const clog = require('clog');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

if (!sequelize) {
  clog.warn("No sequelize connection could be made to the database.");
}

module.exports = sequelize;
