"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { taskApi } from "@/lib/api";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import TaskForm from "@/app/components/TaskForm";
import TaskList from "@/app/components/TaskList";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTasks();
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await taskApi.getAll();
      setTasks(response.data);
    } catch (err: any) {
      setError("Failed to load tasks");
      if (err.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <>
      <Navbar isAuthenticated={true} onLogout={handleLogout} />
      
      <main className="flex-1">
        {/* Hero Section with Stats */}
        <div className="bg-gradient-to-r from-white via-indigo-50 to-white border-b border-gray-200/50 py-16 px-4 sm:px-6 lg:px-8" style={{boxShadow: 'inset 0 10px 30px rgba(99, 102, 241, 0.05)'}}>
          <div className="max-w-7xl mx-auto animate-slideInDown">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
              {/* Welcome Section */}
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">Dashboard</h1>
                <p className="text-gray-600 text-base font-light leading-relaxed">Welcome back! Manage your tasks effectively</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-5">
                {/* Total Tasks */}
                <div className="bg-white border border-gray-200/60 rounded-xl p-6 text-center hover-lift group" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'}}>
                  <div className="text-4xl font-bold text-gray-900 tracking-tight">{tasks.length}</div>
                  <div className="text-xs text-gray-500 mt-3 font-light uppercase tracking-widest leading-relaxed">Total Tasks</div>
                </div>

                {/* Active Tasks */}
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200/50 rounded-xl p-6 text-center hover-lift group" style={{boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)'}}>
                  <div className="text-4xl font-bold text-blue-600 tracking-tight">{tasks.filter((t) => !t.completed).length}</div>
                  <div className="text-xs text-blue-600 mt-3 font-light uppercase tracking-widest leading-relaxed">Active</div>
                </div>

                {/* Completed Tasks */}
                <div className="bg-gradient-to-br from-green-50 to-white border border-green-200/50 rounded-xl p-6 text-center hover-lift group" style={{boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)'}}>
                  <div className="text-4xl font-bold text-green-600 tracking-tight">{completedCount}</div>
                  <div className="text-xs text-green-600 mt-3 font-light uppercase tracking-widest leading-relaxed">Completed</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {tasks.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-800 tracking-tight">Overall Progress</span>
                  <span className="text-lg font-bold text-gray-900">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-3 border border-gray-200/80">
                  <div
                    className="bg-gradient-to-r from-green-500 via-emerald-400 to-green-400 h-3 rounded-full transition-all duration-700 shadow-lg shadow-green-500/30"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {error && (
            <div className="mb-8 p-5 bg-red-50 border border-red-200/60 rounded-lg animate-slideInDown" style={{boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)'}}>
              <p className="text-red-600 text-sm font-medium leading-relaxed">{error}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <TaskForm onTaskCreated={fetchTasks} />
              </div>
            </div>

            {/* Tasks Section */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading tasks...</p>
                  </div>
                </div>
              ) : (
                <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
