const { Academia, Local } = require('../models');

exports.listarAcademias = async (req, res) => {
  try {
    const academias = await Academia.findAll({
      include: [{ model: Local }],
      order: [['nome', 'ASC']]
    });
    res.json(academias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar academias." });
  }
};

exports.buscarAcademia = async (req, res) => {
  try {
    const academia = await Academia.findByPk(req.params.id, {
      include: [{ model: Local }]
    });
    if (!academia) return res.status(404).json({ error: "Academia não encontrada." });
    res.json(academia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar academia." });
  }
};

exports.criarAcademia = async (req, res) => {
  try {
    const novaAcademia = await Academia.create(req.body);
    res.status(201).json(novaAcademia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar academia." });
  }
};

exports.atualizarAcademia = async (req, res) => {
  try {
    const academia = await Academia.findByPk(req.params.id);
    if (!academia) return res.status(404).json({ error: "Academia não encontrada." });
    await academia.update(req.body);
    res.json(academia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar academia." });
  }
};

exports.excluirAcademia = async (req, res) => {
  try {
    const academia = await Academia.findByPk(req.params.id);
    if (!academia) return res.status(404).json({ error: "Academia não encontrada." });
    await academia.destroy();
    res.json({ message: "Academia excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir academia." });
  }
};