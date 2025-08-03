const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const porta = 3001;

// ----- MIDDLEWARES -----
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

// ----- ROTAS -----

//Usuarios
const usuariosRoutes = require('./routes/usuarios.js');
app.use('/api/usuarios/', usuariosRoutes);

//Produtos
const produtosRoutes = require('./routes/produtos.js')
app.use('/api/produtos/', produtosRoutes);

//Agendamentos
const agendamentosRoutes = require('./routes/agendamentos.js')
app.use('/api/agendamentos/', agendamentosRoutes);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}.`);
});