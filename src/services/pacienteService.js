const pacienteRepository = require('../repositories/pacienteRepository');

function normalizarCpf(cpf) {
    return String(cpf || '').replace(/\D/g, '');
}

function cpfBasicoValido(cpf) {
    const cpfNormalizado = normalizarCpf(cpf);
    if (cpfNormalizado.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfNormalizado)) return false;
    return true;
}

const pacienteService = {
    async listarTodos() {
        return pacienteRepository.listarTodos();
    },

    async criar(dadosPaciente) {
        const obrigatorios = [
            'nome_completo',
            'cpf',
            'rg',
            'nome_mae',
            'data_nascimento',
            'sexo'
        ];

        for (const campo of obrigatorios) {
            if (!dadosPaciente[campo]) {
                const erro = new Error(`Campo obrigatório não informado: ${campo}.`);
                erro.statusCode = 400;
                throw erro;
            }
        }

        if (!cpfBasicoValido(dadosPaciente.cpf)) {
            const erro = new Error('CPF inválido.');
            erro.statusCode = 400;
            throw erro;
        }

        if (!['M', 'F'].includes(dadosPaciente.sexo)) {
            const erro = new Error("sexo deve ser 'M' ou 'F'.");
            erro.statusCode = 400;
            throw erro;
        }

        dadosPaciente.cpf = normalizarCpf(dadosPaciente.cpf);

        const id = await pacienteRepository.criar(dadosPaciente);
        return { id_paciente: id, ...dadosPaciente };
    }
};

module.exports = pacienteService;
