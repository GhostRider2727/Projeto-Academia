const express = require('express');
const router = express.Router();
const alunoC = require('../controllers/AlunoC'); // Note a abreviação

// Rotas para Alunos
router.get('/', alunoC.listarAlunos);
router.get('/:id', alunoC.buscarAluno);
router.post('/', alunoC.criarAluno);
router.put('/:id', alunoC.atualizarAluno);
router.delete('/:id', alunoC.excluirAluno);

module.exports = router;