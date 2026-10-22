const express = require('express');
const medicoController = require('../controllers/medicoController');
const verificarCargo = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/painel', verificarCargo('Medico'), medicoController.listarPainel);
router.post('/iniciar', verificarCargo('Medico'), medicoController.iniciar);
router.put('/finalizar', verificarCargo('Medico'), medicoController.finalizar);

module.exports = router;
