const db = require('../config/db');

class AtendimentoRepository {
    async obterUltimoId() {
        const [rows] = await db.query(
            'SELECT id_atendimento FROM atendimento ORDER BY id_atendimento DESC LIMIT 1'
        );

        return rows.length > 0 ? rows[0].id_atendimento : 0;
    }

    async criarAtendimento(numero, idPaciente, idRecepcionista) {
        const [resultado] = await db.query(
            `INSERT INTO atendimento
                (numero, id_paciente, id_recepcionista, status)
             VALUES (?, ?, ?, 'AGUARDANDO_TRIAGEM')`,
            [numero, idPaciente, idRecepcionista]
        );

        return resultado.insertId;
    }
}

module.exports = new AtendimentoRepository();
