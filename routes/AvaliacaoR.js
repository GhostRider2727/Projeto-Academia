const express = require('express');
const router = express.Router();
const AvaliacaoC = require('../controllers/AvaliacaoC');

// Rotas para Avaliações Físicas
router.get('/', AvaliacaoC.listarAvaliacoes);
router.get('/:id', AvaliacaoC.buscarAvaliacao);
router.post('/', AvaliacaoC.criarAvaliacao);
router.put('/:id', AvaliacaoC.atualizarAvaliacao);
router.delete('/:id', AvaliacaoC.excluirAvaliacao);

module.exports = router;