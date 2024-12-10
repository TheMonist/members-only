require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => {
    console.log(`Express App on PORT ${PORT}`);
})

// https://github.com/kmthehippie/members_only_sql
// https://github.com/NewRedRoses/members-only
// https://github.com/katiegd/members-only