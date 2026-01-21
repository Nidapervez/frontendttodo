"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login(email, password);
      const { access_token } = response.data;

      localStorage.setItem("token", access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-slideInUp">
          {/* Decorative Background Glow */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 opacity-50 blur-3xl" />

          {/* Premium Card Container */}
          <div className="bg-white border border-gray-200/60 rounded-2xl p-10 shadow-lg" style={{boxShadow: '0 12px 28px rgba(99, 102, 241, 0.12)'}}>
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center border border-indigo-400/30 animate-breath">
                  <span className="text-3xl text-white">✓</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Welcome Back</h1>
              <p className="text-gray-600 text-base font-light leading-relaxed">Sign in to your TaskAI account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-5 rounded-xl bg-red-50 border border-red-200/60 animate-slideInDown" style={{boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)'}}>
                <p className="text-red-600 text-sm font-medium leading-relaxed">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 tracking-tight">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white border border-gray-200/80 text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-400 disabled:opacity-50"
                  />
                  <svg
                    className="absolute right-4 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3 tracking-tight">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white border border-gray-200/80 text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-400 disabled:opacity-50 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" fill="white" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3l18 18M9.9 9.9a3 3 0 014.2 4.2M9.9 9.9L5.7 5.7a9 9 0 0112.6 0M9.9 9.9l4.2 4.2m0-4.2l4.2-4.2a9 9 0 00-12.6 0" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:translate-y-[-2px] active:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative py-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500 font-light">
                    New to TaskAI?
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Link
                href="/signup"
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-300 block text-center"
              >
                Create an Account
              </Link>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-5 bg-blue-50 border border-blue-200/60 rounded-lg">
              <p className="text-xs text-blue-600 font-semibold mb-3 uppercase tracking-wide">Demo Credentials:</p>
              <p className="text-sm text-blue-700 leading-relaxed">Email: <span className="font-mono">test@example.com</span></p>
              <p className="text-sm text-blue-700 leading-relaxed">Password: <span className="font-mono">password</span></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
