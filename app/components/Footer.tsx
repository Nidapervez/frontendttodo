"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 to-gray-100 border-t border-gray-200/50 mt-auto" style={{boxShadow: 'inset 0 10px 30px rgba(99, 102, 241, 0.03)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="animate-slideInUp">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center border border-indigo-400/30">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent tracking-tight">
                TaskAI
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              Intelligent task management powered by advanced AI. Organize, automate, and accomplish more with ease.
            </p>
          </div>

          {/* Product Column */}
          <div className="animate-slideInUp" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-gray-900 font-semibold mb-5 text-sm tracking-tight uppercase">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-indigo-600 transition-colors duration-400 hover:translate-x-1 inline-flex items-center gap-2 font-light"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-indigo-600"></span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-gray-600 hover:text-indigo-600 transition-colors duration-400 hover:translate-x-1 inline-flex items-center gap-2 font-light"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  AI Chat
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-default inline-flex items-center gap-2 font-light">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Features
                </span>
              </li>
              <li>
                <span className="text-gray-500 cursor-default inline-flex items-center gap-2 font-light">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Pricing
                </span>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="animate-slideInUp" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-gray-900 font-semibold mb-5 text-sm tracking-tight uppercase">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-gray-500 cursor-default inline-flex items-center gap-2 font-light">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  About
                </span>
              </li>
              <li>
                <span className="text-gray-500 cursor-default inline-flex items-center gap-2 font-light">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Blog
                </span>
              </li>
              <li>
                <span className="text-gray-500 cursor-default inline-flex items-center gap-2 font-light">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Careers
                </span>
              </li>
              <li>
                <span className="text-gray-500 cursor-default inline-flex items-center gap-2 font-light">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="animate-slideInUp" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-gray-900 font-semibold mb-5 text-sm tracking-tight uppercase">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-gray-400 cursor-default">Privacy</span>
              </li>
              <li>
                <span className="text-gray-400 cursor-default">Terms</span>
              </li>
              <li>
                <span className="text-gray-400 cursor-default">Security</span>
              </li>
              <li>
                <span className="text-gray-400 cursor-default">Cookies</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {currentYear} TaskAI. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300 hover:bg-gray-700"
              title="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9 2.25 9 2.25" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300 hover:bg-gray-700"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-300 hover:bg-gray-700"
              title="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
