"use client";

import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle user logins when the form is submitted

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/");

      await updateProfile(auth.currentUser, { displayName: username });
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle sign in with google
  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await user.getIdToken(true);
      console.log("Token:", token);
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={handleLogin}
        className="mx-auto h-48 flex flex-col h-screen space-y-4 iems-center mt-10 p-8 max-w-md rounded-lg bg-white shadow-lg"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="px-4 py-2 border border-gray-900 rounded w-full"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          className="px-4 py-2 border border-gray-900 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-950 px-4 py-2 "
        >
          {loading ? "Loging In..." : "Log In"}
        </button>
        <button
          onClick={handleGoogleSignin}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full max-w-xs border border-gray-300 rounded-md bg-white hover:bg-gray-400 px-4 py-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span className="text-gray-700 font-medium text-sm">
            {loading ? "Signing in..." : "Sign in with Google"}
          </span>
        </button>
        <a href="/auth/signup" className="hover:text-blue-800">
          Don't have an account ? Create account
        </a>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
