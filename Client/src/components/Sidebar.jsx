import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// --- ICONS ---
const IconDashboard = () => <span>📊</span>;
const IconTransactions = () => <span>🧾</span>;
const IconReports = () => <span>📈</span>;
const IconLogout = () => <span>🚪</span>;
const IconAdd = () => <span>➕</span>;
// --------------------

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const { pathname } = location; // Get the path (e.g., "/dashboard")

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Helper function to set active class
  const getLinkClass = (path) => {
    return pathname === path
      ? "bg-emerald-800 text-white rounded-lg shadow-lg" // Active class
      : "text-gray-300 hover:bg-slate-700"; // Inactive class
  };

  return (
    <nav className="w-20 lg:w-64 bg-slate-900 text-gray-300 p-4 lg:p-6 flex flex-col shadow-2xl z-10">

      <div className="text-white text-2xl font-bold mb-10 hidden lg:flex items-center space-x-3">
        <img src="image.png" alt="AI.Tracker Logo" className="w-10 h-10" />
        <span>AI.Tracker</span>
      </div>
      <div className="text-white text-3xl font-bold mb-10 lg:hidden text-center">
        💸
      </div>

      <ul className="space-y-4 flex-grow">
        {/* Dashboard Link */}
        <li className={getLinkClass("/dashboard")}>
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 p-3 font-semibold"
          >
            <IconDashboard />{" "}
            <span className="hidden lg:inline">Dashboard</span>
          </Link>
        </li>

        {/* Transactions Link */}
        <li className={getLinkClass("/expenselist")}>
          <Link
            to="/expenselist"
            className="flex items-center space-x-3 p-3 font-semibold"
          >
            <IconTransactions />{" "}
            <span className="hidden lg:inline">Transactions</span>
          </Link>
        </li>

        {/* Add Expense Link */}
        <li className={getLinkClass("/add-expense")}>
          <Link
            to="/add-expense"
            className="flex items-center space-x-3 p-3 font-semibold"
          >
            <IconAdd /> <span className="hidden lg:inline">Add Expense</span>
          </Link>
        </li>

        {/* --- UPDATED REPORTS LINK --- */}
        <li className={getLinkClass("/reports")}>
          <Link
            to="/reports"
            className="flex items-center space-x-3 p-3 font-semibold"
          >
            <IconReports /> <span className="hidden lg:inline">Reports</span>
          </Link>
        </li>
        {/* --------------------------- */}
      </ul>

      {/* Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-red-200 transition duration-200 w-full"
        >
          <IconLogout /> <span className="hidden lg:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
