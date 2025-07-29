const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const porta = 3001;

// ----- MIDDLEWARES -----
// o express trata a requisição, e logo após, disponibiliza dois objetos, o req(requisição/dados) e o res(resposta inicialmente vazia)
app.use(cors()); // comunicação entre front-end e back-end, e envia a resposta para o front-end
app.use(express.json());  // transforma para json
app.use(express.static(path.join(__dirname, 'public')));

// ----- ROTAS -----

//Usuarios
const usuariosRoutes = require('./routes/usuarios.js');
app.use('/api/usuarios/', usuariosRoutes);

//Produtos
const produtosRoutes = require('./routes/produtos.js')
app.use('/api/produtos/', produtosRoutes);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}.`);
});