// db.js
const { Sequelize, DataTypes } = require('sequelize');


// Conexão com PostgreSQL
const sequelize = new Sequelize('app_academia', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});
