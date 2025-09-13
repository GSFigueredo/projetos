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

    atualizar(id, nome, descricao, preco, tipo, cor, modelo, path) {
      return new Promise((resolve, reject) => {
        const query = `
          update
            produtos
          set
            nome = ?,
            descricao = ?,
            preco = ?,
            tipo = ?,
            cor = ?,
            modelo = ?,
            imagem = ?
          where 
            id =?
          `;

          dbConnection.query(query, [nome, descricao, preco, tipo, cor, modelo, path, id], (error, results) => {
              if(error) {
                  console.log(error)
                  return reject(new Error('Erro ao atualizar produto'));
              }
          
              resolve(results);
          });
      });
    },

    consultar(id) {
      return new Promise((resolve, reject) => {
          let query = `select * from produtos where 1 = 1`;

          if(id) {
              query += ` and id = ?`
          }

          dbConnection.query(query, [id], (error, results) => {
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