## Integrantes

* Jorge Rodrigues dos Santos Neto

# SGPS - Sistema de Gestão de Pronto Socorro

## Descrição

Sistema desenvolvido em Node.js e MySQL para gerenciamento do fluxo de pacientes em Pronto Socorro utilizando o Protocolo de Manchester.

O sistema permite:

- Login por perfil de acesso
- Cadastro e recepção de pacientes
- Triagem com classificação de risco
- Geração de fila de atendimento dinâmico
- Atendimento médico e finalização de consultas
- Dashboard visual em Single Page Application (SPA)

---

# Tecnologias utilizadas

- Node.js
- Express
- MySQL Workbench 8.0 CE
- mysql2
- dotenv
- nodemon

---

# Estrutura do projeto

SGPS/
│
├── database/
│   └── schema.sql
├── public/
│   ├── css/
│   ├── js/
│   └── index.html
├── scripts/
│   └── seedIntegrantes.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── server.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

---

# Como executar o projeto

## 1. Clone o repositório

git clone LINK_DO_REPOSITORIO

---

## 2. Instale as dependências

npm install

---

## 3. Inicie o servidor

npm run dev

---

# Configuração do banco

## 1. Abra o MySQL Workbench

Execute o arquivo:

database/schema.sql

Isso criará:
- banco de dados
- tabelas
- usuários iniciais

---

## 2. Configure o arquivo .env

Crie um arquivo chamado:

.env

na raiz do projeto.

Adicione:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=hospital_db
```
