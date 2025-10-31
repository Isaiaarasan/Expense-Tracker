export function exportCSV(expenses) {
  if (!expenses || !expenses.length) return;
  const header = "title,amount,category,date\n";
  const rows = expenses
    .map(
      (e) =>
        `${escapeCSV(e.title)},${e.amount},${escapeCSV(e.category)},${new Date(
          e.date
        )
          .toISOString()
          .slice(0, 10)}`
    )
    .join("\n");
  const csv = header + rows;
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "expenses.csv";
  link.click();
}

function escapeCSV(v) {
  return `"${(v || "").toString().replace(/"/g, '""')}"`;
}
