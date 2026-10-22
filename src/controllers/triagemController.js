const triagemService = require('../services/triagemService');

const triagemController = {
    async criar(req, res) {
        try {
            const idEnfermeiro = req.header('x-profissional-id');

            const dados = {
                ...req.body,
                id_enfermeiro: Number(idEnfermeiro)
            };

            const triagem = await triagemService.realizarTriagem(dados);
            return res.status(201).json(triagem);
        } catch (erro) {
            return res.status(erro.statusCode || 500).json({
                mensagem: erro.message || 'Erro interno ao realizar triagem.'
            });
        }
    }
};

module.exports = triagemController;
