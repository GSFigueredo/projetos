const express = require('express');
const router = express.Router();
const dbConnection = require('../configs/db');

router.post('/', (req, res) => {
    const {email, senha} = req.body;

    const query = 'select nome, email, senha from clientes where email = ?';
    dbConnection.query(query, [email], (error, results) => {
        if (error) {
            console.error('Erro ao efetuar o login:', error);
            return res.status(500).json({ error: 'Erro ao efetuar o login' });
        }

        let resultsObjeto = JSON.parse(JSON.stringify(results));

        if (resultsObjeto.length === 0 || resultsObjeto === undefined || resultsObjeto === null) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
            //return console.log('Usuário não encontrado');
        } else if (resultsObjeto[0].senha !== senha) {
            return res.status(401).json({ error: 'Senha incorreta' });
            //console.log('Senha incorreta');
        }

        res.status(200).json({
            message: 'Login efetuado com sucesso',
            user: { 
                nome: resultsObjeto[0].nome,
                email: resultsObjeto[0].email
            }
            }
        );
    });
});

module.exports = router; // export para que o server.js use as rotas