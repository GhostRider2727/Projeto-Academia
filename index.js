const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './variaveis.env' });

// Importar rotas (com abreviações)
const AcademiaR = require('./routes/AcademiaR');
const AlunoR = require('./routes/alunoR');
const AvaliacaoR = require('./routes/AvaliacaoR');
const Curtida_PostR = require('./routes/Curtida_PostR');
const exercicioR = require('./routes/exercicioR');
const InstrutorR = require('./routes/InstrutorR');
const LocalR = require('./routes/LocalR');
const MaquinaR = require('./routes/MaquinaR');
const MatriculaR = require('./routes/MatriculaR');
const PagamentoR = require('./routes/PagamentoR');
const PlanoR = require('./routes/PlanoR');
const Post_timelineR = require('./routes/Post_timelineR');
const TreinoR = require('./routes/TreinoR');
const Treino_exercicioR = require('./routes/Treino_exercicioR');
// Importar outras rotas conforme necessário

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar EJS como template engine (opcional)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas da API (com prefixos)
app.use('/api/academia', AcademiaR);
app.use('/api/aluno', AlunoR);
app.use('/api/avaliacao', AvaliacaoR);
app.use('/api/curtida_post', Curtida_PostR);
app.use('/api/exercicio', exercicioR);
app.use('/api/instrutor', InstrutorR);
app.use('/api/local', LocalR);
app.use('/api/maquina', MaquinaR);
app.use('/api/plano', PlanoR);
app.use('/api/post_timeline', Post_timelineR);
app.use('/api/matricula', MatriculaR);
app.use('/api/pagamento', PagamentoR);
app.use('/api/treino', TreinoR);
app.use('/api/treino_exercicio', Treino_exercicioR);
// Adicione outras rotas API aqui

// Rotas básicas (páginas)
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando com Sequelize e PostgreSQL!');
});

app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/views', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views.html'));
});

app.get('/editar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'editar.html'));
});
app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view.html'));
});
app.get('/1editar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '1editar.html'));
});
app.get('/teste', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'teste.html'));
});

// Página de erro 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'erro_404.html'));
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Sincronizar com o banco de dados e iniciar servidor
const { sequelize } = require('./models');

sequelize.sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
      console.log(`📊 Conectado ao PostgreSQL`);
    });
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });