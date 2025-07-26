const express = require('express');
const router = express.Router();
const dbConnection = require('../configs/db');

router.post('/', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.'})
    };

    const query = 'INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)';
    dbConnection.query(query, [nome, email, senha], (error, results) => {
        if (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ error: 'Erro ao inserir dados.' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso!', id: results.insertId });
    });
});

module.exports = router; // export para que o server.js use as rotas