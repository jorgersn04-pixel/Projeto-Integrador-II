const pacienteService = require('../services/pacienteService');

const pacienteController = {
    async listar(req, res) {
        try {
            const pacientes = await pacienteService.listarTodos();
            return res.status(200).json(pacientes);
        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro interno ao listar pacientes.'
            });
        }
    },

    async criar(req, res) {
        try {
            const paciente = await pacienteService.criar(req.body);
            return res.status(201).json(paciente);
        } catch (erro) {
            return res.status(erro.statusCode || 500).json({
                mensagem: erro.message || 'Erro interno ao criar paciente.'
            });
        }
    }
};

module.exports = pacienteController;
