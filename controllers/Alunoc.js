const { Aluno } = require('../models');

// Listar todos os alunos
exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      order: [['nome', 'ASC']]
    });
    res.json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Não foi possível buscar os alunos." });
  }
};

// Buscar aluno por ID
exports.buscarAluno = async (req, res) => {
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
};

// Criar novo aluno
exports.criarAluno = async (req, res) => {
  try {
    const { nome, data_nascimento, email, telefone, senha } = req.body;
    
    // Validação básica
    if (!nome || !data_nascimento || !email || !senha) {
      return res.status(400).json({ error: "Nome, data_nascimento, email e senha são obrigatórios." });
    }
    
    const novoAluno = await Aluno.create({ 
      nome, data_nascimento, email, telefone, senha 
    });
    
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Não foi possível criar o aluno." });
  }
};

// Atualizar aluno
exports.atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, data_nascimento, email, telefone, senha } = req.body;

    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    await aluno.update({ nome, data_nascimento, email, telefone, senha });
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Não foi possível atualizar o aluno." });
  }
};

// Excluir aluno
exports.excluirAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);
    
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    await aluno.destroy();
    res.json({ message: "Aluno excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    res.status(500).json({ error: "Não foi possível excluir o aluno." });
  }
};