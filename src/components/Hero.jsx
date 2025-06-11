import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <main className="[background-image:url(/images/background.webp)] bg-cover bg-center bg-no-repeat relative min-h-screen flex items-center justify-center">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Content Section */}
      <section className="relative z-10 text-white text-center px-6 sm:px-12 max-w-3xl w-full">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in">
          Welcome to <span className="text-primary-500">Book Easy</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-300 animate-fade-in delay-100">
          Book appointments effortlessly and quickly
        </p>

        <Link
          href="/dashboard/book/booking-form"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-800 transition-all duration-300 rounded-full text-white text-lg font-semibold shadow-lg animate-fade-in delay-200"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
