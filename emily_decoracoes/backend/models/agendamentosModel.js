const dbConnection = require('../configs/db');

const agendamento = {
    validar(data) {
        return new Promise((resolve, reject) => {
            let query = `
                select 
                    id 
                from 
                    agendamentos 
                where 
                    data_agendamento = ? 
                `;

            query += ` and stativo = 'True'`
            
            dbConnection.query(query, [data], (error, results) => {
                if(error) {
                    console.log(error);
                    return reject(new Error('Erro ao solicitar agendamento.'));
                }

                if(results.length > 0) {
                    return reject(new Error('Já existe um agendamento para a data selecionada, favor escolher outro dia ou outro horário!'));
                }

                return resolve(results);
            });
        });
    },

    solicitar(usuario_id, data_agendamento, status, stativo) {
        return new Promise( (resolve, reject) => {
            const query = 'insert into agendamentos (usuario_id, data_agendamento, status, stativo) values (?, ?, ?, ?);';
            dbConnection.query(query, [usuario_id, data_agendamento, status, stativo], (error, results) => {
                if(error) {
                    console.log(error);
                    return reject(new Error('Erro ao solicitar agendamento.'));
                } 

                return resolve(results);
            });
        });
    },

    verificar(usuario_id) {
        return new Promise ((resolve, reject) => {
            let query = `
                select
                    tba.id,
                    tba.usuario_id,
                    tbu.nome,
                    tbu.email,
                    tba.data_agendamento,
                    tba.status,
                    tba.stativo
                from 
                    agendamentos tba
                inner join usuarios tbu on
                    tba.usuario_id = tbu.id
                where
                    usuario_id = ?
                order by
                    data_agendamento
            `;
            
            dbConnection.query(query, [usuario_id], (error, results) => {
                if(error) {
                    return reject(new Error('Erro ao verificar os agendamentos.'));
                }

                if(results.length == 0) {
                    return reject(new Error('Não há nenhum agendamento/solicitação para sua conta.'));
                }

                return resolve(results);
            });
        });
    }
}

module.exports = agendamento;