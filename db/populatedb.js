const { Client } = require("pg");
require("dotenv").config();

const dropTable = `DROP TABLE IF EXISTS table members, messages, session`;  

const createMemberTable = `CREATE TABLE IF NOT EXISTS members (
    user_id INTEGER PRIMARY KEY GENERATED AS ALWAYS AS IDENTITY,
    firstname VARCHAR(255) NULL,
    lastname VARCHAR(255) NULL,
    username password VARCHAR(255) NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    memberstatus BOOLEAN DEFAULT true,
    isadmin BOOLEAN DEFAULT false NULL, 
    CONSTRAINT members_pkey PRIMARY KEY (id));
`;

const createMessageTable = `CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY GENERATED AS ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT messages_pkey PRIMARY KEY (id));
`;

const createSession = `CREATE TABLE IF NOT EXISTS session (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (session_id));
`;

const createDemoUsers = `INSERT INTO members (firstname, lastname, username, password, memberstatus, isadmin) 
    VALUES
    ('John', 'Smith', 'user1', '12345', true, true),
    ('Jane', 'Smith', 'user2', '67890', true, false),
    ('Hank', 'Smith', 'user3', '43210', true, false)
`;

const createDemoMessages = `INSERT INTO messages (user_id, title, message, timestamp) 
    VALUES
    (1, 'Introduction', 'Hi everyone, I''m excited to join', NOW()),
    (2, 'Need Help', 'I''m stuck on a coding problem, any advice', NOW()),
    (3, 'Quick Question', 'Anyone familar with advanced SQL joins?', NOW())
`;

async function main() {
    console.log("seeding");
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    try {
        await client.connect();
        await client.query(dropTable);
        console.log("Create Tables")
        await client.query(createMemberTable);
        await client.query(createMessageTable);
        await client.query(createSession);
        console.log("Create Demo Information")
        await client.query(createDemoUsers);
        await client.query(createDemoMessages);
    } catch (err) {
        console.error("Error: ", err)
    } finally {
        await client.end();
        console.log("Done");
    }
}

main();