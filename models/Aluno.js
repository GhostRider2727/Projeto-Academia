cosnt Aluno = require('../controllers/Aluno');

// Aluno
const Aluno = sequelize.define('Aluno', {
  nome: { type: DataTypes.STRING, allowNull: false },
  data_nascimento: { type: DataTypes.DATEONLY, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  telefone: { type: DataTypes.STRING },
  senha: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { tableName: 'alunos', timestamps: false });
// Exportar funções específicas para cada modelo
module.exports = {
  // Operações para Aluno
  createAluno: createRecord(Aluno),
  getAlunos: findAllRecords(Aluno),
  getAlunoById: findRecordById(Aluno),
  updateAluno: updateRecord(Aluno),
  deleteAluno: deleteRecord(Aluno),

