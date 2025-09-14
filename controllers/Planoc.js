const { Plano } = require('../models');

exports.listarPlanos = async (req, res) => {
  try {
    const planos = await Plano.findAll({ order: [['preco', 'ASC']] });
    res.json(planos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar planos." });
  }
};

exports.buscarPlano = async (req, res) => {
  try {
    const plano = await Plano.findByPk(req.params.id);
    if (!plano) return res.status(404).json({ error: "Plano não encontrado." });
    res.json(plano);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar plano." });
  }
};

exports.criarPlano = async (req, res) => {
  try {
    const novoPlano = await Plano.create(req.body);
    res.status(201).json(novoPlano);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar plano." });
  }
};

exports.atualizarPlano = async (req, res) => {
  try {
    const plano = await Plano.findByPk(req.params.id);
    if (!plano) return res.status(404).json({ error: "Plano não encontrado." });
    await plano.update(req.body);
    res.json(plano);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar plano." });
  }
};

exports.excluirPlano = async (req, res) => {
  try {
    const plano = await Plano.findByPk(req.params.id);
    if (!plano) return res.status(404).json({ error: "Plano não encontrado." });
    await plano.destroy();
    res.json({ message: "Plano excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir plano." });
  }
};