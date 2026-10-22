const db = require('../config/db');

class MedicoRepository {
    async listarPainel() {
        const sql = `
            SELECT
                a.id_atendimento,
                a.numero_atendimento,
                a.data_hora_chegada,
                a.status,
                p.id_paciente,
                p.nome_completo AS nome_paciente,
                p.data_nascimento,
                p.sexo,
                t.classificacao_manchester,
                t.queixa_principal,
                t.pressao_arterial,
                t.temperatura,
                t.frequencia_cardiaca
            FROM atendimento a
            INNER JOIN paciente p ON p.id_paciente = a.id_paciente
            INNER JOIN triagem t ON t.id_atendimento = a.id_atendimento
            WHERE a.status = 'AGUARDANDO_MEDICO'
            ORDER BY
                FIELD(
                    t.classificacao_manchester,
                    'VERMELHO',
                    'LARANJA',
                    'AMARELO',
                    'VERDE',
                    'AZUL'
                ),
                a.data_hora_chegada ASC
        `;

        const [rows] = await db.query(sql);
        return rows;
    }

    async iniciarConsulta(idAtendimento, idMedico) {
        const conn = await db.getConnection();

        try {
            await conn.beginTransaction();

            const [updateAtendimento] = await conn.execute(
                `
                UPDATE atendimento
                   SET status = 'EM_ATENDIMENTO'
                 WHERE id_atendimento = ?
                   AND status = 'AGUARDANDO_MEDICO'
                `,
                [idAtendimento]
            );

            if (!updateAtendimento.affectedRows) {
                const erro = new Error('Atendimento não está disponível para início de consulta.');
                erro.statusCode = 409;
                throw erro;
            }

            await conn.execute(
                `
                INSERT INTO atendimento_medico (id_atendimento, id_medico)
                VALUES (?, ?)
                `,
                [idAtendimento, idMedico]
            );

            await conn.commit();

            return {
                id_atendimento: idAtendimento,
                id_medico: idMedico,
                status: 'EM_ATENDIMENTO'
            };
        } catch (erro) {
            await conn.rollback();
            throw erro;
        } finally {
            conn.release();
        }
    }

    async finalizarConsulta(idAtendimento, diagnostico, medicacoes, observacoes) {
        const conn = await db.getConnection();

        try {
            await conn.beginTransaction();

            const [updateConsulta] = await conn.execute(
                `
                UPDATE atendimento_medico
                   SET diagnostico = ?,
                       medicacoes_prescritas = ?,
                       observacoes = ?,
                       data_hora_fim = NOW()
                 WHERE id_atendimento = ?
                   AND data_hora_fim IS NULL
                `,
                [diagnostico || null, medicacoes || null, observacoes || null, idAtendimento]
            );

            if (!updateConsulta.affectedRows) {
                const erro = new Error('Consulta médica não encontrada ou já finalizada.');
                erro.statusCode = 409;
                throw erro;
            }

            await conn.execute(
                `
                UPDATE atendimento
                   SET status = 'FINALIZADO'
                 WHERE id_atendimento = ?
                `,
                [idAtendimento]
            );

            await conn.commit();

            return {
                id_atendimento: idAtendimento,
                status: 'FINALIZADO'
            };
        } catch (erro) {
            await conn.rollback();
            throw erro;
        } finally {
            conn.release();
        }
    }
}

module.exports = new MedicoRepository();
