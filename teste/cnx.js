const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para usar variáveis de ambiente

const sequelize = new Sequelize(
  process.env.DB_NAME || 'app_academia',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Testar a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com PostgreSQL estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao PostgreSQL:', err);
  });

module.exports = sequelize;