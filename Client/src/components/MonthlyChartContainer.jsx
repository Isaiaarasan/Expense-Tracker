import React, { useEffect, useState } from "react";
import axios from "axios";
import MonthlyChart from "./MonthlyChart";

export default function MonthlyChartContainer() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const token = localStorage.getItem("token"); // token from login
        const res = await axios.get("/api/expenses/report/monthly", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Convert month format (YYYY-MM) to readable name (e.g., "Oct 2024")
        const formatted = res.data.map((d) => {
          const [year, month] = d.month.split("-");
          const date = new Date(year, month - 1);
          return {
            month: date.toLocaleString("default", {
              month: "short",
              year: "numeric",
            }),
            total: d.total,
          };
        });

        setMonthlyData(formatted);
      } catch (err) {
        console.error("Error fetching monthly report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyReport();
  }, []);

  return (
    <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg transform hover:scale-[1.01] transition-transform duration-500">
      <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
        Monthly Spending Trend
      </h2>

      <div className="h-80">
        {loading ? (
          <p className="text-gray-400 text-center mt-20">Loading data...</p>
        ) : (
          <MonthlyChart data={monthlyData} />
        )}
      </div>
    </div>
  );
}
