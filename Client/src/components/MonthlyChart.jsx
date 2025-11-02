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
        // --- ADDED GRADIENT AND STYLING ---
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          if (!ctx) return;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(22, 163, 74, 0.8)"); // emerald-600
          gradient.addColorStop(1, "rgba(22, 163, 74, 0.1)");
          return gradient;
        },
        borderColor: "rgba(22, 163, 74, 1)", // emerald-600
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(22, 163, 74, 1)",
        // ------------------------------------
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container
    plugins: {
      legend: {
        display: false, // Hide legend, it's redundant
      },
      tooltip: {
        backgroundColor: "#111827", // gray-900
        titleColor: "#f3f4f6", // gray-100
        bodyColor: "#d1d5db", // gray-300
        borderColor: "#374151", // gray-700
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        ticks: {
          // --- FIXED CURRENCY AND COLOR ---
          callback: function (value) {
            return "₹" + value;
          },
          color: "#9ca3af", // gray-400
          // ---------------------------------
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          // --- FIXED COLOR ---
          color: "#9ca3af", // gray-400
          // -------------------
        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)", // Fainter grid lines
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      {labels.length ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>No monthly data available.</p>
        </div>
      )}
    </div>
  );
}
