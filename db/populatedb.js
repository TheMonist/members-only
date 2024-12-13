const { Client } = require("pg");
require("dotenv").config();

async function main() {
    console.log("seeding");
    const client = new Client({
        connectionString: process.env.DB_URL
    });

    try {
        await client.connect();
        await client.query();
        // add additional queries
    } catch (err) {
        console.error("Error: ", err)
    } finally {
        await client.end();
        console.log("Done");
    }
}

// main();