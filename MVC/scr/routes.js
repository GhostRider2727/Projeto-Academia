const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


app.get('/api/alunos', (req, res) => {
  res.json([{ id: 1, nome: 'João Silva' }]);
});


app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
    mensagem: "A URL que você tentou acessar não existe no servidor."
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
