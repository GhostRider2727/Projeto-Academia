const express = require('express');
const router = express.Router();
const AcademiaC = require('../controllers/AcademiaC');

router.get('/', AcademiaC.listarAcademias);
router.get('/:id', AcademiaC.buscarAcademia);
router.post('/', AcademiaC.criarAcademia);
router.put('/:id', AcademiaC.atualizarAcademia);
router.delete('/:id', AcademiaC.excluirAcademia);

module.exports = router;