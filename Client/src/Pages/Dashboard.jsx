import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpenseTable from "../components/ExpenseTable";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import { fetchAll, fetchMonthlyReport } from "../api";

// --- ICONS ---
const IconAdd = () => <span>➕</span>;
// --------------------

// 🧾 Local delete function
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

// --- NEW Glassmorphism Stat Card ---
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
// ------------------------------------

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... (loadData logic is unchanged)
  const loadData = async () => {
    setLoading(true);
    try {
      const allExpenses = await fetchAll();
      const monthlyReport = await fetchMonthlyReport();
      setExpenses(Array.isArray(allExpenses) ? allExpenses : []);
      setMonthlyData(Array.isArray(monthlyReport) ? monthlyReport : []);
      if (Array.isArray(allExpenses)) {
        const categoryTotals = allExpenses.reduce((acc, expense) => {
          const category = expense.category || "Other";
          acc[category] = (acc[category] || 0) + (expense.amount || 0);
          return acc;
        }, {});
        const categoryArray = Object.keys(categoryTotals).map((category) => ({
          category,
          total: categoryTotals[category],
        }));
        setCategoryData(categoryArray);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // ... (handleDelete logic is unchanged)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    try {
      await deleteExpense(id);
      loadData(); // Reload all data for consistency
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalSpent = expenses
    .reduce((acc, e) => acc + (e.amount || 0), 0)
    .toFixed(2);
  const totalItems = expenses.length;

  if (loading) {
    return (
      <div className="flex-1 p-6 lg:p-10 overflow-auto text-gray-200 relative flex items-center justify-center">
        {/* --- BACKGROUND (The Aurora) --- */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#166534_100%)]"></div>
        <div className="text-2xl font-semibold text-emerald-300 animate-pulse">
          Loading Financial Command Center... 🧠
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 lg:p-10 overflow-auto text-gray-200 relative">
      {/* --- BACKGROUND (The Aurora) --- */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#166534_100%)]"></div>

      {/* --- HEADER WITH BUTTON --- */}
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

      {/* --- DYNAMIC WIDGET GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Main Chart (Large) --- */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg transform hover:scale-[1.01] transition-transform duration-500">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
            Monthly Spending Trend
          </h2>
          {/* Note: Ensure your MonthlyChart component has transparent background */}
          <MonthlyChart data={monthlyData} />
        </div>

        {/* --- Key Stats (Small) --- */}
        <div className="lg:col-span-1 space-y-8">
          <StatCard
            title="Total Spent (All Time)"
            value={totalSpent}
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

        {/* --- Category Chart --- */}
        <div className="lg:col-span-3 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg transform hover:scale-[1.01] transition-transform duration-500">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
            Category Breakdown
          </h2>
          <div className="h-100 flex items-center justify-center flex-row justify-between">
            <div className="flex-1 h-full ">
              

            </div>
            <CategoryChart data={expenses} />
          </div>
        </div>
      </div>

      {/* --- Full Expense Table (Bottom) --- */}
    </main>
  );
}
