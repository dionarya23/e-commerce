const postgres = require('../../config/postgres')
const { Pool } = require('pg');

const pool = new Pool({
    user: postgres.user,
    database: postgres.db,
    password: postgres.password,
    port: postgres.port, 
    host: postgres.host,
    connectionTimeoutMillis: postgres.connectionLimit
  });

  pool
    .connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
    });
  
module.exports = pool;