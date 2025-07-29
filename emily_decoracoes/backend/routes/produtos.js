const express = require('express');
const router = express.Router();
const dbConnection = require('../configs/db.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage });

//API de inserir produtos
router.post('/inserir', upload.single('imagem'), (req, res) => {
    const{nome, desc, preco, tipo, cor, modelo} = req.body;
    let {path} = req.file

    if(!nome || !desc || !preco || !tipo || !cor || !modelo || !req.file) {
        return res.status(400).json({error: 'Todos os campos são obrigatórios'});
    } 
    
    //return console.log(nome, desc, preco, tipo, cor, modelo, path)

    const query = 'INSERT INTO PRODUTOS (nome, descricao, preco, tipo, cor, modelo, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)'
    dbConnection.query(query, [nome, desc, preco, tipo, cor, modelo, path], (error, results) => {
        if(error) {
            res.status(500).json({ error: 'Erro ao inserir produto'});

            console.log(error)
        }

        res.status(200).json ({
            message: 'Produto cadastrado com sucesso',
            produto: {
                nome: nome,
                desc: desc, 
                preco: preco,
                tipo: tipo, 
                cor: cor, 
                modelo: modelo,
                imagem: path
            }
        });

    });
    
});

module.exports = router; // export para que o server.js use as rotas