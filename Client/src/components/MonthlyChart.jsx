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
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
  };

  return (
    <div>
      <h3>Monthly Expenses</h3>
      <div>
        {labels.length ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <div>
            No expense data available.
            <br />
            <span>Add some expenses to see your monthly chart.</span>
          </div>
        )}
      </div>
    </div>
  );
}
