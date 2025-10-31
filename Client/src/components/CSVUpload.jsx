import React, { useState } from "react";
import { uploadCSV } from "../api";
import Papa from "papaparse";

export default function CSVUpload({ onUploaded }) {
  const [file, setFile] = useState(null);

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Select a CSV file first");
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadCSV(fd);
    alert(`Uploaded ${res.savedCount} expenses`);
    setFile(null);
    if (onUploaded) onUploaded();
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
    <div className="card">
      <h3>Upload CSV</h3>
      <input type="file" accept=".csv" onChange={handleFile} />
      <div style={{ marginTop: 8 }}>
        <button onClick={handleUpload}>Upload</button>
        <button onClick={downloadSample} style={{ marginLeft: 8 }}>
          Download Sample CSV
        </button>
      </div>
    </div>
  );
}
