const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Academia = sequelize.define('Academia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
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
    type: DataTypes.STRING(15)
  },
  senha: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'academias',
  timestamps: false
});

module.exports = Academia;