// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import CSVUpload from "../components/CSVUpload";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import { fetchAll, fetchMonthlyReport } from "../api";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const loadData = async () => {
    try {
      const allExpenses = await fetchAll();
      const monthlyReport = await fetchMonthlyReport();

      // ✅ Defensive checks
      setExpenses(Array.isArray(allExpenses) ? allExpenses : []);
      setMonthlyData(Array.isArray(monthlyReport) ? monthlyReport : []);

      // Generate category data from expenses
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
      setExpenses([]);
      setMonthlyData([]);
      setCategoryData([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* Header with title and logout button */}
      <div>
        <h1>Expense Dashboard</h1>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>

      {/* Main content grid */}
      <div>
        {/* Top row: Forms and Monthly Chart */}
        <div>
          <div>
            <AddExpenseForm onAdded={loadData} />
            <CSVUpload onUploaded={loadData} />
          </div>
          <div>
            <MonthlyChart data={monthlyData} />
          </div>
        </div>

        {/* Middle row: Category Charts */}
        <div>
          <div>
            <CategoryChart data={categoryData} />
          </div>
        </div>

        {/* Bottom: Expense Table */}
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
}
