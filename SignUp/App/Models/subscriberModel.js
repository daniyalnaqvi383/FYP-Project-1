const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ek email bar-bar subscribe na ho sake
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true } // Is se pata chalega kis user ne kab subscribe kiya
);

const modelSubscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = modelSubscriber;