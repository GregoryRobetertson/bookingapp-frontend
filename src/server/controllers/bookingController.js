const Booking = require("../models/Booking");

// @desc create a new booking
// @route Post /api/bookings
const createBooking = async (req, res) => {
  try {
    const { serviceType, date, timeSlot, notes } = req.body;

    if (!serviceType || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "Service type, date, and time slot are required" });
      console.error("Error creating booking", error);
    }

    const booking = await Booking.create({
      user: req.user.id,
      serviceType,
      date,
      timeSlot,
      notes,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc find all users bookings
// @route Get /api/my-bookings
const getMyBookings = async (req, res) => {
  try {
    console.log("User in request:", req.user);

    const bookings = await Booking.find({ user: req.user._id });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in getMyBookings:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc find user bookings by id
// @route Get /api/bookings/:id
const getBookingsById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found" });
    }
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error getting booking by ID", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid booking ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// @desc cancel bookings
// @route delete /api/bookings/:id
const cancelBookings = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found" });
    }
    if (booking.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this booking" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Error cancelling booking", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid booking ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingsById,
  cancelBookings,
};
