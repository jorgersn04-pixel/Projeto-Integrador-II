function verificarCargo(cargosPermitidos) {
    return (req, res, next) => {
        const cargo = req.header('x-profissional-cargo');

        if (!Array.isArray(cargosPermitidos) || !cargosPermitidos.includes(cargo)) {
            return res.status(403).json({
                mensagem: 'Acesso negado para o cargo informado.'
            });
        }

        next();
    };
}

module.exports = verificarCargo;
