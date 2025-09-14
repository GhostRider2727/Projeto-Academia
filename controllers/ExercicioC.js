const { Exercicio, Maquina } = require('../models');

exports.listarExercicios = async (req, res) => {
  try {
    const exercicios = await Exercicio.findAll({
      include: [{ model: Maquina }],
      order: [['nome', 'ASC']]
    });
    res.json(exercicios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar exercícios." });
  }
};

exports.buscarExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByPk(req.params.id, {
      include: [{ model: Maquina }]
    });
    if (!exercicio) return res.status(404).json({ error: "Exercício não encontrado." });
    res.json(exercicio);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar exercício." });
  }
};

exports.criarExercicio = async (req, res) => {
  try {
    const novoExercicio = await Exercicio.create(req.body);
    res.status(201).json(novoExercicio);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar exercício." });
  }
};

exports.atualizarExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByPk(req.params.id);
    if (!exercicio) return res.status(404).json({ error: "Exercício não encontrado." });
    await exercicio.update(req.body);
    res.json(exercicio);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar exercício." });
  }
};

exports.excluirExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByPk(req.params.id);
    if (!exercicio) return res.status(404).json({ error: "Exercício não encontrado." });
    await exercicio.destroy();
    res.json({ message: "Exercício excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir exercício." });
  }
};