const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');

router.get('/validacao', agendamentosController.validarAgendamento);
router.post('/solicitacao', agendamentosController.solicitarAgendamento);
router.get('/verificarAgendamentos', agendamentosController.verificarAgendamentos);

module.exports = router;