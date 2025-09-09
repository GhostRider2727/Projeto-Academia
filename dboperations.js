// dbOperations.js
const {
  Aluno, Instrutor, Treino, Plano, Matricula,
  Local, Academia, Maquina, Exercicio, TreinoExercicio,
  AvaliacaoFisica, Pagamento, PostTimeline, CurtidaPost
} = require('./db');

// Funções genéricas para qualquer modelo
const createRecord = (Model) => async (data) => {
  try {
    return await Model.create(data);
  } catch (error) {
    throw new Error(`Erro ao criar registro: ${error.message}`);
  }
};

const findAllRecords = (Model) => async (include = []) => {
  try {
    return await Model.findAll({ include });
  } catch (error) {
    throw new Error(`Erro ao buscar registros: ${error.message}`);
  }
};

const findRecordById = (Model) => async (id, include = []) => {
  try {
    const record = await Model.findByPk(id, { include });
    if (!record) throw new Error('Registro não encontrado');
    return record;
  } catch (error) {
    throw new Error(`Erro ao buscar registro: ${error.message}`);
  }
};

const updateRecord = (Model) => async (id, data) => {
  try {
    const record = await Model.findByPk(id);
    if (!record) throw new Error('Registro não encontrado');
    return await record.update(data);
  } catch (error) {
    throw new Error(`Erro ao atualizar registro: ${error.message}`);
  }
};

const deleteRecord = (Model) => async (id) => {
  try {
    const record = await Model.findByPk(id);
    if (!record) throw new Error('Registro não encontrado');
    await record.destroy();
    return { message: 'Registro excluído com sucesso' };
  } catch (error) {
    throw new Error(`Erro ao excluir registro: ${error.message}`);
  }
};

// Exportar funções específicas para cada modelo
module.exports = {
  // Operações para Aluno
  createAluno: createRecord(Aluno),
  getAlunos: findAllRecords(Aluno),
  getAlunoById: findRecordById(Aluno),
  updateAluno: updateRecord(Aluno),
  deleteAluno: deleteRecord(Aluno),

  // Operações para Instrutor
  createInstrutor: createRecord(Instrutor),
  getInstrutores: findAllRecords(Instrutor),
  // ... adicione outras operações para Instrutor

  // Operações para Treino
  createTreino: createRecord(Treino),
  getTreinos: findAllRecords(Treino),
  getTreinoById: findRecordById(Treino),
  // ... adicione outras operações para Treino

  // Adicione outras operações para os demais modelos...
};