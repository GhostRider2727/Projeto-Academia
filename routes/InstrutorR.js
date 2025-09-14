const express = require('express');
const router = express.Router();
const InstrutorC = require('../controllers/InstrutorC');

// Rotas para Instrutores
router.get('/', InstrutorC.listarInstrutores);
router.get('/:id', InstrutorC.buscarInstrutor);
router.post('/', InstrutorC.criarInstrutor);
router.put('/:id', InstrutorC.atualizarInstrutor);
router.delete('/:id', InstrutorC.excluirInstrutor);

module.exports = router;