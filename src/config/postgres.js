require('dotenv').config();

const postgres = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME,
    connectionLimit: process.env.DB_POOL_CONNECTION_LIMIT,
};

module.exports = postgres;
