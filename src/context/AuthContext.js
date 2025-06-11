"use client"; // 1️⃣

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AuthContext = createContext();

// Tracks the current user
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the user info (email, uid, etc.)
  const [loading, setLoading] = useState(true); // Tracks whether Firebase auth is still checking

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to auth context
export const useCurrentUser = () => useContext(AuthContext);
