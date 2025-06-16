"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function wakeupServer() {
      try {
        const response = await fetch(
          "https://bookingapp-backend-67cv.onrender.com/api/services"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Services:", data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    wakeupServer();
  }, []);
  return (
    <div>
      {services.map((service) => (
        <div key={service._id} className="border p-4 rounded-lg shadow-lg mb-6">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-bold">{service.name}</h2>
          <p className="text-gray-600">{service.description}</p>
          <p className="text-lg font-semibold mt-2">${service.price}</p>
          {service.workImage && (
            <img
              src={service.workImage}
              alt={`${service.name} work`}
              className="w-full h-48 object-cover rounded-md mt-4"
            />
          )}
        </div>
      ))}
    </div>
  );
}
