const express = require('express');
const triagemController = require('../controllers/triagemController');
const verificarCargo = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verificarCargo('Enfermeiro'), triagemController.criar);

module.exports = router;
