// server.js

const express = require('express');
const cors = require('cors');

// 1. Importa o nosso novo arquivo de rotas
const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 2. "PLUGUE" DAS ROTAS
// Esta linha diz: "Express, para qualquer URL que comece com '/api', 
// passe o controle para o arquivo 'apiRoutes' que importamos".
app.use('/api', apiRoutes);

// O bloco gigante de app.post(...) que estava aqui FOI REMOVIDO!

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor principal rodando em http://localhost:${port}`);
  console.log('Rotas da API estão sendo gerenciadas por /routes/api.js');
});