require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.PG_HOST,  
    user: process.env.PG_USER, 
    database: process.env.DB_DATABASE,
    password: process.env.PG_PASSWORD,  
    port: process.env.PG_PORT, 
});

module.exports = pool;