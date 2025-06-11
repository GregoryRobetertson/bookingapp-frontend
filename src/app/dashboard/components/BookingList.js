"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "@/context/AuthContext";

export default function BookingList() {
  const { user, loading: authLoading } = useCurrentUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setError("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken(true);
        console.log("Generated Token:", token);
        const response = await axios.get("/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchBookings();
  }, [user, authLoading]);

  if (authLoading || loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking._id}
            className="border p-4 rounded shadow-sm bg-gray-50"
          >
            <p>
              <strong>Service:</strong> {booking.serviceType}
            </p>
            <p>
              <strong>Date:</strong> {booking.date}
            </p>
            <p>
              <strong>Time:</strong> {booking.timeSlot}
            </p>
            {booking.notes && (
              <p>
                <strong>Notes:</strong> {booking.notes}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
