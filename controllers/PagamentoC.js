const { Pagamento, Aluno, Plano } = require('../models');

exports.listarPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      include: [
        { model: Aluno, attributes: ['id', 'nome'] },
        { model: Plano, attributes: ['id', 'nome'] }
      ],
      order: [['data_pagamento', 'DESC']]
    });
    res.json(pagamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamentos." });
  }
};

exports.buscarPagamento = async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id, {
      include: [
        { model: Aluno, attributes: ['id', 'nome'] },
        { model: Plano, attributes: ['id', 'nome'] }
      ]
    });
    if (!pagamento) return res.status(404).json({ error: "Pagamento não encontrado." });
    res.json(pagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamento." });
  }
};

exports.criarPagamento = async (req, res) => {
  try {
    const novoPagamento = await Pagamento.create(req.body);
    res.status(201).json(novoPagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pagamento." });
  }
};

exports.atualizarPagamento = async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id);
    if (!pagamento) return res.status(404).json({ error: "Pagamento não encontrado." });
    await pagamento.update(req.body);
    res.json(pagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pagamento." });
  }
};

exports.excluirPagamento = async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id);
    if (!pagamento) return res.status(404).json({ error: "Pagamento não encontrado." });
    await pagamento.destroy();
    res.json({ message: "Pagamento excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir pagamento." });
  }
};