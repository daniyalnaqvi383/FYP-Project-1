// App/Controller/Web/subscriberController.js ke top par ye path lagayein:
const modelSubscriber = require("../../Models/subscriberModel.js"); 

const subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const emailExist = await modelSubscriber.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ success: false, message: "You are already a subscriber! ✨" });
    }

    const newSubscriber = new modelSubscriber({ email });
    await newSubscriber.save();

    res.status(200).json({ success: true, message: "Subscribed successfully! 🎉" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { subscribeEmail };