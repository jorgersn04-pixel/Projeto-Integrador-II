const db = require('../config/db');

class PacienteRepository {
    async listarTodos() {
        const sql = `
            SELECT
                id_paciente,
                nome_completo,
                cpf,
                rg,
                nome_mae,
                nome_pai,
                data_nascimento,
                sexo,
                telefone,
                endereco,
                email
            FROM paciente
            ORDER BY id_paciente DESC
        `;

        const [rows] = await db.query(sql);
        return rows;
    }

    async criar(dadosPaciente) {
        const sql = `
            INSERT INTO paciente (
                nome_completo,
                cpf,
                rg,
                nome_mae,
                nome_pai,
                data_nascimento,
                sexo,
                telefone,
                endereco,
                email
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            dadosPaciente.nome_completo,
            dadosPaciente.cpf,
            dadosPaciente.rg,
            dadosPaciente.nome_mae,
            dadosPaciente.nome_pai || null,
            dadosPaciente.data_nascimento,
            dadosPaciente.sexo,
            dadosPaciente.telefone || null,
            dadosPaciente.endereco || null,
            dadosPaciente.email || null
        ];

        const [result] = await db.execute(sql, params);
        return result.insertId;
    }
}

module.exports = new PacienteRepository();
