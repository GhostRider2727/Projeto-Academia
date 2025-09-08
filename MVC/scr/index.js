const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


const routes = require('./routes/routes');
app.use('/', routes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(express.static("views"));


