"use client";
import React, { useState } from "react";
import axios from "@/lib/axios";
import { useCurrentUser } from "@/context/AuthContext";
export default function BookingForm() {
  const [formData, setFormData] = useState({
    serviceType: "",
    date: "",
    timeSlot: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useCurrentUser();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!user) {
      setError("You must be logged in to book");
      return;
    }
    try {
      setLoading(true);
      const token = await user.getIdToken(true); // always fresh
      const response = await axios.post("/api/bookings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Booking created successfully!");
      setFormData({ serviceType: "", date: "", timeSlot: "", notes: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create booking");
    }
  };
  if (authLoading) return <p>Loading user...</p>;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white rounded-2xl p-8 space-y-5 shadow-md w-full"
      >
        <h1 className="text-xl font-bold">Book Appointment</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div className="space-y-2">
          <label className="block text-black font-medium">Service Type</label>
          <input
            type="text"
            name="serviceType"
            value={formData.serviceType ?? ""}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 resize-none border-black"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-black font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date ?? ""}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 resize-none border-black"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-black font-medium">Time Slot</label>
          <input
            type="text"
            name="timeSlot"
            placeholder="e.g. 10:00 AM - 11:00 AM"
            value={formData.timeSlot ?? ""}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 resize-none border-black"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-black font-medium">
            {" "}
            Notes (optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes ?? ""}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-4 py-2 resize-none border-black text-black font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className=" bg-blue-800 text-white px-4 py-2 rounded-3xl cursor-pointer hover:bg-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
