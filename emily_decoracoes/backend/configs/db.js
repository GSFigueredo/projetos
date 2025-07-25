const mysql = require('mysql2'); // importar o módulo do mysql2 para a variavel mysql

const dbConnection = mysql.createConnection({ // variavel constante que recebe os dados da conexão, através da variavel mysql
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'emily_decoracoes'
});

dbConnection.connect(error => { // metodo de conexão com o banco de dados
  if (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida!');
});

module.exports = dbConnection;