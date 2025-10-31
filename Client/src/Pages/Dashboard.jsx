// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import CSVUpload from "../components/CSVUpload";
import MonthlyChart from "../components/MonthlyChart";
import { fetchAll, fetchMonthlyReport } from "../api";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const loadData = async () => {
    try {
      const allExpenses = await fetchAll();
      const monthlyReport = await fetchMonthlyReport();

      // ✅ Defensive checks
      setExpenses(Array.isArray(allExpenses) ? allExpenses : []);
      setMonthlyData(Array.isArray(monthlyReport) ? monthlyReport : []);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setExpenses([]);
      setMonthlyData([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Expense Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <AddExpenseForm onAdded={loadData} />
          <CSVUpload onUploaded={loadData} />
        </div>
        <div className="flex-1">
          <MonthlyChart data={monthlyData} />
        </div>
      </div>
      <ExpenseTable expenses={expenses} />
      </div>
      
  );
}
