const usuario = require('../models/usuarioModel');
const path = require('path');
require('dotenv-safe').config({
  path: path.resolve(__dirname, '../configs/.env'),
  example: path.resolve(__dirname, '../configs/.env.example')
});
const jwt = require('jsonwebtoken');

exports.cadastrarUsuario = async (req, res) => {

    const {nome, email, senha} = req.body;

    if(!nome || !email || !senha) {
        return res.status(409).json({error: 'Todos os campos devem ser preenchidos.'});
    }

    try {

        const results = await usuario.cadastrar(nome, email, senha);

        res.status(201).json({ message: 'Usuário criado com sucesso!', id: results.insertId });

    } catch (error) {
        console.error('Erro no controller ao cadastrar usuário:', error.message);

        if (error.message === 'E-mail já cadastrado.') {
            return res.status(409).json({ error: error.message });
        }
        
        return res.status(500).json({ error: 'Ocorreu um erro ao criar o usuário.' });
    }
};

exports.logarUsuario = async (req, res) => {

    const {email, senha} = req.body;

    if(!email || !senha) {
        return res.status(409).json({error: 'Todos os campos devem ser preenchidos.'});
    }

    try{
        const results = await usuario.logar(email, senha);

        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_EXPIRES)
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
     } catch(error) {
        if (error.message === 'Usuário não encontrado.') {
            return res.status(409).json({ error: error.message });
        } else if (error.message === 'Senha incorreta.'){ 
            return res.status(401).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
     }
}

exports.verificarLogin = async (req, res) => {

    const {id, token} = req.query;

    if (!id || !token) {
        return res.status(400).json({ error: 'ID e token são obrigatórios.' });
    }

    try {
        const results = await usuario.verificar(id);

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
        } else if (results[0].funcionario == 'True' && results[0].administrador == 'False') {
            res.status(200).json({
                    message: 'Login verificado com sucesso',
                    user: { 
                        id: results[0].id,
                        nome: results[0].nome,
                        email: results[0].email,
                        funcionario: true,
                        administrador: false,
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
    } catch(error) {
        if(error.message === 'Usuário não encontrado') {
            return res.status(409).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
}