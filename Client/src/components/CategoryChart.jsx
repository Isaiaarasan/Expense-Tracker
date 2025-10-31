import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ data }) {
  const labels = (data || []).map((d) => d.category);
  const values = (data || []).map((d) => d.total);

  const chartData = {
    labels,
    datasets: [{ data: values }],
  };

  return (
    <div className="card">
      <h3>Category-wise</h3>
      {labels.length ? <Pie data={chartData} /> : <div>No data</div>}
    </div>
  );
}
