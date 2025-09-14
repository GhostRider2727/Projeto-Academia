const express = require('express');
const router = express.Router();
const PlanoC = require('../controllers/PlanoC');

router.get('/', PlanoC.listarPlanos);
router.get('/:id', PlanoC.buscarPlano);
router.post('/', PlanoC.criarPlano);
router.put('/:id', PlanoC.atualizarPlano);
router.delete('/:id', PlanoC.excluirPlano);

module.exports = router;