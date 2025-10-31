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
    datasets: [{ label: "Total", data: values }],
  };

  return (
    <div className="card">
      <h3>Monthly</h3>
      {labels.length ? <Bar data={chartData} /> : <div>No data</div>}
    </div>
  );
}
