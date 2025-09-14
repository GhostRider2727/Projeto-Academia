const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Instrutor = sequelize.define('Instrutor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'instrutores',
  timestamps: false
});

module.exports = Instrutor;