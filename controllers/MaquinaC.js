const { Maquina, Academia } = require('../models');

exports.listarMaquinas = async (req, res) => {
  try {
    const maquinas = await Maquina.findAll({
      include: [{ model: Academia }],
      order: [['nome', 'ASC']]
    });
    res.json(maquinas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar máquinas." });
  }
};

exports.buscarMaquina = async (req, res) => {
  try {
    const maquina = await Maquina.findByPk(req.params.id, {
      include: [{ model: Academia }]
    });
    if (!maquina) return res.status(404).json({ error: "Máquina não encontrada." });
    res.json(maquina);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar máquina." });
  }
};

exports.criarMaquina = async (req, res) => {
  try {
    const novaMaquina = await Maquina.create(req.body);
    res.status(201).json(novaMaquina);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar máquina." });
  }
};

exports.atualizarMaquina = async (req, res) => {
  try {
    const maquina = await Maquina.findByPk(req.params.id);
    if (!maquina) return res.status(404).json({ error: "Máquina não encontrada." });
    await maquina.update(req.body);
    res.json(maquina);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar máquina." });
  }
};

exports.excluirMaquina = async (req, res) => {
  try {
    const maquina = await Maquina.findByPk(req.params.id);
    if (!maquina) return res.status(404).json({ error: "Máquina não encontrada." });
    await maquina.destroy();
    res.json({ message: "Máquina excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir máquina." });
  }
};