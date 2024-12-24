const { body, validationResult } = require("express-validator");
const db = require("../db/queries"); // check if this is the correct sql file to work with
const bcrypt = require("bcryptjs");

const validateSignUp = [
    body("firstName")
    .notEmpty()
    .withMessage("Field Cannot Be Empty"),
    body("lastName")
    .notEmpty("Field Cannot Be Empty")
    .withMessage(),
    body("email")
    .isEmail()
    .withMessage("Please Enter a Valid Email")
    .notEmpty(),
    body("username")
    .notEmpty()
    .withMessage("Please Enter a Username"),
    body("password")
    .isLength({ min: 4 })
    .withMessage("The Password Must Be More Than 4 Characters")
    .isLength({ max: 25 })
    .withMessage("The Password Must Be Less Than 20 Characters"),
    body("confirmPassword")
    .custom((val, { req }) => {
        if (val != req.body.pasword) {
            throw new Error("Passwords Do Not Match!");
        }
        return true;
    }),
];

async function signUpGet(req, res) {
    res.render("signup", { errors: [], data: [] });
}

async function signUpPost(req, res, next) {
    try {
        const errors = validationResult(req);
        const isAdmin = req.body.isadmin ? true : false;
        if (!errors.isEmpty()) {
            return res
            .status(400)
            .render("signup", { errors: errors.array, data: req.body })
        }

        const {
            firstName, 
            lastName,
            username,
            password,
        } = req.body;

        bcrypt.hash(password, 10, async (err, hashedPassword) =>{
            if (err) console.log("Something Went Wrong With Hashing the Password");
            else {
                await db.addMember(firstName, lastName, username, hashedPassword);
                res.redirect("/"); // or login
            }
        });
    } catch (err) {
        console.log(err);
        return next;
    }
}

module.exports = {
    validateSignUp,
    signUpGet,
    signUpPost
}