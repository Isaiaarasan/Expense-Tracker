import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ data }) {
  const labels = (data || []).map((d) => d.category);
  const values = (data || []).map((d) => d.total);

  // Color palette for categories
  const colorPalette = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colorPalette,
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverBackgroundColor: colorPalette.map((color) => color + "DD"),
        hoverBorderColor: "#ffffff",
        hoverBorderWidth: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: "500",
          },
          color: "#374151",
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 13,
          weight: "600",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: Rs ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "0%",
  };

  const containerStyle = {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e5e7eb",
    marginBottom: "20px",
    transition: "all 0.3s ease",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "20px",
    textAlign: "center",
    borderBottom: "2px solid #8b5cf6",
    paddingBottom: "8px",
  };

  const chartContainerStyle = {
    height: "320px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const noDataStyle = {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "16px",
    padding: "60px 20px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "2px dashed #d1d5db",
    width: "100%",
  };

  const totalAmountStyle = {
    textAlign: "center",
    marginTop: "16px",
    padding: "12px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  };

  const totalTextStyle = {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
    marginBottom: "4px",
  };

  const totalValueStyle = {
    fontSize: "18px",
    color: "#1e40af",
    fontWeight: "bold",
  };

  const totalAmount = values.reduce((sum, value) => sum + value, 0);

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Expense Categories</h3>

      <div style={chartContainerStyle}>
        {labels.length ? (
          <>
            <Pie data={chartData} options={chartOptions} />
          </>
        ) : (
          <div style={noDataStyle}>
            📊 No category data available
            <br />
            <span
              style={{ fontSize: "14px", marginTop: "8px", display: "block" }}
            >
              Add expenses to see category distribution
            </span>
          </div>
        )}
      </div>

      {labels.length > 0 && (
        <div style={totalAmountStyle}>
          <div style={totalTextStyle}>Total Expenses</div>
          <div style={totalValueStyle}>Rs {totalAmount.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
