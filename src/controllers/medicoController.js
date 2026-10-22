const medicoService = require('../services/medicoService');

const medicoController = {
    async listarPainel(req, res) {
        try {
            const dados = await medicoService.listarPainel();
            return res.status(200).json(dados);
        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro interno ao listar painel médico.'
            });
        }
    },

    async iniciar(req, res) {
        try {
            const { id_atendimento: idAtendimento } = req.body;
            const idMedico = req.header('x-profissional-id');

            const resultado = await medicoService.iniciarConsulta(idAtendimento, idMedico);
            return res.status(200).json(resultado);
        } catch (erro) {
            return res.status(erro.statusCode || 500).json({
                mensagem: erro.message || 'Erro interno ao iniciar consulta.'
            });
        }
    },

    async finalizar(req, res) {
        try {
            const {
                id_atendimento: idAtendimento,
                diagnostico,
                medicacoes_prescritas: medicacoes,
                observacoes
            } = req.body;

            const resultado = await medicoService.finalizarConsulta(
                idAtendimento,
                diagnostico,
                medicacoes,
                observacoes
            );

            return res.status(200).json(resultado);
        } catch (erro) {
            return res.status(erro.statusCode || 500).json({
                mensagem: erro.message || 'Erro interno ao finalizar consulta.'
            });
        }
    }
};

module.exports = medicoController;
