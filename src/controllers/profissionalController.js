const profissionalService = require('../services/profissionalService');

const profissionalController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const profissional = await profissionalService.login(email, senha);

            return res.status(200).json({
                id: profissional.id_profissional,
                nome: profissional.nome_completo,
                cargo: profissional.cargo
            });
        } catch (erro) {
            return res.status(erro.statusCode || 500).json({
                mensagem: erro.message || 'Erro interno no login.'
            });
        }
    }
};

module.exports = profissionalController;
