require('dotenv-safe').config(); 

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const dbConnection = require('../configs/db');

// API de cadastro
router.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.'})
    };

    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    dbConnection.query(query, [nome, email, senha], (error, results) => {
        if (error) {
            console.error('Erro ao criar usuário:', error);
            if(error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'E-mail já cadastrado.' });
            }
            
            return res.status(500).json({ error: 'Erro ao inserir dados.' });
        }

        res.status(201).json({ message: 'Usuário criado com sucesso!', id: results.insertId });
    });
});

// API de login
router.post('/login', (req, res) => {

    const {email, senha} = req.body;

    const query = 'select id, nome, email, senha from usuarios where email = ?';
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

router.post('/verificarLogin', (req, res) => {
    const {id, token} = req.body;

    if (!id || !token) {
        return res.status(400).json({ error: 'ID e token são obrigatórios.' });
    }

    const query = 'SELECT id, nome, email, funcionario, administrador FROM usuarios WHERE id = ?';
    dbConnection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Erro ao verificar o login:', error);
            return res.status(500).json({ error: 'Erro ao verificar o login' });
        }

        if (results.length === 0 || results === undefined || results === null) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
            //return console.log('Usuário não encontrado');
        }

        if(results[0].funcionario == 'True' && results[0].administrador == 'True') {
                res.status(200).json({
                    message: 'Login verificado com sucesso',
                    user: { 
                        id: results[0].id,
                        nome: results[0].nome,
                        email: results[0].email,
                        funcionario: true,
                        administrador: true,
                        token: token
                    }
                }
            );
        } else { 
            res.status(200).json({
            message: 'Login verificado com sucesso',
            user: { 
                id: results[0].id,
                nome: results[0].nome,
                email: results[0].email,
                token: token
            }
            }
        );
        }
    }
    )
});

module.exports = router; // export para que o server.js use as rotas