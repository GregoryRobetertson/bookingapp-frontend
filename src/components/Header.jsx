"use client";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import app from "../lib/firebase";
const navLinks = [
  { href: "#home", label: "Home" },
  { href: "/dashboard/book/booking-form", label: "Book Now" },
  { href: "/dashboard/book/booking-list", label: "View Appointment" },
];
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <header className="p-4 shadow-sm bg-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl text-blue-600">
          Book Easy
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {!user ? (
            <>
              <Link href="/auth/signup" className="hover:text-blue-600">
                Sign Up
              </Link>
              <Link href="/auth/login" className="hover:text-blue-600">
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-800">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      <div
        className={`md:hidden bg-white transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-96 opacity-100 py-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col space-y-3 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-800 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!user ? (
            <>
              <Link
                href="/auth/signup"
                className="hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                href="/auth/login"
                className="hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-800">
                {user.displayName || user.email}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
