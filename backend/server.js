const express = require('express');
const oracledb = require('oracledb');
const app = express();

app.use(express.json()); // Para conseguir ler o JSON vindo do front

async function salvarNoBanco(dados) {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "seu_usuario",
            password: "sua_password",
            connectString: "localhost/XEPDB1" // Verifique sua string de conexão
        });

        const sql = `INSERT INTO alunos (nome, plano) VALUES (:1, :2)`;
        await connection.execute(sql, [dados.nome, dados.plano], { autoCommit: true });

    } finally {
        if (connection) await connection.close();
    }
}

app.post('/cadastro-academia', async (req, res) => {
    try {
        await salvarNoBanco(req.body);
        res.status(200).send("Dados salvos com sucesso!");
    } catch (err) {
        res.status(500).send("Erro ao salvar: " + err.message);
    }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
