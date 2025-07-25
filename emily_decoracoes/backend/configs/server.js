const express = require('express');
const app = express();
const PORT = 3001;
app.use(express.json());

// Importar as rotas
const usuariosRoutes = require('./routes/usuarios');
// Se você criar a de produtos: const produtosRoutes = require('./routes/produtos');

// ----- ROTAS PRINCIPAIS DA API -----
// Dizemos para o Express: "Toda requisição que chegar para '/api/usuarios', 
// deve ser gerenciada pelo nosso arquivo `usuariosRoutes`"
app.use('/api/usuarios', usuariosRoutes);

// Rota teste
app.get('/', (req, res) => {
  res.send('Servidor backend está no ar. APIs estão em /api/...');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});