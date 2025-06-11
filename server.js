const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./src/server/routes/auth");
const bookingRoutes = require("./src/server/routes/bookingRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
// Mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => console.log("Server running"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
