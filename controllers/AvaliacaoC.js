const { AvaliacaoFisica, Aluno } = require('../models');

// Listar todas as avaliações
exports.listarAvaliacoes = async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoFisica.findAll({
      include: [{ model: Aluno, attributes: ['id', 'nome'] }],
      order: [['data_avaliacao', 'DESC']]
    });
    res.json(avaliacoes);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    res.status(500).json({ error: "Não foi possível buscar as avaliações." });
  }
};

// Buscar avaliação por ID
exports.buscarAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const avaliacao = await AvaliacaoFisica.findByPk(id, {
      include: [{ model: Aluno, attributes: ['id', 'nome'] }]
    });
    
    if (!avaliacao) {
      return res.status(404).json({ error: "Avaliação não encontrada." });
    }
    
    res.json(avaliacao);
  } catch (error) {
    console.error("Erro ao buscar avaliação:", error);
    res.status(500).json({ error: "Não foi possível buscar a avaliação." });
  }
};

// Criar nova avaliação
exports.criarAvaliacao = async (req, res) => {
  try {
    const { id_aluno, peso_kg, altura_m, imc, observacoes } = req.body;
    
    // Validação básica
    if (!id_aluno) {
      return res.status(400).json({ error: "id_aluno é obrigatório." });
    }
    
    const novaAvaliacao = await AvaliacaoFisica.create({ 
      id_aluno, peso_kg, altura_m, imc, observacoes 
    });
    
    res.status(201).json(novaAvaliacao);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ error: "Não foi possível criar a avaliação." });
  }
};

// Atualizar avaliação
exports.atualizarAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_aluno, peso_kg, altura_m, imc, observacoes } = req.body;

    const avaliacao = await AvaliacaoFisica.findByPk(id);
    if (!avaliacao) {
      return res.status(404).json({ error: "Avaliação não encontrada." });
    }

    await avaliacao.update({ id_aluno, peso_kg, altura_m, imc, observacoes });
    res.json(avaliacao);
  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error);
    res.status(500).json({ error: "Não foi possível atualizar a avaliação." });
  }
};

// Excluir avaliação
exports.excluirAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const avaliacao = await AvaliacaoFisica.findByPk(id);
    
    if (!avaliacao) {
      return res.status(404).json({ error: "Avaliação não encontrada." });
    }

    await avaliacao.destroy();
    res.json({ message: "Avaliação excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir avaliação:", error);
    res.status(500).json({ error: "Não foi possível excluir a avaliação." });
  }
};