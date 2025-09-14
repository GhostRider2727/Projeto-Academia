const express = require('express');
const router = express.Router();
const Curtida_PostC = require('../controllers/Curtida_PostC');

// Rotas para Curtidas de Posts
router.get('/', Curtida_PostC.listarCurtidas);
router.get('/:id', Curtida_PostC.buscarCurtida);
router.post('/', Curtida_PostC.criarCurtida);
router.delete('/:id', Curtida_PostC.excluirCurtida);

// Rotas adicionais
router.get('/verificar/:id_post/:id_aluno', Curtida_PostC.verificarCurtida);
router.get('/contar/:id_post', Curtida_PostC.contarCurtidasPost);

module.exports = router;