const express = require('express');
const router = express.Router();
const MatriculaC = require('../controllers/MatriculaC');

router.get('/', MatriculaC.listarMatriculas);
router.get('/:id', MatriculaC.buscarMatricula);
router.post('/', MatriculaC.criarMatricula);
router.put('/:id', MatriculaC.atualizarMatricula);
router.delete('/:id', MatriculaC.excluirMatricula);

module.exports = router;