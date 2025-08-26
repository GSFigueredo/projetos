const produtos = require('../models/produtosModel');

exports.inserirProduto = async (req, res) => {
    const{nome, desc, preco, tipo, cor, modelo} = req.body;

    if(!nome || !desc || !preco || !tipo || !cor || !modelo || !req.file) {
        return res.status(400).json({error: 'Todos os campos são obrigatórios'});
    } 

    let {path} = req.file;

    try {
        const results = await produtos.inserir(nome, desc, preco, tipo, cor, modelo, path);

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
    } catch(error) {
        if(error.message == 'Erro ao inserir produto'){ 
            return res.status(500).json({ error: error.message});
        }
    }
};

exports.consultarProdutos = async (req, res) => {
    try {
        const results = await produtos.consultar();

        res.status(200).json ({
            message: 'Produtos encontrados com sucesso',
            produtos: results
        });
    } catch(error) {
        if(error.message == 'Erro ao consultar produtos'){
            res.status(500).json({ error: error.message});
        }
    }
};