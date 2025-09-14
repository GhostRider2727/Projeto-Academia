const { Instrutor } = require('../models');

// Listar todos os instrutores
exports.listarInstrutores = async (req, res) => {
  try {
    const instrutores = await Instrutor.findAll({
      order: [['nome', 'ASC']]
    });
    res.json(instrutores);
  } catch (error) {
    console.error("Erro ao buscar instrutores:", error);
    res.status(500).json({ error: "Não foi possível buscar os instrutores." });
  }
};

// Buscar instrutor por ID
exports.buscarInstrutor = async (req, res) => {
  try {
    const { id } = req.params;
    const instrutor = await Instrutor.findByPk(id);
    
    if (!instrutor) {
      return res.status(404).json({ error: "Instrutor não encontrado." });
    }
    
    res.json(instrutor);
  } catch (error) {
    console.error("Erro ao buscar instrutor:", error);
    res.status(500).json({ error: "Não foi possível buscar o instrutor." });
  }
};

// Criar novo instrutor
exports.criarInstrutor = async (req, res) => {
  try {
    const { nome, email, telefone, senha } = req.body;
    
    // Validação básica
    if (!nome || !email || !telefone || !senha) {
      return res.status(400).json({ error: "Nome, email, telefone e senha são obrigatórios." });
    }
    
    const novoInstrutor = await Instrutor.create({ 
      nome, email, telefone, senha 
    });
    
    res.status(201).json(novoInstrutor);
  } catch (error) {
    console.error("Erro ao criar instrutor:", error);
    res.status(500).json({ error: "Não foi possível criar o instrutor." });
  }
};

// Atualizar instrutor
exports.atualizarInstrutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;

    const instrutor = await Instrutor.findByPk(id);
    if (!instrutor) {
      return res.status(404).json({ error: "Instrutor não encontrado." });
    }

    await instrutor.update({ nome, email, telefone, senha });
    res.json(instrutor);
  } catch (error) {
    console.error("Erro ao atualizar instrutor:", error);
    res.status(500).json({ error: "Não foi possível atualizar o instrutor." });
  }
};

// Excluir instrutor
exports.excluirInstrutor = async (req, res) => {
  try {
    const { id } = req.params;
    const instrutor = await Instrutor.findByPk(id);
    
    if (!instrutor) {
      return res.status(404).json({ error: "Instrutor não encontrado." });
    }

    await instrutor.destroy();
    res.json({ message: "Instrutor excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir instrutor:", error);
    res.status(500).json({ error: "Não foi possível excluir o instrutor." });
  }
};