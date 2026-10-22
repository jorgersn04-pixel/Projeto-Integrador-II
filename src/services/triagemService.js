const triagemRepository = require('../repositories/triagemRepository');
const atendimentoRepository = require('../repositories/atendimentoRepository');

const classificacoesValidas = ['VERMELHO', 'LARANJA', 'AMARELO', 'VERDE', 'AZUL'];

const triagemService = {
    async realizarTriagem(dados) {
        const obrigatorios = ['id_atendimento', 'id_enfermeiro', 'queixa_principal', 'classificacao_manchester'];

        for (const campo of obrigatorios) {
            if (!dados[campo]) {
                const erro = new Error(`Campo obrigatório não informado: ${campo}.`);
                erro.statusCode = 400;
                throw erro;
            }
        }

        if (!classificacoesValidas.includes(dados.classificacao_manchester)) {
            const erro = new Error('classificacao_manchester inválida.');
            erro.statusCode = 400;
            throw erro;
        }

        const idTriagem = await triagemRepository.criarTriagem(dados);

        const linhasAfetadas = await atendimentoRepository.atualizarStatusAtendimento(
            dados.id_atendimento,
            'AGUARDANDO_MEDICO'
        );

        if (!linhasAfetadas) {
            const erro = new Error('Atendimento não encontrado para atualizar status.');
            erro.statusCode = 404;
            throw erro;
        }

        return {
            id_triagem: idTriagem,
            ...dados
        };
    }
};

module.exports = triagemService;
