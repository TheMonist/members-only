const { Router } = require("express");
const signInRouter = Router();
const signInController = require("../controllers/signUpController");

signInRouter.get("/", signInController.signUpGet);
signInRouter.post("/", signInController.validateSignUp, signInController.signUpPost);

module.exports = signInRouter;