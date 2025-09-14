// models/Pagamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Plano = require('./Plano');

const Pagamento = sequelize.define('Pagamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_aluno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Aluno,
      key: 'id'
    }
  },
  id_plano: {
    type: DataTypes.INTEGER,
    references: {
      model: Plano,
      key: 'id'
    }
  },
  data_pagamento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  metodo_pagamento: {
    type: DataTypes.ENUM('pix', 'cartao', 'boleto'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
    allowNull: false
  },
  valor_pago: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  codigo_transacao: {
    type: DataTypes.TEXT
  },
  observacoes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'pagamentos',
  timestamps: false
});

// Associações
Pagamento.belongsTo(Aluno, { foreignKey: 'id_aluno' });
Pagamento.belongsTo(Plano, { foreignKey: 'id_plano' });
Aluno.hasMany(Pagamento, { foreignKey: 'id_aluno' });
Plano.hasMany(Pagamento, { foreignKey: 'id_plano' });

module.exports = Pagamento;