require('dotenv').config();
const mysql = require('mysql2/promise');

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306)
};

const integrantes = [
  {
    nome_completo: 'Gabriel Rocha',
    cpf: '111.111.111-11',
    cargo: 'Medico',
    registro_conselho: 'CRM-12345',
    especialidade: 'Cardiologia',
    email: 'gabriel.rocha@prontosocorro.com',
    senha: '123456',
    ativo: true
  },
  {
    nome_completo: 'Igor Domingos',
    cpf: '222.222.222-22',
    cargo: 'Enfermeiro',
    registro_conselho: 'COREN-22331',
    especialidade: 'Urgência e Emergência',
    email: 'igor.domingos@prontosocorro.com',
    senha: '123456',
    ativo: true
  },
  {
    nome_completo: 'Maximus Daniel',
    cpf: '333.333.333-33',
    cargo: 'Recepcionista',
    registro_conselho: null,
    especialidade: null,
    email: 'maximus.daniel@prontosocorro.com',
    senha: '123456',
    ativo: true
  },
  {
    nome_completo: 'Arthur Laranjeiras',
    cpf: '444.444.444-44',
    cargo: 'Medico',
    registro_conselho: 'CRM-67890',
    especialidade: 'Ortopedia',
    email: 'arthur.laranjeiras@prontosocorro.com',
    senha: '123456',
    ativo: true
  },
  {
    nome_completo: 'Jorge Neto',
    cpf: '555.555.555-55',
    cargo: 'Recepcionista',
    registro_conselho: null,
    especialidade: null,
    email: 'jorge.neto@prontosocorro.com',
    senha: '123456',
    ativo: true
  }
];

async function seed() {
  let connection;

  try {
    connection = await mysql.createConnection(connectionConfig);

    for (const profissional of integrantes) {
      await connection.execute(
        `
          INSERT INTO profissional (
            nome_completo,
            cpf,
            cargo,
            registro_conselho,
            especialidade,
            email,
            senha,
            ativo
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            nome_completo = VALUES(nome_completo),
            cargo = VALUES(cargo),
            registro_conselho = VALUES(registro_conselho),
            especialidade = VALUES(especialidade),
            senha = VALUES(senha),
            ativo = VALUES(ativo)
        `,
        [
          profissional.nome_completo,
          profissional.cpf,
          profissional.cargo,
          profissional.registro_conselho,
          profissional.especialidade,
          profissional.email,
          profissional.senha,
          profissional.ativo ? 1 : 0
        ]
      );
    }

    console.log('Seed de integrantes concluída com sucesso.');
  } catch (error) {
    console.error('Erro ao executar seed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seed();
