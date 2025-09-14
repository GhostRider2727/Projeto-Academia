const { CurtidaPost, PostTimeline, Aluno } = require('../models');

// Listar todas as curtidas
exports.listarCurtidas = async (req, res) => {
  try {
    const curtidas = await CurtidaPost.findAll({
      include: [
        { model: PostTimeline, attributes: ['id', 'conteudo'] },
        { model: Aluno, attributes: ['id', 'nome'] }
      ],
      order: [['curtido_em', 'DESC']]
    });
    res.json(curtidas);
  } catch (error) {
    console.error("Erro ao buscar curtidas:", error);
    res.status(500).json({ error: "Não foi possível buscar as curtidas." });
  }
};

// Buscar curtida por ID
exports.buscarCurtida = async (req, res) => {
  try {
    const { id } = req.params;
    const curtida = await CurtidaPost.findByPk(id, {
      include: [
        { model: PostTimeline, attributes: ['id', 'conteudo'] },
        { model: Aluno, attributes: ['id', 'nome'] }
      ]
    });
    
    if (!curtida) {
      return res.status(404).json({ error: "Curtida não encontrada." });
    }
    
    res.json(curtida);
  } catch (error) {
    console.error("Erro ao buscar curtida:", error);
    res.status(500).json({ error: "Não foi possível buscar a curtida." });
  }
};

// Criar nova curtida
exports.criarCurtida = async (req, res) => {
  try {
    const { id_post, id_aluno } = req.body;
    
    // Validação básica
    if (!id_post || !id_aluno) {
      return res.status(400).json({ error: "id_post e id_aluno são obrigatórios." });
    }
    
    // Verificar se já existe curtida do mesmo aluno no mesmo post
    const curtidaExistente = await CurtidaPost.findOne({
      where: { id_post, id_aluno }
    });
    
    if (curtidaExistente) {
      return res.status(409).json({ error: "Este aluno já curtiu este post." });
    }
    
    const novaCurtida = await CurtidaPost.create({ 
      id_post, id_aluno 
    });
    
    res.status(201).json(novaCurtida);
  } catch (error) {
    console.error("Erro ao criar curtida:", error);
    res.status(500).json({ error: "Não foi possível criar a curtida." });
  }
};

// Excluir curtida (descurtir)
exports.excluirCurtida = async (req, res) => {
  try {
    const { id } = req.params;
    const curtida = await CurtidaPost.findByPk(id);
    
    if (!curtida) {
      return res.status(404).json({ error: "Curtida não encontrada." });
    }

    await curtida.destroy();
    res.json({ message: "Curtida removida com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir curtida:", error);
    res.status(500).json({ error: "Não foi possível excluir a curtida." });
  }
};

// Verificar se aluno curtiu post
exports.verificarCurtida = async (req, res) => {
  try {
    const { id_post, id_aluno } = req.params;
    
    const curtida = await CurtidaPost.findOne({
      where: { id_post, id_aluno }
    });
    
    res.json({ curtiu: !!curtida });
  } catch (error) {
    console.error("Erro ao verificar curtida:", error);
    res.status(500).json({ error: "Não foi possível verificar a curtida." });
  }
};

// Contar curtidas de um post
exports.contarCurtidasPost = async (req, res) => {
  try {
    const { id_post } = req.params;
    
    const count = await CurtidaPost.count({
      where: { id_post }
    });
    
    res.json({ post_id: id_post, total_curtidas: count });
  } catch (error) {
    console.error("Erro ao contar curtidas:", error);
    res.status(500).json({ error: "Não foi possível contar as curtidas." });
  }
};