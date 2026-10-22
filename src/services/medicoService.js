const medicoRepository = require('../repositories/medicoRepository');

const medicoService = {
    async listarPainel() {
        return medicoRepository.listarPainel();
    },

    async iniciarConsulta(idAtendimento, idMedico) {
        if (!idAtendimento || !idMedico) {
            const erro = new Error('id_atendimento e id_medico são obrigatórios.');
            erro.statusCode = 400;
            throw erro;
        }

        return medicoRepository.iniciarConsulta(Number(idAtendimento), Number(idMedico));
    },

    async finalizarConsulta(idAtendimento, diagnostico, medicacoes, observacoes) {
        if (!idAtendimento) {
            const erro = new Error('id_atendimento é obrigatório.');
            erro.statusCode = 400;
            throw erro;
        }

        return medicoRepository.finalizarConsulta(
            Number(idAtendimento),
            diagnostico,
            medicacoes,
            observacoes
        );
    }
};

module.exports = medicoService;
