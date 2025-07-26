require('dotenv-safe').config(); 

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const dbConnection = require('../configs/db');

router.post('/', (req, res) => {
    const {email, senha} = req.body;

    const query = 'select id, nome, email, senha from clientes where email = ?';
    dbConnection.query(query, [email], (error, results) => { // results é um array de objetos, nativo do mysql2
        if (error) {
            console.error('Erro ao efetuar o login:', error);
            return res.status(500).json({ error: 'Erro ao efetuar o login' });
        }

        if (results.length === 0 || results === undefined || results === null) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
            //return console.log('Usuário não encontrado');
        } else if (results[0].senha !== senha) {
            return res.status(401).json({ error: 'Senha incorreta' });
            //console.log('Senha incorreta');
        }

        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_EXPIRES) // converte a string para inteiro
        })

        res.status(200).json({
            message: 'Login efetuado com sucesso',
            user: { 
                id: results[0].id,
                nome: results[0].nome,
                email: results[0].email,
                token: token
            }
            }
        );
    });
});

module.exports = router; // export para que o server.js use as rotas