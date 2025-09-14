const { Local } = require('../models');

exports.listarLocais = async (req, res) => {
  try {
    const locais = await Local.findAll({ order: [['cidade', 'ASC']] });
    res.json(locais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar locais." });
  }
};

exports.buscarLocal = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) return res.status(404).json({ error: "Local não encontrado." });
    res.json(local);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar local." });
  }
};

exports.criarLocal = async (req, res) => {
  try {
    const novoLocal = await Local.create(req.body);
    res.status(201).json(novoLocal);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar local." });
  }
};

exports.atualizarLocal = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) return res.status(404).json({ error: "Local não encontrado." });
    await local.update(req.body);
    res.json(local);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar local." });
  }
};

exports.excluirLocal = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) return res.status(404).json({ error: "Local não encontrado." });
    await local.destroy();
    res.json({ message: "Local excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir local." });
  }
};