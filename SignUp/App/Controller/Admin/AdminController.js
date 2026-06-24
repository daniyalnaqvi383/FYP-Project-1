const jwt = require("jsonwebtoken");

// ✅ Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.admin_email || password !== process.env.admin_password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Admin login successful ✅",
      token,
      admin: { email, role: "admin" },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ New API: Get Admin (auto login with token)
const getAdmin = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ message: "Unauthorized ❌" });
    }

    res.status(200).json({
      message: "Admin verified ✅",
      admin: req.admin,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    // Since we're using JWTs, logout can be handled on the client side by deleting the token.
    res.status(200).json({ message: "Admin logged out successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  } 
};  

module.exports = { loginAdmin, getAdmin , logoutAdmin};
