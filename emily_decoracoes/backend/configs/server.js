const express = require('express');
const cors = require('cors');
const app = express();
const porta = 3001;

// ----- MIDDLEWARES -----
// o express trata a requisição, e logo após, disponibiliza dois objetos, o req(requisição/dados) e o res(resposta inicialmente vazia)
app.use(cors()); // comunicação entre front-end e back-end, e envia a resposta para o front-end
app.use(express.json());  // transforma para json

// ----- ROTAS -----
const cadastroRoutes = require('../routes/cadastro.js');
const loginRoutes = require('../routes/login.js');

app.use('/api/cadastro', cadastroRoutes); // especie de if else o qual se a rota for /api/usuarios, o express irá usar as rotas definidas no arquivo usuarios.js
app.use('/api/login', loginRoutes);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}.`);
});