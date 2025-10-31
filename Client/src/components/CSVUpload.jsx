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

  const containerStyle = {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e5e7eb",
    marginBottom: "20px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "20px",
    textAlign: "center",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "8px",
  };

  const fileInputStyle = {
    width: "100%",
    padding: "12px",
    border: "2px dashed #d1d5db",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    marginBottom: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const fileInputHoverStyle = {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    flex: "1",
    minWidth: "140px",
  };

  const uploadButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3b82f6",
    color: "white",
  };

  const uploadButtonHoverStyle = {
    backgroundColor: "#2563eb",
    transform: "translateY(-2px)",
  };

  const uploadButtonDisabledStyle = {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
  };

  const sampleButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#10b981",
    color: "white",
  };

  const sampleButtonHoverStyle = {
    backgroundColor: "#059669",
    transform: "translateY(-2px)",
  };

  const fileNameStyle = {
    fontSize: "14px",
    color: "#059669",
    fontWeight: "600",
    marginBottom: "12px",
    padding: "8px 12px",
    backgroundColor: "#d1fae5",
    borderRadius: "6px",
    border: "1px solid #a7f3d0",
  };

  const helpTextStyle = {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "12px",
    textAlign: "center",
    lineHeight: "1.4",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Upload Expenses CSV</h3>

      <input
        id="csv-file-input"
        type="file"
        accept=".csv"
        onChange={handleFile}
        style={fileInputStyle}
        onMouseEnter={(e) => {
          e.target.style.borderColor = fileInputHoverStyle.borderColor;
          e.target.style.backgroundColor = fileInputHoverStyle.backgroundColor;
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = "#d1d5db";
          e.target.style.backgroundColor = "#f9fafb";
        }}
      />

      {file && <div style={fileNameStyle}>📁 Selected: {file.name}</div>}

      <div style={buttonContainerStyle}>
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          style={{
            ...uploadButtonStyle,
            ...(!file || isUploading ? uploadButtonDisabledStyle : {}),
          }}
          onMouseEnter={(e) => {
            if (!file || isUploading) return;
            e.target.style.backgroundColor =
              uploadButtonHoverStyle.backgroundColor;
            e.target.style.transform = uploadButtonHoverStyle.transform;
          }}
          onMouseLeave={(e) => {
            if (!file || isUploading) return;
            e.target.style.backgroundColor = uploadButtonStyle.backgroundColor;
            e.target.style.transform = "none";
          }}
        >
          {isUploading ? "📤 Uploading..." : "📤 Upload CSV"}
        </button>

        <button
          onClick={downloadSample}
          style={sampleButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor =
              sampleButtonHoverStyle.backgroundColor;
            e.target.style.transform = sampleButtonHoverStyle.transform;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = sampleButtonStyle.backgroundColor;
            e.target.style.transform = "none";
          }}
        >
          📥 Download Sample
        </button>
      </div>

      <div style={helpTextStyle}>
        💡 CSV format: title, amount, date (YYYY-MM-DD). Download sample file
        for reference.
      </div>
    </div>
  );
}
