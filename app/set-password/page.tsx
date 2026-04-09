"use client";

import API_URL from "@/app/lib/config";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetPassword = async () => {
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/auth/set-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Account created successfully! Please log in.");
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EAEAE5]">
      <div className="bg-white w-[350px] rounded-2xl p-8 shadow-md">

        <h2 className="text-center text-2xl font-bold text-green-900 mb-2">
          Set Password
        </h2>
        <p className="text-center text-xs text-gray-500 mb-6">
          Create a password for your account
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Password */}
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 mb-3 bg-white focus-within:ring-1 focus-within:ring-gray-300">
          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.5"/>
            <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.5"/>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 mb-4 bg-white focus-within:ring-1 focus-within:ring-gray-300">
          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.5"/>
            <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.5"/>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {/* Show password toggle */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="show"
            onChange={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          />
          <label htmlFor="show" className="text-sm text-gray-500 cursor-pointer">
            Show password
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSetPassword}
          disabled={loading}
          className="w-full bg-[#1a2e1a] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#243824] transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Password"}
        </button>

      </div>
    </div>
  );
}