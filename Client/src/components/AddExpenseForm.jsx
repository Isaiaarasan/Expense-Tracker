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

  const containerStyle = {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e5e7eb",
    marginBottom: "20px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "20px",
    textAlign: "center",
    borderBottom: "2px solid #10b981",
    paddingBottom: "8px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const inputGroupStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  };

  const inputStyle = {
    flex: "1",
    minWidth: "120px",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#f9fafb",
    transition: "all 0.3s ease",
    outline: "none",
  };

  const inputFocusStyle = {
    borderColor: "#10b981",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)",
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "100px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#059669",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(16, 185, 129, 0.3)",
  };

  const buttonDisabledStyle = {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "4px",
    display: "block",
  };

  const inputWrapperStyle = {
    flex: "1",
    minWidth: "120px",
  };

  const helpTextStyle = {
    fontSize: "12px",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "8px",
    fontStyle: "italic",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Add New Expense</h3>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Expense Title *</label>
            <input
              style={inputStyle}
              placeholder="e.g., Dinner at Restaurant"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = inputFocusStyle.borderColor;
                e.target.style.backgroundColor =
                  inputFocusStyle.backgroundColor;
                e.target.style.boxShadow = inputFocusStyle.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
              required
            />
          </div>

          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Amount (₹) *</label>
            <input
              style={inputStyle}
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = inputFocusStyle.borderColor;
                e.target.style.backgroundColor =
                  inputFocusStyle.backgroundColor;
                e.target.style.boxShadow = inputFocusStyle.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
              required
            />
          </div>

          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Date</label>
            <input
              style={inputStyle}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = inputFocusStyle.borderColor;
                e.target.style.backgroundColor =
                  inputFocusStyle.backgroundColor;
                e.target.style.boxShadow = inputFocusStyle.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div
            style={{
              ...inputWrapperStyle,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <button
              type="submit"
              disabled={!title || !amount || isSubmitting}
              style={{
                ...buttonStyle,
                ...(!title || !amount || isSubmitting
                  ? buttonDisabledStyle
                  : {}),
              }}
              onMouseEnter={(e) => {
                if (!title || !amount || isSubmitting) return;
                e.target.style.backgroundColor =
                  buttonHoverStyle.backgroundColor;
                e.target.style.transform = buttonHoverStyle.transform;
                e.target.style.boxShadow = buttonHoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                if (!title || !amount || isSubmitting) return;
                e.target.style.backgroundColor = buttonStyle.backgroundColor;
                e.target.style.transform = "none";
                e.target.style.boxShadow = "none";
              }}
            >
              {isSubmitting ? "⏳ Adding..." : "💰 Add Expense"}
            </button>
          </div>
        </div>
      </form>

      <div style={helpTextStyle}>
        💡 AI will automatically categorize your expense based on the title
      </div>
    </div>
  );
}
