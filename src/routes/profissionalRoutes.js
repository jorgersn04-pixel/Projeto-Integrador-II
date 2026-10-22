const express = require('express');
const profissionalController = require('../controllers/profissionalController');

const router = express.Router();

router.post('/login', profissionalController.login);

module.exports = router;
