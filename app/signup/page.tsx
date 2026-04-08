"use client";

import { useState } from "react";

import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-[320px]">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-green-900 mb-6">
          Create Account
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 p-3 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        {/* Signup Button */}
        <button className="w-full bg-green-800 text-white py-3 rounded-xl font-semibold mt-3 hover:bg-green-900 transition">
          Sign Up
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

        {/* Login Link */}
        <p className="text-sm text-center text-gray-500 mt-4">
  Already have an account?{" "}
  <Link href="/login" className="text-green-700 font-medium">
    Login
  </Link>
</p>
      </div>
    </div>
  );
}