// this is just to test if everything is working
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => {
    console.log(`Express App on PORT ${PORT}`);
    console.log(process.env);
})