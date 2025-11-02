import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // useNavigate is removed (was only used for logout)
import { fetchAll } from "../api";

// ... (deleteExpense function unchanged)
const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
async function deleteExpense(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${SERVER}/api/expense/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to delete expense");
  }
  return res.json();
}

// --- HELPER: Get Icon for Category (Unchanged) ---
const getCategoryIcon = (category) => {
  const cat = String(category).toLowerCase();
  if (cat.includes("food")) return "🍔";
  if (cat.includes("travel")) return "✈️";
  if (cat.includes("rent")) return "🏠";
  if (cat.includes("utilities")) return "💡";
  if (cat.includes("shopping")) return "🛍️";
  if (cat.includes("health")) return "❤️‍🩹";
  return "💰"; // Default
};

// --- TransactionItem Component (Unchanged) ---
const TransactionItem = ({ exp, onDelete }) => (
  <div
    className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg
               backdrop-blur-lg transition-all duration-300 transform hover:bg-white/10 hover:scale-[1.01]"
  >
    {/* Icon */}
    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl shadow-inner">
      {getCategoryIcon(exp.category)}
    </div>
    {/* Details */}
    <div className="flex-grow mx-4">
      <div className="text-lg font-semibold text-white truncate">
        {exp.title}
      </div>
      <div className="text-sm text-gray-300">
        {exp.date ? new Date(exp.date).toLocaleDateString() : "-"} •{" "}
        <span className="font-medium text-purple-300">
          {exp.category || "Uncategorized"}
        </span>
      </div>
    </div>
    {/* Amount & Delete */}
    <div className="flex-shrink-0 flex flex-col items-end ml-4">
      <div className="text-xl font-bold text-white">
        ₹{exp.amount.toFixed(2)}
      </div>
      <button
        onClick={() => onDelete(exp._id)}
        className="mt-1 text-sm text-red-400 hover:text-red-200 transition duration-200 opacity-60 hover:opacity-100"
      >
        Delete
      </button>
    </div>
  </div>
);

// --- SkeletonLoader Component (Unchanged) ---
const SkeletonLoader = () => (
  <div className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg backdrop-blur-lg animate-pulse">
    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full"></div>
    <div className="flex-grow mx-4">
      <div className="h-5 bg-white/10 rounded w-3/4"></div>
      <div className="h-4 bg-white/10 rounded w-1/2 mt-2"></div>
    </div>
    <div className="flex-shrink-0 w-20 h-5 bg-white/10 rounded"></div>
  </div>
);

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  // navigate is REMOVED

  // ... (loadExpenses logic unchanged)
  const loadExpenses = async () => {
    setLoading(true);
    try {
      const data = await fetchAll();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      alert("❌ Failed to load expenses: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // ... (handleDelete logic unchanged)
  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this expense?"))
      return;
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // handleLogout is REMOVED

  return (
    // Note: This <main> tag IS the page. It has its own background.
    <main className="flex-1 p-6 lg:p-10 overflow-auto text-gray-200 relative">
      {/* --- BACKGROUND (The Aurora) --- */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* --- SIDEBAR IS GONE --- */}

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-white">All Transactions</h1>
        <Link
          to="/add-expense" // Changed this to go to the add page, not dashboard
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          + Add New
        </Link>
      </div>

      {/* --- TRANSACTION FEED --- */}
      <div className="max-w-4xl mx-auto space-y-4">
        {loading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : expenses.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-semibold">No expenses found.</h2>
            <p>Click "Add New" to get started.</p>
          </div>
        ) : (
          expenses.map((exp) => (
            <TransactionItem key={exp._id} exp={exp} onDelete={handleDelete} />
          ))
        )}
      </div>
    </main>
  );
}
