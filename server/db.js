const { Pool } = require("pg");

const {
    DB_HOST = 'db',
    DB_USER = 'notes_user',
    DB_PASSWORD = 'notes_pass',
    DB_NAME = 'notes_db',
    DB_PORT = 5432,
} = process.env;

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT),
    max: 5
});

module.exports = pool;
