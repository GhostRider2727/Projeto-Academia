const { Matricula, Aluno, Plano } = require('../models');

exports.listarMatriculas = async (req, res) => {
  try {
    const matriculas = await Matricula.findAll({
      include: [
        { model: Aluno, attributes: ['id', 'nome'] },
        { model: Plano, attributes: ['id', 'nome'] }
      ],
      order: [['data_inicio', 'DESC']]
    });
    res.json(matriculas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar matrículas." });
  }
};

exports.buscarMatricula = async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id, {
      include: [
        { model: Aluno, attributes: ['id', 'nome'] },
        { model: Plano, attributes: ['id', 'nome'] }
      ]
    });
    if (!matricula) return res.status(404).json({ error: "Matrícula não encontrada." });
    res.json(matricula);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar matrícula." });
  }
};

exports.criarMatricula = async (req, res) => {
  try {
    const novaMatricula = await Matricula.create(req.body);
    res.status(201).json(novaMatricula);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar matrícula." });
  }
};

exports.atualizarMatricula = async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id);
    if (!matricula) return res.status(404).json({ error: "Matrícula não encontrada." });
    await matricula.update(req.body);
    res.json(matricula);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar matrícula." });
  }
};

exports.excluirMatricula = async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id);
    if (!matricula) return res.status(404).json({ error: "Matrícula não encontrada." });
    await matricula.destroy();
    res.json({ message: "Matrícula excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir matrícula." });
  }
};