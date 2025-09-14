const express = require('express');
const router = express.Router();
const Treino_ExercicioC = require('../controllers/Treino_ExercicioC');

router.get('/', Treino_ExercicioC.listarTreinoExercicios);
router.get('/:treino_id/:exercicio_id', Treino_ExercicioC.buscarTreinoExercicio);
router.post('/', Treino_ExercicioC.criarTreinoExercicio);
router.put('/:treino_id/:exercicio_id', Treino_ExercicioC.atualizarTreinoExercicio);
router.delete('/:treino_id/:exercicio_id', Treino_ExercicioC.excluirTreinoExercicio);

module.exports = router;