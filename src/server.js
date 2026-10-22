const express = require('express');
const cors = require('cors');
require('dotenv').config();

const atendimentoRoutes = require('./routes/atendimentoRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const triagemRoutes = require('./routes/triagemRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const frontendRoutes = require('./routes/frontendRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({ mensagem: 'API do Pronto Socorro - Rodando perfeitamente!' });
});

app.use('/', frontendRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/atendimentos', atendimentoRoutes);
app.use('/api/triagens', triagemRoutes);
app.use('/api/medicos', medicoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
