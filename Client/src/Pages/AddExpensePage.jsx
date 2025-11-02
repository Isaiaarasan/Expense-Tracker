import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Link is removed
import AddExpenseForm from "../components/AddExpenseForm";
import CSVUpload from "../components/CSVUpload";
// API imports are no longer needed here, they are in the child components

// --- "Quick Action" TABS COMPONENT (Unchanged) ---
const QuickActions = ({ onAdded, onUploaded }) => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab("add")}
          className={`flex-1 py-4 px-6 font-semibold rounded-tl-2xl ${
            activeTab === "add"
              ? "bg-white/10 text-emerald-300"
              : "text-gray-400 hover:bg-white/5"
          } transition-all duration-200`}
        >
          Add Expense
        </button>
        <button
          onClick={() => setActiveTab("csv")}
          className={`flex-1 py-4 px-6 font-semibold rounded-tr-2xl ${
            activeTab === "csv"
              ? "bg-white/10 text-emerald-300"
              : "text-gray-400 hover:bg-white/5"
          } transition-all duration-200`}
        >
          Upload CSV
        </button>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8 flex-grow">
        {activeTab === "add" ? (
          <AddExpenseForm onAdded={onAdded} />
        ) : (
          <CSVUpload onUploaded={onUploaded} />
        )}
      </div>
    </div>
  );
};
// -------------------------------------------------

export default function AddExpensePage() {
  const navigate = useNavigate();

  const onActionSuccess = () => {
    alert("Action successful! Returning to dashboard.");
    navigate("/dashboard");
  };

  // handleLogout is REMOVED

  return (
    // Note: This <main> tag IS the page. It has its own background.
    <main className="flex-1 p-6 lg:p-10 overflow-auto text-gray-200 relative">
      {/* --- BACKGROUND (The Aurora) --- */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#166534_100%)]"></div>

      {/* --- SIDEBAR IS GONE --- */}

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">
          Add a Transaction
        </h1>
        <p className="text-lg text-gray-400">
          Log a new expense or upload a CSV file.
        </p>
      </div>

      {/* Forms are rendered here, centered */}
      <div className="max-w-2xl mx-auto">
        <QuickActions onAdded={onActionSuccess} onUploaded={onActionSuccess} />
      </div>
    </main>
  );
}
