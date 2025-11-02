import React, { useState, useEffect, useMemo } from "react";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import { fetchAll } from "../api"; // fetchMonthlyReport is not needed

export default function ReportsPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      // We only need to fetch all expenses
      const allExpenses = await fetchAll();
      setExpenses(Array.isArray(allExpenses) ? allExpenses : []);
    } catch (err) {
      console.error("Error loading report data:", err);
      alert("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- ADDED PROCESSING LOGIC (Copied from Dashboard) ---

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
      amount, // Assuming CategoryChart expects 'amount'. If it expects 'total', change this.
    }));
  }, [expenses]);

  // ----------------------------------------------------

  return (
    <main className="flex-1 p-6 lg:p-10 overflow-auto text-gray-200 relative">
      {/* --- BACKGROUND (The Aurora) --- */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#1e3a8a_100%)]"></div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">
          Financial Reports
        </h1>
        <p className="text-lg text-gray-400">
          Analyze your spending habits over time and by category.
        </p>
      </div>

      {/* --- CHARTS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Chart Card */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
            Monthly Spending
          </h2>
          <div className="h-96">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Loading chart...
              </div>
            ) : (
              // This now receives the processed monthly data
              <MonthlyChart data={monthlyData} />
            )}
          </div>
        </div>

        {/* Category Chart Card */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
            Category Breakdown
          </h2>
          <div className="h-96">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Loading chart...
              </div>
            ) : (
              // --- THIS IS THE FIX ---
              // Pass the processed 'categoryTotals' array, not the raw 'expenses'
              <CategoryChart data={categoryTotals} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
