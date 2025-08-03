const express = require('express');
const router = express.Router();
const dbConnection = require('../configs/db');

//API de validação do horario
router.get('/validacao', (req, res) => {
    const {data} = req.query;

    if(!data) {
      return res.status(400).json({ error: 'Você deve selecionar uma data.' });
    }
    
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
          return res.status(500).json({ error: 'Erro ao solicitar agendamento.'})
        }

        if(results.length > 0) {
          return res.status(409).json({ error: 'Já existe um agendamento para a data selecionada, favor escolher outro dia ou outro horário!' })
        }

        return res.status(200).json({
            message: true
        });
    });

});

//API de solicitação de agendamento
router.post('/solicitacao', (req, res) => {
    const {usuario_id, data_agendamento, status, stativo} = req.body;

    if(!usuario_id || !data_agendamento || !status || !stativo) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = 'insert into agendamentos (usuario_id, data_agendamento, status, stativo) values (?, ?, ?, ?);';
    dbConnection.query(query, [usuario_id, data_agendamento, status, stativo], (error, results) => {
        if(error) {
          return res.status(500).json({ error: 'Erro ao solicitar agendamento.'});
        }

        res.status(200).json ({
            message: 'Feita a solicitação de agendamento.',
            agendamento: {
                id: results.insertId, 
                usuario_id: usuario_id,
                data_agendamento: data_agendamento, 
                status: status
            }
        });
    });

});

module.exports = router;