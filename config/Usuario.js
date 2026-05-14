/**
 * Módulo de acesso ao banco Oracle para tabela Aluno
 * Fornece funções mínimas usadas pela aplicação:
 * - findOne({ where: { email } })
 * - findOne({ where: { telefone } })
 * - create(data)
 */

const { getConnection, oracledb } = require('./db');

async function findOne({ where }) {
    if (!where) return null;

    let key = Object.keys(where)[0];
    let value = where[key];

    const col = key;
    const sql = `SELECT * FROM Aluno WHERE ${col} = :v`;
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute(sql, { v: value }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        await conn.close();
        return result.rows[0] || null;
    } catch (err) {
        if (conn) try { await conn.close(); } catch (e) {}
        throw err;
    }
}

async function create(data) {
    const fields = [
        'nome','data_nascimento','cpf','rg','telefone','email','cep','logradouro','numero',
        'complemento','bairro','cidade','uf','nivelTreino','qtdTreino','altura','peso','tempo','dias','senha'
    ];

    const cols = [];
    const binds = {};
    const bindNames = [];

    for (const f of fields) {
        if (data[f] !== undefined) {
            cols.push(f);
            const bname = f;
            bindNames.push(':' + bname);
            binds[bname] = data[f];
        }
    }

    const sql = `INSERT INTO Aluno (${cols.join(',')}) VALUES (${bindNames.join(',')}) RETURNING idAluno INTO :id`;
    let conn;
    try {
        conn = await getConnection();
        binds.id = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER };
        const result = await conn.execute(sql, binds, { autoCommit: true });
        const id = result.outBinds.id[0] || result.outBinds.id;
        await conn.close();
        return { idAluno: id };
    } catch (err) {
        if (conn) try { await conn.close(); } catch (e) {}
        throw err;
    }
}

module.exports = {
    findOne,
    create
};
