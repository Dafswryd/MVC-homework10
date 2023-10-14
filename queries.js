const Pool = require('pg').Pool;
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'homework9',
    password: '@Ganteng2911',
    port: '5432'
});

module.exports = pool;
