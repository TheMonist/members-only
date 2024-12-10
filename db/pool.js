require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    host: PG_HOST,  
    user: PG_USER, 
    database: DB_DATABASE,
    password: PG_PASSWORD,  
    port: PG_PORT, 
});

module.exports = pool;