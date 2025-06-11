import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-200 py-6 px-4 text-center text-sm border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-3">
        {/* App Name */}
        <h3 className="text-xl font-semibold text-blue-400 m-0">Book Easy</h3>
        {/* Copyright */}
        <p className="m-0">
          &copy; {new Date().getFullYear()} Book Easy. All rights reserved.
        </p>

        <div className="mt-2 flex justify-center space-x-4">
          <a
            href="/privacy"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="/terms"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
