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
      // No alert here, the parent page will handle it.
    } catch (error) {
      alert("❌ Failed to add expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white">
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Log a New Expense
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Expense Title *
          </label>
          <input
            placeholder="e.g., Dinner at Restaurant"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg shadow-inner
                       focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-200
                       placeholder-gray-500"
          />
        </div>

        {/* Amount & Date Fields (Side-by-side) */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount (₹) *
            </label>
            <input
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg shadow-inner
                         focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-200
                         placeholder-gray-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg shadow-inner
                         focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-200
                         text-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!title || !amount || isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg
                       transition duration-300 transform hover:scale-[1.01]
                       disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "⏳ Adding..." : "💰 Add Expense & Categorize"}
          </button>
        </div>
      </form>
      <p className="text-center text-gray-400 text-sm mt-6">
        💡 AI will automatically categorize your expense based on the title.
      </p>
    </div>
  );
}
