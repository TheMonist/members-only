const pool = require("./pool");

function formatDate(date) {
    const newDate = new Date(date);
  
    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = newDate.toLocaleString("en-US", dateOptions);
  
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedTime = newDate.toLocaleString("en-US", timeOptions);
    return { formattedDate, formattedTime };
  }  

async function addMember(firstName, lastName, username, password) {
    await pool.query(`INSERT INTO members (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)`, [firstName, lastName, username, password]);
}

async function getUsername(username) {
    const { rows } = await pool.query(`SELECT * FROM members WHERE username = $1`, [username]);
    return rows;  
}

async function getAllMessages() {
    const { rows } = await pool.query(
        `SELECT messages.id, messages.title, messages.message, messages.timestamp, messages.firstname, messages.lastname, FROM messages JOIN members ON messages.user_id = members.user_id ORDER BY messages.timestamp DESC`
    );
    
    const formattedMessages = rows.map((message) => ({
        ...message,
        timestamp: formatDate(message.timestamp)
    }));

    return formattedMessages;
}

async function addMessage(userId, title, message) {
    await pool.query(`INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)`, [userId, title, message]);
}

async function deleteMessage(messageId) {
    await pool.query(`DELETE FROM messages WHERE message_id = $1`, [messageId]);
}

module.exports = {
    addMember,
    getUsername,
    getAllMessages,
    addMessage,
    deleteMessage
}