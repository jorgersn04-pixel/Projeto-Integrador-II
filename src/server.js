const express = require('express');
const cors = require('cors');
require('dotenv').config();

const atendimentoRoutes = require('./routes/atendimentoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({ mensagem: 'API do Pronto Socorro - Rodando perfeitamente!' });
});

app.use('/api/atendimentos', atendimentoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
