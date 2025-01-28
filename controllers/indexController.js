const db = require("../db/queries");

async function indexGet(req, res) {
    const messages = db.getAllMessages();

    res.redirect("index", { messages: messages });
}

module.exports = {
    indexGet,
}