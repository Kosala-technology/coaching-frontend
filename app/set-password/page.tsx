import API_URL from "@/app/lib/config";
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetPassword = async () => {
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords do not match");
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
        <h2 className="text-center text-2xl font-bold text-green-900 mb-2">Set Password</h2>
        <p className="text-center text-xs text-gray-500 mb-6">Create a password for your account</p>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-200 rounded-xl px-3 py-3 mb-3 outline-none text-sm text-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-gray-200 rounded-xl px-3 py-3 mb-6 outline-none text-sm text-gray-700"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
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