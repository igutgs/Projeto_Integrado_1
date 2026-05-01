const oracledb = require('oracledb');

async function conectar() {
    return await oracledb.getConnection({
        user: "c##igor",
        password: "Walle",
        connectString: "localhost/XEPDB1"
    });
}

module.exports = conectar;