import React, { useState } from "react";
import { addExpense } from "../api";

export default function AddExpenseForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return alert("Please provide title and amount");
    await addExpense({ title, amount: parseFloat(amount), date });
    setTitle("");
    setAmount("");
    setDate("");
    if (onAdded) onAdded();
    alert("Expense added (AI categorization applied)");
  };

  return (
    <div className="card">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            placeholder="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
