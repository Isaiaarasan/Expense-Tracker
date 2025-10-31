import React from "react";

export default function ExpenseTable({ expenses }) {
  const containerStyle = {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e5e7eb",
    marginBottom: "20px",
    overflow: "hidden",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "20px",
    textAlign: "center",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "8px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden",
    fontSize: "14px",
  };

  const headerStyle = {
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "600",
    padding: "16px 12px",
    textAlign: "left",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const cellStyle = {
    padding: "16px 12px",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
  };

  const rowStyle = {
    transition: "all 0.2s ease",
    backgroundColor: "white",
  };

  const rowHoverStyle = {
    backgroundColor: "#f8fafc",
    transform: "translateY(-1px)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  };

  const amountStyle = {
    fontWeight: "600",
    color: "#059669",
  };

  const categoryStyle = {
    padding: "4px 12px",
    borderRadius: "20px",
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    fontSize: "12px",
    fontWeight: "500",
    display: "inline-block",
  };

  const emptyStateStyle = {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "16px",
    padding: "40px 20px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "2px dashed #d1d5db",
  };

  const getCategoryStyle = (category) => {
    const categoryColors = {
      Food: { bg: "#fef3c7", color: "#92400e" },
      Transport: { bg: "#e0e7ff", color: "#3730a3" },
      Entertainment: { bg: "#fce7f3", color: "#be185d" },
      Shopping: { bg: "#dcfce7", color: "#166534" },
      Bills: { bg: "#f3e8ff", color: "#7e22ce" },
      Healthcare: { bg: "#ffe4e6", color: "#be123c" },
      Other: { bg: "#f1f5f9", color: "#475569" },
    };

    const style = categoryColors[category] || categoryColors["Other"];
    return {
      ...categoryStyle,
      backgroundColor: style.bg,
      color: style.color,
    };
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Expense History</h3>

      {!expenses || expenses.length === 0 ? (
        <div style={emptyStateStyle}>
          💰 No expenses recorded
          <br />
          <span
            style={{ fontSize: "14px", marginTop: "8px", display: "block" }}
          >
            Add your first expense to see it here
          </span>
        </div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Title</th>
              <th style={headerStyle}>Amount</th>
              <th style={headerStyle}>Category</th>
              <th style={headerStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {(expenses || []).map((e, index) => (
              <tr
                key={e._id || `${e.title}-${e.amount}-${e.date}`}
                style={{
                  ...rowStyle,
                  ...(index % 2 === 0 ? { backgroundColor: "#fafafa" } : {}),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    rowHoverStyle.backgroundColor;
                  e.currentTarget.style.transform = rowHoverStyle.transform;
                  e.currentTarget.style.boxShadow = rowHoverStyle.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#fafafa" : "white";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <td style={cellStyle}>
                  <span style={{ fontWeight: "500" }}>{e.title}</span>
                </td>
                <td style={{ ...cellStyle, ...amountStyle }}>
                  Rs {parseFloat(e.amount).toLocaleString()}
                </td>
                <td style={cellStyle}>
                  <span style={getCategoryStyle(e.category)}>{e.category}</span>
                </td>
                <td style={cellStyle}>
                  {new Date(e.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
