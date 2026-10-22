function verificarCargo(cargosPermitidos) {
    return (req, res, next) => {
        const cargo = req.header('x-profissional-cargo');
        const listaCargos = Array.isArray(cargosPermitidos)
            ? cargosPermitidos
            : [cargosPermitidos];

        if (!listaCargos.includes(cargo)) {
            return res.status(403).json({
                mensagem: 'Acesso negado para o cargo informado.'
            });
        }

        next();
    };
}

module.exports = verificarCargo;
