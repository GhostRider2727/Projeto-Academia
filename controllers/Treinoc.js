const { Treino, Aluno, Instrutor } = require('../models');

// Listar todos os treinos
exports.listarTreinos = async (req, res) => {
  try {
    const treinos = await Treino.findAll({
      include: [
        { model: Aluno, attributes: ['id', 'nome'] },
        { model: Instrutor, attributes: ['id', 'nome'] }
      ],
      order: [['data_criacao', 'DESC']]
    });
    res.json(treinos);
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    res.status(500).json({ error: "Não foi possível buscar os treinos." });
  }
};

// Buscar treino por ID
exports.buscarTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const treino = await Treino.findByPk(id, {
      include: [
        { model: Aluno, attributes: ['id', 'nome'] },
        { model: Instrutor, attributes: ['id', 'nome'] }
      ]
    });
    
    if (!treino) {
      return res.status(404).json({ error: "Treino não encontrado." });
    }
    
    res.json(treino);
  } catch (error) {
    console.error("Erro ao buscar treino:", error);
    res.status(500).json({ error: "Não foi possível buscar o treino." });
  }
};

// Criar novo treino
exports.criarTreino = async (req, res) => {
  try {
    const { aluno_id, instrutor_id, objetivo } = req.body;
    
    // Validação básica
    if (!aluno_id || !instrutor_id) {
      return res.status(400).json({ error: "aluno_id e instrutor_id são obrigatórios." });
    }
    
    const novoTreino = await Treino.create({ 
      aluno_id, instrutor_id, objetivo 
    });
    
    res.status(201).json(novoTreino);
  } catch (error) {
    console.error("Erro ao criar treino:", error);
    res.status(500).json({ error: "Não foi possível criar o treino." });
  }
};

// Atualizar treino
exports.atualizarTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const { aluno_id, instrutor_id, objetivo } = req.body;

    const treino = await Treino.findByPk(id);
    if (!treino) {
      return res.status(404).json({ error: "Treino não encontrado." });
    }

    await treino.update({ aluno_id, instrutor_id, objetivo });
    res.json(treino);
  } catch (error) {
    console.error("Erro ao atualizar treino:", error);
    res.status(500).json({ error: "Não foi possível atualizar o treino." });
  }
};

// Excluir treino
exports.excluirTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const treino = await Treino.findByPk(id);
    
    if (!treino) {
      return res.status(404).json({ error: "Treino não encontrado." });
    }

    await treino.destroy();
    res.json({ message: "Treino excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir treino:", error);
    res.status(500).json({ error: "Não foi possível excluir o treino." });
  }
};