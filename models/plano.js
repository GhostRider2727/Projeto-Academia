const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plano = sequelize.define('Plano', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  preco: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  duracao: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }

}, {
  tableName: 'planos',
  timestamps: false
});

module.exports = Plano;