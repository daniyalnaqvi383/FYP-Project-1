const express = require("express");
const { signupUser, loginUser, googleSignup, getUser, logoutUser } = require("../../Controller/Web/signControler.js");
const authMiddleware = require("../../Middlewre/Middlewere.js");

const signRoute = express.Router();

signRoute.post("/signup", signupUser);
signRoute.post("/login", loginUser);
signRoute.post("/google-signup", googleSignup);
signRoute.post("/logout", logoutUser);

signRoute.get("/me", authMiddleware, getUser);


//admin


module.exports = signRoute;
