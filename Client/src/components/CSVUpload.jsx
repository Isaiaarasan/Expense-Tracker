import React, { useState } from "react";
//import { uploadCSV } from "../api";
import { uploadCSV } from "../api/expenseApi"; 

export default function CSVUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const SERVER = import.meta.env.VITE_SERVER_URL || "https://expense-tracker-hwrt.onrender.com";
  const token = localStorage.getItem("token");

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Select a CSV file first");

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadCSV(fd);
      setFile(null);
      document.getElementById("csv-file-input").value = "";
      if (onUploaded) onUploaded();
      // No alert here, parent handles it
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(`${SERVER}/api/expense/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to download CSV");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-expenses.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download file");
    }
  };

  return (
    <div className="text-white text-center">
      <h3 className="text-2xl font-semibold mb-6">
        Upload or Download Expenses
      </h3>

      {/* Custom File Input Button */}
      <label
        htmlFor="csv-file-input"
        className="w-full cursor-pointer bg-white/10 border-2 border-dashed border-white/20
                   rounded-lg px-6 py-10 flex flex-col items-center
                   hover:bg-white/20 hover:border-white/40 transition duration-300"
      >
        <span className="text-4xl mb-3">📄</span>
        <span className="font-semibold text-emerald-300">
          {file ? file.name : "Click to select a .CSV file"}
        </span>
        <span className="text-xs text-gray-400 mt-1">Max size: 5MB</span>
      </label>
      <input
        id="csv-file-input"
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="hidden" // The label handles the click
      />

      {/* Button Group */}
      <div className="space-y-4 mt-6">
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg
                     transition duration-300 transform hover:scale-[1.01]
                     disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : "Upload & Process File"}
        </button>

        <button
          onClick={handleDownload}
          className="w-full bg-white/10 hover:bg-white/20 text-gray-200 font-semibold py-3 rounded-lg
                     border border-white/20 shadow-md transition duration-300"
        >
          Download My Data as CSV
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        CSV format: title, amount, date (YYYY-MM-DD)
      </p>
    </div>
  );
}
