const db = require('../config/db');

class TriagemRepository {
    async criarTriagem(dados) {
        const sql = `
            INSERT INTO triagem (
                id_atendimento,
                id_enfermeiro,
                pressao_arterial,
                temperatura,
                frequencia_cardiaca,
                queixa_principal,
                classificacao_manchester
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            dados.id_atendimento,
            dados.id_enfermeiro,
            dados.pressao_arterial || null,
            dados.temperatura || null,
            dados.frequencia_cardiaca || null,
            dados.queixa_principal,
            dados.classificacao_manchester
        ];

        const [result] = await db.execute(sql, params);
        return result.insertId;
    }
}

module.exports = new TriagemRepository();
