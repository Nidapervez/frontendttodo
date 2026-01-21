"use client";

import { useState } from "react";
import { taskApi } from "@/lib/api";

interface TaskFormProps {
  onTaskCreated: () => void;
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    setLoading(true);

    try {
      await taskApi.create(title, description || undefined);
      setTitle("");
      setDescription("");
      setSuccess("Task created successfully!");
      setTimeout(() => setSuccess(""), 3000);
      onTaskCreated();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200/60 rounded-2xl p-8 shadow-lg animate-slideInUp" style={{boxShadow: '0 12px 28px rgba(99, 102, 241, 0.12)'}}>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center border border-indigo-400/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Create New Task</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200/60 rounded-xl animate-slideInDown" style={{boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)'}}>
          <p className="text-red-600 text-sm font-medium leading-relaxed">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200/60 rounded-xl animate-slideInDown" style={{boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)'}}>
          <p className="text-green-600 text-sm font-medium leading-relaxed">{success}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Task Title */}
        <div className="group">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3 tracking-tight">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            disabled={loading}
            className="w-full px-4 py-3 bg-white border border-gray-200/80 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-400 disabled:opacity-50"
          />
        </div>

        {/* Task Description */}
        <div className="group">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3 tracking-tight">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about your task..."
            rows={4}
            disabled={loading}
            className="w-full px-4 py-3 bg-white border border-gray-200/80 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-400 disabled:opacity-50 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </>
          )}
        </button>
      </div>
    </form>
  );
}
