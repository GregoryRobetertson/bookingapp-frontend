"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle user signups when the form is submitted
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Creates a new user with firebase auth using email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, { displayName: username });
      setUsername("");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up with google
  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign in: success", result.user);
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
        onSubmit={handleSignup}
        className="mx-auto h-48 flex flex-col h-screen space-y-4 iems-center mt-10 p-8 max-w-md rounded-lg bg-white shadow-lg"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-900 rounded"
        />
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-2 border border-gray-900 rounded"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          className="w-full px-4 py-2 border border-gray-900 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-950 px-4 py-2"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full max-w-xs border border-gray-300 rounded-md bg-white hover:bg-gray-400 px-4 py-2 shadow-sm disabled:opacity-50 transition"
        >
          <span className="text-gray-700 font-medium text-sm ">
            {loading ? "Signing in..." : "Sign in with Google"}
          </span>
        </button>
        <a href="/auth/login" className="hover:text-blue-800">
          Have an account already ? Login here
        </a>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
