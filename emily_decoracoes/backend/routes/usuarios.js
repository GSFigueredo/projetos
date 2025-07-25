const express = require('express');
const router = express.Router(); // Usamos o Router do Express
const dbConnection = require('../configs/db');

router.get('/', (req, res) => {
  // O caminho '/' aqui corresponde a '/api/usuarios' no server.js
  dbConnection.query('SELECT * FROM clientes', (error, results) => {
    if (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
    res.json(results);
  });
});

// ROTA 2: Criar um novo usuário (POST /api/usuarios/)
router.post('/', (req, res) => {
    const { nome, email, senha } = req.body; // Pega os dados do corpo da requisição

    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    dbConnection.query(query, [nome, email, senha], (error, results) => {
        if (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ error: 'Erro ao inserir dados.' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso!', id: results.insertId });
    });
});

// No final, exportamos o router para que o server.js possa usá-lo
module.exports = router;