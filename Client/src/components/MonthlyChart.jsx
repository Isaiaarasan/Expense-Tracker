import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function MonthlyChart({ data }) {
  const labels = data.map((d) => d.month);
  const values = data.map((d) => d.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: values,
        borderColor: "rgba(16, 185, 129, 1)", // emerald-500
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
        tension: 0.4, // smooth line
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: "#d1d5db" }, // gray-300
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#f3f4f6",
        bodyColor: "#d1d5db",
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: {
          color: "#9ca3af",
          callback: (value) => "₹" + value,
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="w-full h-full">
      {labels.length ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>No monthly data available.</p>
        </div>
      )}
    </div>
  );
}
