import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ data }) {
  const labels = (data || []).map((d) => d.category);
  const values = (data || []).map((d) => d.total);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const totalAmount = values.reduce((sum, value) => sum + value, 0);

  return (
    <div>
      <h3>Expense Categories</h3>

      <div>
        {labels.length ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <div>
            No category data available
            <br />
            <span>Add expenses to see category distribution</span>
          </div>
        )}
      </div>

      {labels.length > 0 && (
        <div>
          <div>Total Expenses</div>
          <div>Rs {totalAmount.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
