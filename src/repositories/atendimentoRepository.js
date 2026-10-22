const db = require('../config/db');

class AtendimentoRepository {
    async obterUltimoId() {
        const [rows] = await db.query(
            'SELECT id_atendimento FROM atendimento ORDER BY id_atendimento DESC LIMIT 1'
        );

        return rows.length > 0 ? rows[0].id_atendimento : 0;
    }

    async criarAtendimento(numero, idPaciente, idRecepcionista) {
        const sql = `
            INSERT INTO atendimento (numero_atendimento, id_paciente, id_recepcionista, status) 
            VALUES (?, ?, ?, 'AGUARDANDO_TRIAGEM')
        `;

        const [result] = await db.execute(sql, [numero, idPaciente, idRecepcionista]);
        return result.insertId;
    }

    async atualizarStatusAtendimento(idAtendimento, status) {
        const sql = `
            UPDATE atendimento
               SET status = ?
             WHERE id_atendimento = ?
        `;

        const [result] = await db.execute(sql, [status, idAtendimento]);
        return result.affectedRows;
    }
}

module.exports = new AtendimentoRepository();
