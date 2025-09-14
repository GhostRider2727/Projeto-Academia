const express = require('express');
const router = express.Router();
const LocalC = require('../controllers/LocalC');

router.get('/', LocalC.listarLocais);
router.get('/:id', LocalC.buscarLocal);
router.post('/', LocalC.criarLocal);
router.put('/:id', LocalC.atualizarLocal);
router.delete('/:id', LocalC.excluirLocal);

module.exports = router;