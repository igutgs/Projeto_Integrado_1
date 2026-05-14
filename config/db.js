/**
 * Conexão Oracle usando node-oracledb
 * Configure via variáveis de ambiente:
 * - DB_USER (ex: ORACLE_USER)
 * - DB_PASS
 * - DB_CONNECT (ex: localhost/XEPDB1)
 * - ORACLE_CLIENT_LIB_DIR (opcional, necessário no Windows se usar Instant Client)
 */

const oracledb = require('oracledb');

if (process.env.ORACLE_CLIENT_LIB_DIR) {
    try {
        oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LIB_DIR });
    } catch (err) {
        console.warn('Não foi possível inicializar Oracle Client automaticamente:', err.message);
    }
}

const DB_CONFIG = {
    user: process.env.DB_USER || process.env.ORACLE_USER || 'system',
    password: process.env.DB_PASS || process.env.ORACLE_PASS || '',
    connectString: process.env.DB_CONNECT || process.env.ORACLE_CONNECT || 'localhost/XE'
};

async function getConnection() {
    return await oracledb.getConnection(DB_CONFIG);
}

async function testConnection() {
    try {
        const conn = await getConnection();
        await conn.close();
        console.log('Conexão com Oracle realizada com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao Oracle:', err.message || err);
    }
}

//teste
testConnection();

module.exports = {
    oracledb,
    getConnection
};
