const sequelize = require('../config/database');

// Importar todos os models
const Aluno = require('./Aluno');
const Instrutor = require('./Instrutor');
const Treino = require('./Treino');
const Plano = require('./Plano');
const Matricula = require('./Matricula');
const Local = require('./Local');
const Academia = require('./Academia');
const Maquina = require('./Maquina');
const Exercicio = require('./Exercicio');
const TreinoExercicio = require('./TreinoExercicio');
const Avaliacao = require('./Avaliacao');
const Pagamento = require('./Pagamento');
const PostTimeline = require('./PostTimeline');
const CurtidaPost = require('./CurtidaPost');

// Exportar todos os models
module.exports = {
  sequelize,
  Aluno,
  Instrutor,
  Treino,
  Plano,
  Matricula,
  Local,
  Academia,
  Maquina,
  Exercicio,
  TreinoExercicio,
  Avaliacao,
  Pagamento,
  PostTimeline,
  CurtidaPost
};