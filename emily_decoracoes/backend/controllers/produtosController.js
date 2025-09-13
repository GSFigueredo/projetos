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

exports.atualizarProduto = async (req, res) => {
    const{id, nome, descricao, preco, tipo, cor, modelo} = req.body;
    let path;

    if(!id || !nome || !descricao || !preco || !tipo || !cor || !modelo) {
        return res.status(400).json({error: 'Todos os campos são obrigatórios'});
    } 

    try {

        if(!req.file) {
          const getProd = await produtos.consultar(id);
          path = getProd[0].imagem;

        } else {
          path = req.file.path;
        }

        const results = await produtos.atualizar(id, nome, descricao, preco, tipo, cor, modelo, path);

        res.status(200).json ({
          message: 'Produto atualizado com sucesso',
        });
    } catch(error) {
      console.log(error);
      if(error.message == 'Erro ao atualizar produto'){ 
            return res.status(500).json({ error: error.message});
        }
    }
};

exports.consultarProdutos = async (req, res) => {

    const id = req.query.id || false;

    try {
        const results = await produtos.consultar(id);

        res.status(200).json ({
            message: 'Produtos encontrados com sucesso',
            produtos: results
        });
    } catch(error) {
        if(error.message == 'Erro ao consultar produtos'){
            console.log(error.message);
            res.status(500).json({ error: error.message});
        }
    }
};