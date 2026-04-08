"use client";

import { useState } from "react";

import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-[320px]">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-green-900 mb-6">
          Login
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-xl mb-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot */}
        <p className="text-sm text-right text-gray-500 mb-4 cursor-pointer">
          Forgot Password?
        </p>

        {/* Login Button */}
        <button className="w-full bg-green-800 text-white py-3 rounded-xl font-semibold hover:bg-green-900 transition">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-gray-400 text-sm">or</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google */}
        <button className="w-full border py-3 rounded-xl mb-3 hover:bg-gray-100 transition">
          Continue with Google
        </button>

        {/* Apple */}
        <button className="w-full bg-green-500 text-white py-3 rounded-xl mb-3 hover:bg-green-600 transition">
          Continue with Apple
        </button>

        <button className="w-full border py-3 rounded-xl hover:bg-gray-100 transition">
  Continue as Guest
</button>

<p className="text-sm text-center mt-4 text-gray-500">
  Don’t have an account?{" "}
  <Link href="/signup" className="text-green-700 font-medium">
    Sign Up
  </Link>
</p>
      </div>
    </div>
  );
}