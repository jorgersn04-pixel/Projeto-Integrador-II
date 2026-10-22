const express = require('express');
const pacienteController = require('../controllers/pacienteController');
const verificarCargo = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarCargo('Recepcionista'), pacienteController.listar);
router.post('/', verificarCargo('Recepcionista'), pacienteController.criar);

module.exports = router;
