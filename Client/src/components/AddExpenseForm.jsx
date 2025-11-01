import React, { useState } from "react";
import { addExpense } from "../api";

export default function AddExpenseForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return alert("Please provide title and amount");

    setIsSubmitting(true);
    try {
      await addExpense({ title, amount: parseFloat(amount), date });
      setTitle("");
      setAmount("");
      setDate("");
      if (onAdded) onAdded();
      alert("✅ Expense added successfully! (AI categorization applied)");
    } catch (error) {
      alert("❌ Failed to add expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Add New Expense</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Expense Title *</label>
            <input
              placeholder="e.g., Dinner at Restaurant"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Amount (₹) *</label>
            <input
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" disabled={!title || !amount || isSubmitting}>
              {isSubmitting ? "⏳ Adding..." : "💰 Add Expense"}
            </button>
          </div>
        </div>
      </form>

      <div>💡 AI will automatically categorize your expense based on the title</div>
    </div>
  );
}
