const dbConnection = require('../configs/db.js');

const produtos = {
    inserir(nome, desc, preco, tipo, cor, modelo, path) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO PRODUTOS (nome, descricao, preco, tipo, cor, modelo, imagem, data_inclusao) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())'
            dbConnection.query(query, [nome, desc, preco, tipo, cor, modelo, path], (error, results) => {
                if(error) {
                    console.log(error)
                    return reject(new Error('Erro ao inserir produto'));
                }

                return resolve(results);
            });
        });
    },

    consultar() {
        return new Promise((resolve, reject) => {
            let query = `select * from produtos;`;

            dbConnection.query(query, (error, results) => {
                if(error) {
                    console.log(error)
                    return reject(new Error('Erro ao consultar produtos'));
                }

                resolve(results);
            });
        });
    }
};

module.exports = produtos;