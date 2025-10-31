import React, { useEffect, useState } from "react";
import AddExpenseForm from "./components/AddExpenseForm";
import CSVUpload from "./components/CSVUpload";
import ExpenseTable from "./components/ExpenseTable";
import CategoryChart from "./components/CategoryChart";
import MonthlyChart from "./components/MonthlyChart";
import { fetchAll, fetchCategoryReport, fetchMonthlyReport } from "./api";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [categoryReport, setCategoryReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);

  const load = async () => {
    const e = await fetchAll();
    setExpenses(e);
    setCategoryReport(await fetchCategoryReport());
    setMonthlyReport(await fetchMonthlyReport());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h1>Expense Tracker with AI Categorization</h1>
      <div className="grid">
        <div>
          <AddExpenseForm onAdded={load} />
          <CSVUpload onUploaded={load} />
          <ExpenseTable expenses={expenses} />
        </div>
        <div>
          <CategoryChart data={categoryReport} />
          <MonthlyChart data={monthlyReport} />
        </div>
      </div>
    </div>
  );
}
