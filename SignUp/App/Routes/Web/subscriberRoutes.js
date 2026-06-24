const express = require("express");
// 💡 FIX: Destructuring ({ }) use karke direct function import karein
const { subscribeEmail } = require("../../Controller/Web/subscriberController.js");

const subscriberRouter = express.Router();

// Ab yahan handler direct function ban jayega aur crash nahi karega
subscriberRouter.post("/subscribe", subscribeEmail);

module.exports = subscriberRouter;