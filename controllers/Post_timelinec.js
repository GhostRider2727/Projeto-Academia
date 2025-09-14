const { PostTimeline } = require('../models');

exports.listarPosts = async (req, res) => {
  try {
    const posts = await PostTimeline.findAll({
      where: { ativo: true },
      order: [['data_postagem', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar posts." });
  }
};

exports.buscarPost = async (req, res) => {
  try {
    const post = await PostTimeline.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post não encontrado." });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar post." });
  }
};

exports.criarPost = async (req, res) => {
  try {
    const novoPost = await PostTimeline.create(req.body);
    res.status(201).json(novoPost);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar post." });
  }
};

exports.atualizarPost = async (req, res) => {
  try {
    const post = await PostTimeline.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post não encontrado." });
    await post.update(req.body);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar post." });
  }
};

exports.excluirPost = async (req, res) => {
  try {
    const post = await PostTimeline.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post não encontrado." });
    await post.update({ ativo: false });
    res.json({ message: "Post desativado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir post." });
  }
};