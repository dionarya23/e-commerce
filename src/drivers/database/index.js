const postgre = require('../../config/postgre')
const { Pool } = require('pg');

const pool = new Pool({
    user: postgre.host,
    database: postgre.db,
    password: postgre.password,
    port: postgre.port, 
    host: postgre.host,
    connectionTimeoutMillis: postgre.connectionLimit
  });
  
module.exports = pool;