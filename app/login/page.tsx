"use client";

import API_URL from "@/app/lib/config";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful! Welcome back.");
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EAEAE5]">
      <div className="bg-white w-[350px] rounded-2xl p-6 shadow-md">

        <h2 className="text-center text-2xl font-bold text-green-900 mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 mb-3 bg-white focus-within:ring-1 focus-within:ring-gray-300">
          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.5"/>
            <path d="M2 7l10 7 10-7" strokeWidth="1.5"/>
          </svg>
          <input
            type="email"
            placeholder="Email"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 mb-2 bg-white focus-within:ring-1 focus-within:ring-gray-300">
          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.5"/>
            <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.5"/>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showPassword ? (
                <path strokeWidth="1.5" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M3 3l18 18"/>
              ) : (
                <>
                  <path strokeWidth="1.5" d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/>
                  <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Forgot Password */}
        <p className="text-sm text-center text-gray-500 mb-4 cursor-pointer underline underline-offset-2">
          Forgot Password?
        </p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#1a2e1a] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#243824] transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-200"></div>
          <p className="px-3 text-gray-400 text-sm">or</p>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google */}
        <button className="w-full bg-[#F2F2F2] border border-gray-200 py-3 rounded-full mb-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Apple */}
        <button className="w-full bg-[#7DC043] text-black py-3 rounded-full mb-3 text-sm font-semibold hover:bg-[#6aad35] transition flex items-center justify-center gap-2">
          <FaApple size={20} />
          Continue with Apple
        </button>

        {/* Guest */}
        <button className="w-full bg-[#F2F2F2] border border-gray-200 py-3 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
          Continue As Guest
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Need an account?{" "}
          <Link href="/signup" className="text-gray-800 font-semibold">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}