const express = require('express');
const atendimentoController = require('../controllers/atendimentoController');
const verificarCargo = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
    '/',
    verificarCargo(['Recepcionista']),
    atendimentoController.criar
);

module.exports = router;
