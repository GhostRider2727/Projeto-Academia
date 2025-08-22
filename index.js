const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware que expõe a pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota da página principal
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando!');
});

// Nova rota para a página "Sobre"
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});
// Nova rota para a página "login pc"
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
// Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Não foi possível criar o usuário." });
  }
});

// Rota para listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Não foi possível buscar os usuários." });
  }
});

// Rota para buscar um usuário por ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    res.status(500).json({ error: "Não foi possível buscar o usuário." });
  }
});

// --- INÍCIO DO SERVIDOR ---

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Desconexão do Prisma ao encerrar a aplicação
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Conexão com o banco de dados encerrada.');
  process.exit(0);
});
// Rota para a página de erro 404 (sempre por último)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'erro_404.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});