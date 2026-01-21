"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <main className="text-center">
          <div className="animate-slideInUp">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center animate-pulse">
                <span className="text-4xl">✓</span>
              </div>
            </div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
