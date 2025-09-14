const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Treino = require('./Treino');
const Exercicio = require('./Exercicio');

const TreinoExercicio = sequelize.define('TreinoExercicio', {
  treino_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Treino,
      key: 'id'
    }
  },
  exercicio_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Exercicio,
      key: 'id'
    }
  },
  series: {
    type: DataTypes.INTEGER
  },
  repeticoes: {
    type: DataTypes.INTEGER
  },
  carga_kg: {
    type: DataTypes.DECIMAL(5, 2)
  }
}, {
  tableName: 'treino_exercicio',
  timestamps: false
});

// Definição das associações
TreinoExercicio.belongsTo(Treino, { foreignKey: 'treino_id' });
TreinoExercicio.belongsTo(Exercicio, { foreignKey: 'exercicio_id' });
Treino.hasMany(TreinoExercicio, { foreignKey: 'treino_id' });
Exercicio.hasMany(TreinoExercicio, { foreignKey: 'exercicio_id' });

module.exports = TreinoExercicio;