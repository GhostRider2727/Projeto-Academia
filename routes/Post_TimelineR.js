const express = require('express');
const router = express.Router();
const Post_TimelineC = require('../controllers/Post_TimelineC');

router.get('/', Post_TimelineC.listarPosts);
router.get('/:id', Post_TimelineC.buscarPost);
router.post('/', Post_TimelineC.criarPost);
router.put('/:id', Post_TimelineC.atualizarPost);
router.delete('/:id', Post_TimelineC.excluirPost);

module.exports = router;