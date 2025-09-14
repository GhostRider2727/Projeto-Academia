const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Aluno, Instrutor, Treino, Plano, Matricula,
  Local, Academia, Maquina, Exercicio, TreinoExercicio,
  AvaliacaoFisica, Pagamento, PostTimeline, CurtidaPost } = require('./db'); // Importa o model User

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // necessário para req.body funcionar

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando com Sequelize!');
});

// Página sobre
app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

// Página login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
// Página de views
app.get('/views', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views.html'));
});

// Página HTML com botões
app.get('/views', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views.html'));
});
// Página editar com botões
app.get('/editar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'editar.html'));
});

// Rota alunos
app.get('/alunos', async (req, res) => {
  const alunos = await Aluno.findAll();
  res.json(alunos);
});

// Rota avaliacoes
app.get('/avaliacoes', async (req, res) => {
  const avaliacoes = await AvaliacaoFisica.findAll({ include: Aluno });
  res.json(avaliacoes);
});

// Rota treinos
app.get('/treinos', async (req, res) => {
  const treinos = await Treino.findAll({ include: Aluno });
  res.json(treinos);
});
// ROTA CREATE – Inserir aluno (POST)
app.post('/alunos', async (req, res) => {
  try {
    const { nome, email, data_nascimento, telefone, senha } = req.body;
    const novoAluno = await Aluno.create({ nome, email, data_nascimento, telefone, senha });
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Não foi possível criar o aluno." });
  }
});
//ROTA READ – Listar todos os alunos (GET)
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Não foi possível buscar os alunos." });
  }
});
//ROTA READ – Buscar aluno por ID (GET)
app.get('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    res.status(500).json({ error: "Não foi possível buscar o aluno." });
  }
});
//ROTA UPDATE – Atualizar aluno (PUT)
app.put('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, data_nascimento, telefone, senha } = req.body;

    const aluno = await Aluno.findByPk(id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });

    await aluno.update({ nome, email, data_nascimento, telefone, senha });
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Não foi possível atualizar o aluno." });
  }
});
//ROTA DELETE – Excluir aluno (DELETE)
app.delete('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });

    await aluno.destroy();
    res.json({ message: "Aluno excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    res.status(500).json({ error: "Não foi possível excluir o aluno." });
  }
});





// Criar aluno
app.post('/alunos', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoAluno = await Aluno.create({ nome, email });
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Não foi possível criar o aluno." });
  }
});

// Listar alunos
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Não foi possível buscar os alunos." });
  }
});

// Buscar aluno por ID
app.get('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    res.status(500).json({ error: "Não foi possível buscar o aluno." });
  }
});

// Página de erro 404 (sempre por último)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'erro_404.html'));
});

// --- INÍCIO DO SERVIDOR ---
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
//git config --global user.name "Manganao"
//git config --global user.email "ens_gabrielbielick@ugv.edu.br"
