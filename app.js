const express = require("express");
const app = express();
const PORT = 3000;
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");      

app.use(express.urlencoded({ extended: false }));
app.use(passport.session());

// Session Config
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}))

// Set up routes/routers here

app.listen(PORT, () => {
    console.log(`Express App on PORT ${PORT}`);
})

// https://github.com/kmthehippie/members_only_sql
// https://github.com/NewRedRoses/members-only
// https://github.com/katiegd/members-only