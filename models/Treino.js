const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Instrutor = require('./Instrutor');

const Treino = sequelize.define('Treino', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Aluno,
      key: 'id'
    }
  },
  instrutor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Instrutor,
      key: 'id'
    }
  },
  data_criacao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  objetivo: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'treinos',
  timestamps: false
});

// Definição das associações
Treino.belongsTo(Aluno, { foreignKey: 'aluno_id' });
Treino.belongsTo(Instrutor, { foreignKey: 'instrutor_id' });
Aluno.hasMany(Treino, { foreignKey: 'aluno_id' });
Instrutor.hasMany(Treino, { foreignKey: 'instrutor_id' });

module.exports = Treino;