const express = require('express');
const router = express.Router();
const TreinoC = require('../controllers/TreinoC');

// Rotas para Treinos
router.get('/', TreinoC.listarTreinos);
router.get('/:id', TreinoC.buscarTreino);
router.post('/', TreinoC.criarTreino);
router.put('/:id', TreinoC.atualizarTreino);
router.delete('/:id', TreinoC.excluirTreino);

module.exports = router;