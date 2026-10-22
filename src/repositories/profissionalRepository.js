const db = require('../config/db');

class ProfissionalRepository {
    async buscarPorEmail(email) {
        const sql = `
            SELECT 
                id_profissional,
                nome_completo,
                cargo,
                email,
                senha,
                ativo
            FROM profissional
            WHERE email = ?
            LIMIT 1
        `;

        const [rows] = await db.execute(sql, [email]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = new ProfissionalRepository();