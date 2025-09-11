cosnt Aluno = require('../models/Aluno');
export const aluno = async (req, res) => {
    try {
        const alunos = await Aluno.findAll();

        // ROTA CREATE – Inserir aluno (POST)
app.post('/alunos', async (req, res) => {
  try {
    const { nome, email, data_nascimento, telefone, senha } = req.body;
    const novoAluno = await Aluno.create({ nome, email, data_nascimento, telefone, senha });
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Não foi possível criar o aluno." });
  }
});
//ROTA READ – Listar todos os alunos (GET)
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Não foi possível buscar os alunos." });
  }
});
//ROTA READ – Buscar aluno por ID (GET)
app.get('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    res.status(500).json({ error: "Não foi possível buscar o aluno." });
  }
});
//ROTA UPDATE – Atualizar aluno (PUT)
app.put('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, data_nascimento, telefone, senha } = req.body;

    const aluno = await Aluno.findByPk(id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });

    await aluno.update({ nome, email, data_nascimento, telefone, senha });
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Não foi possível atualizar o aluno." });
  }
});
//ROTA DELETE – Excluir aluno (DELETE)
app.delete('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });

    await aluno.destroy();
    res.json({ message: "Aluno excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    res.status(500).json({ error: "Não foi possível excluir o aluno." });
  }
});

// Criar aluno
app.post('/alunos', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoAluno = await Aluno.create({ nome, email });
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Não foi possível criar o aluno." });
  }
});

// Listar alunos
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Não foi possível buscar os alunos." });
  }
});

// Buscar aluno por ID
app.get('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    res.status(500).json({ error: "Não foi possível buscar o aluno." });
  }
});
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