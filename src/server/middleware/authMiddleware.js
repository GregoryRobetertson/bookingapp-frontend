const admin = require("../firebaseAdmin");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🔐 Received token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ firebaseUid: decoded.uid }); // ✅ use `let` instead of `const`
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name || "Unnamed User",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Firebase auth middleware error:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = auth;
