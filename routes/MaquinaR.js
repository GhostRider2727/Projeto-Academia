const express = require('express');
const router = express.Router();
const MaquinaC = require('../controllers/MaquinaC');

router.get('/', MaquinaC.listarMaquinas);
router.get('/:id', MaquinaC.buscarMaquina);
router.post('/', MaquinaC.criarMaquina);
router.put('/:id', MaquinaC.atualizarMaquina);
router.delete('/:id', MaquinaC.excluirMaquina);

module.exports = router;