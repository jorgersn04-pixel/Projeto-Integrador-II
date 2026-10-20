const atendimentoService = require('../services/atendimentoService');

const atendimentoController = {
    async criar(req, res) {
        try {
            const { id_paciente: idPaciente } = req.body;
            const idRecepcionista = req.header('x-profissional-id');

            if (!idPaciente || !idRecepcionista) {
                return res.status(400).json({
                    mensagem: 'id_paciente e x-profissional-id são obrigatórios.'
                });
            }

            const atendimento = await atendimentoService.abrirNovoAtendimento(
                idPaciente,
                idRecepcionista
            );

            return res.status(201).json(atendimento);
        } catch (erro) {
            console.error('Erro ao criar atendimento:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno ao criar atendimento.'
            });
        }
    }
};

module.exports = atendimentoController;
