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

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "2px solid #e5e7eb",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  };

  const logoutButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const logoutButtonHoverStyle = {
    backgroundColor: "#dc2626",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(239, 68, 68, 0.3)",
  };

  const dashboardStyle = {
    padding: "24px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  };

  const mainGridStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    marginBottom: "24px",
  };

  const topRowStyle = {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  };

  const leftPanelStyle = {
    flex: "1",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const rightPanelStyle = {
    flex: "2",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const chartsRowStyle = {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  };

  const chartContainerStyle = {
    flex: "1",
    minWidth: "300px",
  };

  return (
    <div style={dashboardStyle}>
      {/* Header with title and logout button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Expense Dashboard</h1>
        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor =
              logoutButtonHoverStyle.backgroundColor;
            e.target.style.transform = logoutButtonHoverStyle.transform;
            e.target.style.boxShadow = logoutButtonHoverStyle.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = logoutButtonStyle.backgroundColor;
            e.target.style.transform = "none";
            e.target.style.boxShadow = "none";
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Main content grid */}
      <div style={mainGridStyle}>
        {/* Top row: Forms and Monthly Chart */}
        <div style={topRowStyle}>
          <div style={leftPanelStyle}>
            <AddExpenseForm onAdded={loadData} />
            <CSVUpload onUploaded={loadData} />
          </div>
          <div style={rightPanelStyle}>
            <MonthlyChart data={monthlyData} />
          </div>
        </div>

        {/* Middle row: Category Charts */}
        <div style={chartsRowStyle}>
          <div style={chartContainerStyle}>
            <CategoryChart data={categoryData} />
          </div>
        </div>

        {/* Bottom: Expense Table */}
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
}
