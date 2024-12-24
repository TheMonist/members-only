const { body, validationResult } = require("express-validator");
const db = require("../db/pool");
const LocalStrategy = require('passport-local').Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.query("SELECT * FROM members WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect Password!" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await db.query(`SELECT * FROM members WHERE id = $1`, [id]);
        const user = rows[0];
        done(null, user)
    } catch (err) {
        done(err)
    }
});

async function loginGet(req, res) {
    res.render("login", {errors: [], data: []});
}

async function loginPost(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.log("There Was an Error: " + err);
            return next(err);
        }

        if (!user) {
            return res.redirect("/login?error=" + encodeURIComponent(info.message), {
                message: "User Was Not Found!",
            }); 
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/");
        });
    })(req, res, next)
}

module.exports = {
    loginGet,
    loginPost
}