import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ExpenseTable from "../components/ExpenseTable";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import { fetchAll } from "../api";

// --- ICONS ---
const IconAdd = () => <span>➕</span>;
// --------------------

const SERVER =
  import.meta.env.VITE_SERVER_URL ||
  "https://expense-tracker-hwrt.onrender.com";

// 🧾 Delete Expense (local function)
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

// 🌟 Glassmorphism Stat Card
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg
               transform hover:scale-[1.02] transition-transform duration-300`}
  >
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-4xl font-extrabold text-white">{value}</p>
      </div>
      <div className={`text-5xl ${color}`}>{icon}</div>
    </div>
  </div>
);

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Load Expenses
  const loadData = async () => {
    setLoading(true);
    try {
      const allExpenses = await fetchAll();
      setExpenses(Array.isArray(allExpenses) ? allExpenses : []);
    } catch (err) {
      console.error("Error loading expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    try {
      await deleteExpense(id);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 📅 Monthly Spending Data
  const monthlyData = useMemo(() => {
    const grouped = expenses.reduce((acc, curr) => {
      if (!curr.date || !curr.amount) return acc;
      const date = new Date(curr.date);
      if (isNaN(date)) return acc;
      const month = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }); // e.g. "Oct 2024"

      if (!acc[month]) acc[month] = { month, total: 0 };
      acc[month].total += Number(curr.amount);
      return acc;
    }, {});
    return Object.values(grouped).sort(
      (a, b) => new Date(a.month) - new Date(b.month)
    );
  }, [expenses]);

  // 📊 Category Totals
  const categoryTotals = useMemo(() => {
    const totals = expenses.reduce((acc, curr) => {
      const category = curr.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + (curr.amount || 0);
      return acc;
    }, {});
    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount,
    }));
  }, [expenses]);

  const totalSpent = expenses
    .reduce((acc, e) => acc + (e.amount || 0), 0)
    .toFixed(2);
  const totalItems = expenses.length;

  if (loading) {
    return (
      <div className="flex-1 p-6 lg:p-10 overflow-auto text-gray-200 relative flex items-center justify-center">
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#166534_100%)]"></div>
        <div className="text-2xl font-semibold text-emerald-300 animate-pulse">
          Loading Financial Command Center... 🧠
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 lg:p-10 overflow-auto text-gray-200 relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#166534_100%)]"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-white">
            Welcome, Financial Commander!
          </h1>
          <p className="text-lg text-gray-400">
            Here's your financial overview.
          </p>
        </div>
        <Link
          to="/add-expense"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <IconAdd />
          <span>Add New Expense</span>
        </Link>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- FIX 1: MONTHLY CHART --- */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg transform hover:scale-[1.01] transition-transform duration-500">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
            Monthly Spending Trend
          </h2>
          {/* A container for a chart MUST have a defined height */}
          <div className="h-96">
            <MonthlyChart data={monthlyData} />
          </div>
        </div>
        {/* --------------------------- */}

        {/* Stat Cards */}
        <div className="lg:col-span-1 space-y-8">
          <StatCard
            title="Total Spent (All Time)"
            value={`₹${totalSpent}`}
            icon="💰"
            color="text-emerald-400"
          />
          <StatCard
            title="Total Transactions"
            value={totalItems}
            icon="🧾"
            color="text-purple-400"
          />
        </div>

        {/* --- FIX 2: CATEGORY BREAKDOWN --- */}
        <div className="lg:col-span-3 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg transform hover:scale-[1.01] transition-transform duration-500">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
            Category Breakdown
          </h2>

          {/* Use a simple 2-column grid. It's cleaner and responsive. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* COLUMN 1: Category List (with scrolling) */}
            <div className="max-h-[400px] overflow-auto space-y-3 pr-2">
              {categoryTotals.length === 0 ? (
                <div className="text-gray-400">No expenses to display.</div>
              ) : (
                categoryTotals.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center bg-white/5 border border-white/10
                               p-4 rounded-lg transition-all duration-200 hover:bg-white/10"
                  >
                    <span className="text-lg font-medium text-white">
                      {item.category}
                    </span>
                    <span className="text-lg font-semibold text-emerald-300">
                      ₹{item.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* COLUMN 2: Category Chart */}
            <div className="h-96">
              {/* BUG FIX: You must pass 'categoryTotals' to the chart, not the raw 'expenses' */}
              <CategoryChart data={categoryTotals} />
            </div>
          </div>
        </div>
        {/* --------------------------------- */}
      </div>
    </main>
  );
}
