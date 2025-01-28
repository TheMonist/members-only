const express = require("express");
const app = express();
const PORT = 3000;
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// Set up routes/routers here
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const newMessageRouter = require("./routes/newMessageRouter");
const signUpRouter = require("./routes/signinRouter");

// Set up views here
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");      
app.use(express.static("public"));

// Session Config
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(express.urlencoded({ extended: false }));
app.use(passport.session());

// Middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRouter);
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("newMessage", newMessageRouter);
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log(`Express App on PORT ${PORT}`);
})

// https://github.com/kmthehippie/members_only_sql
// https://github.com/NewRedRoses/members-only
// https://github.com/katiegd/members-only