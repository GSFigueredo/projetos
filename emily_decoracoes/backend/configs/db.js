const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'emily_decoracoes'
});

dbConnection.connect(error => {
  if (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida!');
});

module.exports = dbConnection;