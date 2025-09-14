const express = require('express');
const router = express.Router();
const PagamentoC = require('../controllers/PagamentoC');

router.get('/', PagamentoC.listarPagamentos);
router.get('/:id', PagamentoC.buscarPagamento);
router.post('/', PagamentoC.criarPagamento);
router.put('/:id', PagamentoC.atualizarPagamento);
router.delete('/:id', PagamentoC.excluirPagamento);

module.exports = router;