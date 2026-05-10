// Teste: faz POST no endpoint /cadastro-form e verifica no Oracle se o registro foi criado
// Requisitos: servidor rodando (node index.js), ORACLE Instant Client instalado, variáveis de ambiente configuradas

const axios = require('axios');
const oracledb = require('oracledb');

const SERVER = process.env.SERVER_URL || 'http://localhost:3000';
const DB_USER = process.env.DB_USER || process.env.ORACLE_USER || 'app_user';
const DB_PASS = process.env.DB_PASS || process.env.ORACLE_PASS || 'sua_senha';
const DB_CONNECT = process.env.DB_CONNECT || process.env.ORACLE_CONNECT || 'localhost/XEPDB1';

async function wait(ms){ return new Promise(r=>setTimeout(r, ms)); }

async function main(){
    try{
        console.log('Enviando requisição de cadastro de teste...');
        const dados = {
            nome: 'Teste Insercao',
            email: 'teste_insercao@example.com',
            tel: '11999990000',
            logradouro: 'Rua Teste',
            num: '10',
            complemento: 'apt',
            bairro: 'Bairro',
            cidade: 'Cidade',
            uf: 'SP',
            nascimento: '1990-01-01',
            senha: 'Senha@123',
            confirmarSenha: 'Senha@123',
            cpf: '99999999999',
            rg: '999999999',
            cep: '01001000',
            altura: '1.75',
            peso: '80',
            tempo: '6 meses',
            dias: '4'
        };

        const res = await axios.post(SERVER + '/cadastro-form', dados, { timeout: 10000 });
        console.log('Resposta do servidor:', res.status, res.data);

        // aguardar 1s antes de verificar DB
        await wait(1000);

        console.log('Verificando no Oracle...');
        const conn = await oracledb.getConnection({ user: DB_USER, password: DB_PASS, connectString: DB_CONNECT });
        const result = await conn.execute(
            `SELECT idAluno, nome, email, telefone FROM Aluno WHERE email = :e`,
            { e: dados.email },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        await conn.close();

        if (result.rows && result.rows.length > 0){
            console.log('✅ Registro encontrado no banco:');
            console.log(result.rows[0]);
        } else {
            console.log('❌ Registro NÃO encontrado no banco.');
        }

    } catch (err){
        if (err.response) {
            console.error('Erro do servidor:', err.response.status, err.response.data);
        } else {
            console.error('Erro:', err.message || err);
        }
    }
}

main();
