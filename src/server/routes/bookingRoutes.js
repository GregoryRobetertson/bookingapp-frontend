const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookingsById,
  cancelBookings,
} = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createBooking);
router.get("/my-bookings", auth, getMyBookings);
router.get("/:id", auth, getBookingsById);
router.delete("/:id", auth, cancelBookings);

module.exports = router;
