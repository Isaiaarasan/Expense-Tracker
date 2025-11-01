import React, { useState } from "react";
import { uploadCSV } from "../api";
import Papa from "papaparse";

export default function CSVUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Select a CSV file first");

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadCSV(fd);
      alert(`Successfully uploaded ${res.savedCount} expenses!`);
      setFile(null);
      document.getElementById("csv-file-input").value = "";
      if (onUploaded) onUploaded();
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSample = () => {
    const sample = [
      { title: "Chicken Biryani", amount: 180, date: "2025-02-01" },
      { title: "Uber Ride", amount: 320, date: "2025-02-03" },
      { title: "Netflix Subscription", amount: 499, date: "2025-02-05" },
      { title: "Grocery Purchase", amount: 720, date: "2025-02-06" },
    ];
    const csv = Papa.unparse(sample);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sample-expenses.csv";
    link.click();
  };

  return (
    <div>
      <h3>Upload Expenses CSV</h3>

      <input
        id="csv-file-input"
        type="file"
        accept=".csv"
        onChange={handleFile}
      />

      {file && <div>Selected: {file.name}</div>}

      <div>
        <button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? "Uploading..." : "Upload CSV"}
        </button>

        <button onClick={downloadSample}>Download Sample</button>
      </div>

      <div>
        CSV format: title, amount, date (YYYY-MM-DD). Download sample file for
        reference.
      </div>
    </div>
  );
}
