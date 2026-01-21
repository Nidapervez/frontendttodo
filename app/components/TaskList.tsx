"use client";

import { useState } from "react";
import { taskApi } from "@/lib/api";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

export default function TaskList({ tasks, onTaskUpdated }: TaskListProps) {
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleToggleComplete = async (taskId: number) => {
    setLoading(taskId);
    setError("");

    try {
      await taskApi.toggleComplete(taskId);
      onTaskUpdated();
    } catch (err: any) {
      setError("Failed to update task");
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setLoading(taskId);
    setError("");

    try {
      await taskApi.delete(taskId);
      onTaskUpdated();
    } catch (err: any) {
      setError("Failed to delete task");
    } finally {
      setLoading(null);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  if (tasks.length === 0) {
    return (
      <div className="bg-white border border-gray-200/60 rounded-xl p-16 text-center shadow-lg animate-slideInUp">
        <div className="flex justify-center mb-6">
          <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">No tasks yet</h3>
        <p className="text-gray-500 text-base">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="animate-slideInUp">
      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-5 bg-red-50 border border-red-200/60 rounded-xl animate-slideInDown" style={{boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)'}}>
          <p className="text-red-600 text-sm font-medium leading-relaxed">{error}</p>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-8 border-b border-gray-200/50 pb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-3 font-medium text-sm rounded-lg transition-all duration-400 tracking-tight ${
            filter === "all"
              ? "text-indigo-600 bg-indigo-50/60 border border-indigo-200/60 shadow-md shadow-indigo-500/15"
              : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/30 border border-transparent hover:border-indigo-200/40"
          }`}
        >
          All ({tasks.length})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-5 py-3 font-medium text-sm rounded-lg transition-all duration-400 tracking-tight ${
            filter === "active"
              ? "text-indigo-600 bg-indigo-50/60 border border-indigo-200/60 shadow-md shadow-indigo-500/15"
              : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/30 border border-transparent hover:border-indigo-200/40"
          }`}
        >
          Active ({tasks.filter((t) => !t.completed).length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-5 py-3 font-medium text-sm rounded-lg transition-all duration-400 tracking-tight ${
            filter === "completed"
              ? "text-indigo-600 bg-indigo-50/60 border border-indigo-200/60 shadow-md shadow-indigo-500/15"
              : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/30 border border-transparent hover:border-indigo-200/40"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Tasks Container */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            className="group bg-white border border-gray-200/60 rounded-xl p-6 hover:border-indigo-200/60 hover:shadow-lg transition-all duration-400 hover-lift animate-slideInUp"
            style={{ animationDelay: `${index * 50}ms`, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
          >
            <div className="flex items-start justify-between gap-5">
              {/* Checkbox and Content */}
              <div className="flex items-start gap-5 flex-1">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    disabled={loading === task.id}
                    className="w-5 h-5 rounded border-gray-400 bg-white cursor-pointer transition-all duration-300 accent-indigo-600 disabled:opacity-50"
                  />
                  {task.completed && (
                    <svg className="absolute inset-0 w-5 h-5 text-green-500 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Task Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-base transition-all duration-300 line-height-relaxed ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-900 group-hover:text-indigo-600"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`mt-2 text-sm leading-relaxed ${
                      task.completed
                        ? "text-gray-400"
                        : "text-gray-600 group-hover:text-gray-700"
                    }`}>
                      {task.description}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h12a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {new Date(task.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(task.id)}
                disabled={loading === task.id}
                className="flex-shrink-0 p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-red-200"
                title="Delete task"
              >
                {loading === task.id ? (
                  <span className="inline-block w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>

            {/* Completion Badge */}
            {task.completed && (
              <div className="mt-4 text-xs font-medium text-green-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Completed
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State for Filtered View */}
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">No {filter} tasks</p>
        </div>
      )}
    </div>
  );
}
