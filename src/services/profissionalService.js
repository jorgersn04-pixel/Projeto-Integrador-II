const profissionalRepository = require('../repositories/profissionalRepository');

const profissionalService = {
    async login(email, senha) {
        if (!email || !senha) {
            const erro = new Error('email e senha são obrigatórios.');
            erro.statusCode = 400;
            throw erro;
        }

        const profissional = await profissionalRepository.buscarPorEmail(email);

        if (!profissional || !profissional.ativo) {
            const erro = new Error('Credenciais inválidas.');
            erro.statusCode = 401;
            throw erro;
        }

        if (profissional.senha !== senha) {
            const erro = new Error('Credenciais inválidas.');
            erro.statusCode = 401;
            throw erro;
        }

        return {
            id_profissional: profissional.id_profissional,
            nome_completo: profissional.nome_completo,
            cargo: profissional.cargo,
            email: profissional.email
        };
    }
};

module.exports = profissionalService;
