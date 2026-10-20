const atendimentoRepository = require('../repositories/atendimentoRepository');

async function abrirNovoAtendimento(idPaciente, idRecepcionista) {
    const ultimoId = await atendimentoRepository.obterUltimoId();
    const novoId = Number(ultimoId) + 1;
    const numero = `AT${String(novoId).padStart(4, '0')}`;

    const idAtendimento = await atendimentoRepository.criarAtendimento(
        numero,
        idPaciente,
        idRecepcionista
    );

    return {
        id_atendimento: idAtendimento,
        numero,
        id_paciente: idPaciente,
        id_recepcionista: idRecepcionista,
        status: 'AGUARDANDO_TRIAGEM'
    };
}

module.exports = {
    abrirNovoAtendimento
};
