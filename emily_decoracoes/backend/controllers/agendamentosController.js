const agendamento = require('../models/agendamentosModel');

exports.validarAgendamento = async (req, res) => {
    const {data} = req.query; 

    if(!data) {
      return res.status(400).json({ error: 'Você deve selecionar uma data.' });
    }

    try {
        const results = await agendamento.validar(data);

        return res.status(200).json({
            message: true
        });
    } catch(error) {
        if(error.message === 'Já existe um agendamento para a data selecionada, favor escolher outro dia ou outro horário!') {
            return res.status(409).json({ error: error.message});
        } else { 
            return res.status(500).json({ error: error.message});
        }
    }
};

exports.solicitarAgendamento = async (req, res) => {
    const {usuario_id, data_agendamento, status, stativo} = req.body;

    if(!usuario_id || !data_agendamento || !status || !stativo) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {

        const results = await agendamento.solicitar(usuario_id, data_agendamento, status, stativo);

        res.status(200).json ({
            message: 'Feita a solicitação de agendamento.',
            agendamento: {
                id: results.insertId, 
                usuario_id: usuario_id,
                data_agendamento: data_agendamento, 
                status: status
            }
        });
    } catch(error) {
        return res.status(500).json({ error: error.message});
    }
};

exports.verificarAgendamentos = async (req, res) => {
    const {usuario_id} = req.query;

    if(!usuario_id) {
      return res.status(400).json({ error: 'Você deve estar logado para checar os agendamentos.' });
    }

    try {
        
        const results = await agendamento.verificar(usuario_id);

        return res.status(200).json({
            message: 'ok',
            dados: results
        });

    } catch (error) {
        if(error.message == 'Não há nenhum agendamento/solicitação para sua conta.') {
            return res.status(409).json({ error: error.message});
        } else {
           return res.status(500).json({ error: error.message});
        }
    }
}