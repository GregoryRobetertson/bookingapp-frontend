"use client";
import axios from "axios";
import { useEffect } from "react";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Services from "../components/Services";
import Footer from "../components/Footer";
export default function Home() {
  useEffect(() => {
    async function wakeupServer() {
      try {
        const response = await fetch(
          "https://bookingapp-backend-67cv.onrender.com"
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
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Footer />
      </main>
    </>
  );
}
