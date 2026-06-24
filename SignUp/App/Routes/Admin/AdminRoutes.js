const express = require("express");
const { loginAdmin, getAdmin, logoutAdmin } = require("../../Controller/Admin/AdminController.js");
const adminAuth = require("../../Middlewre/authAdmin.js");

const adminRoute = express.Router();

// Admin login route
adminRoute.post("/login", loginAdmin);

adminRoute.get("/me", adminAuth, getAdmin); 

adminRoute.get("/logout", logoutAdmin);


module.exports = adminRoute;
