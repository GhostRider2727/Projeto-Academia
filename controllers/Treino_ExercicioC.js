const { TreinoExercicio, Treino, Exercicio } = require('../models');

exports.listarTreinoExercicios = async (req, res) => {
  try {
    const treinoExercicios = await TreinoExercicio.findAll({
      include: [
        { model: Treino, attributes: ['id'] },
        { model: Exercicio, attributes: ['id', 'nome'] }
      ]
    });
    res.json(treinoExercicios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar treino exercícios." });
  }
};

exports.buscarTreinoExercicio = async (req, res) => {
  try {
    const { treino_id, exercicio_id } = req.params;
    const treinoExercicio = await TreinoExercicio.findOne({
      where: { treino_id, exercicio_id },
      include: [
        { model: Treino, attributes: ['id'] },
        { model: Exercicio, attributes: ['id', 'nome'] }
      ]
    });
    if (!treinoExercicio) return res.status(404).json({ error: "Treino exercício não encontrado." });
    res.json(treinoExercicio);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar treino exercício." });
  }
};

exports.criarTreinoExercicio = async (req, res) => {
  try {
    const novoTreinoExercicio = await TreinoExercicio.create(req.body);
    res.status(201).json(novoTreinoExercicio);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar treino exercício." });
  }
};

exports.atualizarTreinoExercicio = async (req, res) => {
  try {
    const { treino_id, exercicio_id } = req.params;
    const treinoExercicio = await TreinoExercicio.findOne({
      where: { treino_id, exercicio_id }
    });
    if (!treinoExercicio) return res.status(404).json({ error: "Treino exercício não encontrado." });
    await treinoExercicio.update(req.body);
    res.json(treinoExercicio);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar treino exercício." });
  }
};

exports.excluirTreinoExercicio = async (req, res) => {
  try {
    const { treino_id, exercicio_id } = req.params;
    const treinoExercicio = await TreinoExercicio.findOne({
      where: { treino_id, exercicio_id }
    });
    if (!treinoExercicio) return res.status(404).json({ error: "Treino exercício não encontrado." });
    await treinoExercicio.destroy();
    res.json({ message: "Treino exercício excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir treino exercício." });
  }
};