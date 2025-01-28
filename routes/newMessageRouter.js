const { Router } = require("express");
const newMessageRouter = Router();
const db = require("../db/pool");

newMessageRouter.get("/:id", (req, res) => {
    res.redirect("/");
});

newMessageRouter.post("/:id", async (req, res) => {
    const messageId = req.params.id;
    console.log(messageId);

    try {
        await db.deleteMessage(messageId);
        res.redirect("/")
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ succees: false, error: "Failed To Delete Message" });
    }
});

module.exports = newMessageRouter;