import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function MonthlyChart({ data }) {
  const labels = (data || []).map((d) => d.month);
  const values = (data || []).map((d) => d.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Expenses",
        data: values,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
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
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "8px",
  };

  const noDataStyle = {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "16px",
    padding: "40px 20px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "2px dashed #d1d5db",
  };

  const chartContainerStyle = {
    height: "300px",
    position: "relative",
  };

  return (
    <div style={containerStyle} className="monthly-chart-card">
      <h3 style={titleStyle}>Monthly Expenses</h3>
      <div style={chartContainerStyle}>
        {labels.length ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <div style={noDataStyle}>
            📊 No expense data available
            <br />
            <span
              style={{ fontSize: "14px", marginTop: "8px", display: "block" }}
            >
              Add some expenses to see your monthly chart
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
