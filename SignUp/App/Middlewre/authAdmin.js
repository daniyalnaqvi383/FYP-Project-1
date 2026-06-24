const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, login again ❌" });
    }

    // Bearer <token> format handle
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.role !== "admin") {
      return res.status(401).json({ message: "Invalid or unauthorized token ❌" });
    }

    req.admin = decoded; // store admin info
    next();
  } catch (err) {
    return res.status(500).json({ message: `Auth error: ${err.message}` });
  }
};

module.exports = adminAuth;
