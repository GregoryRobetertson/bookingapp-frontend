// routes/auth.js
const express = require("express");
const admin = require("../firebaseAdmin");
const User = require("../models/User");
const router = express.Router();

router.post("/verify-token", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name || "Unnamed User",
        email: decoded.email,
      });
    }

    res.status(200).json({ message: "User verified", user });
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
