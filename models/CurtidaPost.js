const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const PostTimeline = require('./PostTimeline');
const Aluno = require('./Aluno');

const CurtidaPost = sequelize.define('CurtidaPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_post: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PostTimeline,
      key: 'id'
    }
  },
  id_aluno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Aluno,
      key: 'id'
    }
  },
  curtido_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'curtidas_post',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id_post', 'id_aluno']
    }
  ]
});

CurtidaPost.belongsTo(PostTimeline, { foreignKey: 'id_post' });
CurtidaPost.belongsTo(Aluno, { foreignKey: 'id_aluno' });
PostTimeline.hasMany(CurtidaPost, { foreignKey: 'id_post' });
Aluno.hasMany(CurtidaPost, { foreignKey: 'id_aluno' });

module.exports = CurtidaPost;