const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');

const Avaliacao = sequelize.define('Avaliacao', {
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
  data_avaliacao: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  peso_kg: {
    type: DataTypes.DECIMAL(5, 2)
  },
  altura_m: {
    type: DataTypes.DECIMAL(3, 2)
  },
  imc: {
    type: DataTypes.DECIMAL(5, 2)
  },
  observacoes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'avaliacoes_fisicas',
  timestamps: false
});

// Definição das associações
Avaliacao.belongsTo(Aluno, { foreignKey: 'id_aluno' });
Aluno.hasMany(Avaliacao, { foreignKey: 'id_aluno' });

module.exports = Avaliacao;