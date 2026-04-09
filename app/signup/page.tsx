"use client";

import API_URL from "@/app/lib/config";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        const userInfoRes = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await userInfoRes.json();

        const res = await fetch(`${API_URL}/auth/google-signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.isNewUser) {
            router.push("/set-password");
          } else {
            router.push("/login");
          }
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Google signup failed. Try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("Google login failed. Try again.");
    },
  });

  const handleGuestLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Guest",
          email: `guest_${Date.now()}@guest.com`,
          password: "guest123",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Guest account created! Please log in.");
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
      <div className="bg-white w-[350px] rounded-2xl p-6 shadow-md text-center">

        <img
          src="/coaching-illustration.png"
          alt="illustration"
          className="w-40 mx-auto mb-4"
        />

        <h2 className="text-xl font-semibold text-green-900">
          Private Coaching
        </h2>
        <p className="text-sm text-gray-500 mt-2 mb-4">
          Add one-on-one, confidential sessions for only $35 per session
        </p>

        <div className="flex gap-1 justify-center mb-5">
          <div className="w-24 h-1 bg-[#7DC043] rounded"></div>
          <div className="w-24 h-1 bg-[#7DC043] rounded"></div>
          <div className="w-24 h-1 bg-gray-200 rounded"></div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Google */}
        <button
          onClick={() => handleGoogleSignup()}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-gray-100 text-black p-3 rounded-full mb-3 hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
        >
          <FcGoogle size={20} />
          {loading ? "Please wait..." : "Continue with Google"}
        </button>

        {/* Apple */}
        <button
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-[#7DC043] text-black p-3 rounded-full mb-3 hover:bg-[#6aad35] transition disabled:opacity-50"
        >
          <FaApple size={20} />
          Continue with Apple
        </button>

        {/* Guest */}
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-gray-100 text-black p-3 rounded-full mb-4 hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
          {loading ? "Please wait..." : "Continue As Guest"}
        </button>

        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-bold">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}