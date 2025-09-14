const express = require('express');
const router = express.Router();
const ExercicioC = require('../controllers/ExercicioC');

router.get('/', ExercicioC.listarExercicios);
router.get('/:id', ExercicioC.buscarExercicio);
router.post('/', ExercicioC.criarExercicio);
router.put('/:id', ExercicioC.atualizarExercicio);
router.delete('/:id', ExercicioC.excluirExercicio);

module.exports = router;