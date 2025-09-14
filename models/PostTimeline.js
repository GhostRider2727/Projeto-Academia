const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PostTimeline = sequelize.define('PostTimeline', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  autor_tipo: {
    type: DataTypes.ENUM('sistema', 'instrutor'),
    allowNull: false
  },
  id_autor: {
    type: DataTypes.INTEGER
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  midia_url: {
    type: DataTypes.TEXT
  },
  data_postagem: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'posts_timeline',
  timestamps: false
});

module.exports = PostTimeline;