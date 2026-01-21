"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMobileMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 animate-slideInDown" style={{boxShadow: '0 2px 8px rgba(99, 102, 241, 0.08)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center overflow-hidden group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-all duration-400 border border-indigo-400/30">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent hidden sm:inline tracking-tight">
                TaskAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-400 text-sm tracking-tight ${
                      isActive("/dashboard")
                        ? "bg-indigo-50 text-indigo-600 shadow-md shadow-indigo-500/20 border border-indigo-200/60"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 border border-transparent hover:border-indigo-200/40"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/chat"
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-400 text-sm tracking-tight ${
                      isActive("/chat")
                        ? "bg-indigo-50 text-indigo-600 shadow-md shadow-indigo-500/20 border border-indigo-200/60"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 border border-transparent hover:border-indigo-200/40"
                    }`}
                  >
                    AI Chat
                  </Link>
                </>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="hidden sm:block px-7 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-sm tracking-tight hover:shadow-lg hover:shadow-red-500/30 transition-all duration-400 hover:translate-y-[-2px] active:translate-y-0 border border-red-400/30 hover:border-red-400/60"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {mobileMenuOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </button>
                </>
              ) : (
                <div className="hidden sm:flex gap-3">
                  <Link
                    href="/login"
                    className="px-6 py-2.5 rounded-lg text-gray-600 font-medium border border-gray-300 hover:border-gray-400 hover:text-gray-900 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isAuthenticated && (
          <div className="md:hidden bg-white border-t border-gray-200/50 animate-slideInDown">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/dashboard"
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/dashboard")
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 border border-transparent"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/chat"
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/chat")
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 border border-transparent"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Chat
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all duration-300 border border-red-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
