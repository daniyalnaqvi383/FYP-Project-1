let mongoose = require("mongoose");

let signSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Google/Firebase ke liye optional
});

let modelSign = mongoose.model("sign", signSchema);
module.exports = modelSign;
