const dbConnection = require('../configs/db');

const usuario = {
    cadastrar(nome, email, senha) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

            dbConnection.query(query, [nome, email, senha], (error, results) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return reject(new Error('E-mail já cadastrado.'));
                    }
                    return reject(error);
                }

                resolve(results);
            });
        });
    },

    logar(email, senha) {
        return new Promise((resolve, reject) =>{
            const query = 'select id, nome, email, senha from usuarios where email = ?';
            dbConnection.query(query, [email], (error, results) => {
                if (error) {
                    console.error('Erro ao efetuar o login:', error);
                    return reject(error);
                }

                if (results.length === 0 || results === undefined || results === null) {
                    return reject(new Error('Usuário não encontrado.'));
                } else if (results[0].senha !== senha) {
                    return reject(new Error('Senha incorreta.'));
                }

                return resolve(results);
            });
            }
        );
    },

    verificar(id) {
        return new Promise((resolve, reject) =>{
            const query = 'SELECT id, nome, email, funcionario, administrador FROM usuarios WHERE id = ?';
            dbConnection.query(query, [id], (error, results) => {
                if (error) {
                    console.error('Erro ao verificar o login:', error);
                    return reject(new Error('Erro ao verificar o login'));
                }

                if (results.length === 0 || results === undefined || results === null) {
                    return reject(new Error('Usuário não encontrado'))
                }

                return resolve(results);
                });
            });
    }
}
module.exports = usuario;